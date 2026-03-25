import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';

export interface SomaticEntry {
  sectionId: string;
  section: string;
  prompt: string;
  response: string;
  relationalContext?: string;
  attachmentPattern?: string;
}

export interface RingSelection {
  tension: number;
  ease: number;
  somaticEntry?: SomaticEntry;
  relationalContext?: string;
  attachmentPattern?: string;
}

export interface LedgerEntry {
  promise: string;
  completed?: boolean;
  repairPlan?: string;
  glimmers: string[];
}

interface AppState {
  currentDay: number;
  unlockedDays: number[];
  journals: Record<number, string>;
  checkins: Record<number, RingSelection>;
  completedExercises: Record<number, { title: string, isHorseReflection: boolean }>;
  ledgerEntries: Record<string, LedgerEntry>;
  
  // Actions
  unlockNextDay: () => void;
  saveJournal: (day: number, text: string) => void;
  saveCheckin: (day: number, data: RingSelection) => void;
  saveExercise: (day: number, data: { title: string, isHorseReflection: boolean }) => void;
  saveLedgerEntry: (id: string, data: Partial<LedgerEntry>) => void;
  resetProgress: () => void;
  debugUnlockAll: () => void;
  fetchUserProfile: (userId: string) => Promise<void>;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentDay: 1,
      unlockedDays: [1], // Day 1 is unlocked by default
      journals: {},
      checkins: {},
      completedExercises: {},
      ledgerEntries: {},

      fetchUserProfile: async (userId: string) => {
        try {
          
          // Fetch profile for unlocked days & current day (gracefully handling missing rows)
          const { data: profile } = await supabase
            .from('profiles')
            .select('current_day, unlocked_days')
            .eq('id', userId)
            .maybeSingle();

          // Fetch somatic entries
          const { data: entries } = await supabase
            .from('somatic_entries')
            .select('*')
            .eq('user_id', userId);

          const updatedCheckins: Record<number, RingSelection> = {};
          
          if (entries) {
            entries.forEach((entry: any) => {
              updatedCheckins[entry.day_number] = {
                tension: entry.tension,
                ease: entry.ease,
                relationalContext: entry.relational_context,
                attachmentPattern: entry.attachment_pattern,
                somaticEntry: entry.section_id ? {
                  sectionId: entry.section_id,
                  section: entry.section_label,
                  prompt: entry.prompt,
                  response: entry.diary_response,
                  relationalContext: entry.relational_context,
                  attachmentPattern: entry.attachment_pattern,
                } : undefined
              };
            });
          }

          set((state) => ({
            currentDay: profile?.current_day || state.currentDay,
            unlockedDays: profile?.unlocked_days || state.unlockedDays,
            checkins: { ...state.checkins, ...updatedCheckins }
          }));

        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      },

      debugUnlockAll: () => {
        set({
          currentDay: 21,
          unlockedDays: Array.from({ length: 21 }, (_, i) => i + 1)
        });
      },

      unlockNextDay: async () => {
        const { currentDay, unlockedDays } = get();
        if (currentDay < 21) {
          const nextDay = currentDay + 1;
          const newUnlockedDays = unlockedDays.includes(nextDay) ? unlockedDays : [...unlockedDays, nextDay];
          
          set({ currentDay: nextDay, unlockedDays: newUnlockedDays });

          try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
              await supabase.from('profiles').upsert({
                id: session.user.id,
                current_day: nextDay,
                unlocked_days: newUnlockedDays,
                updated_at: new Date().toISOString()
              });
            }
          } catch (error) {
            console.error('Error syncing progress to Supabase:', error);
          }
        }
      },

      saveJournal: (day, text) => {
        set((state) => ({ journals: { ...state.journals, [day]: text } }));
      },

      saveCheckin: async (day, data) => {
        set((state) => ({ checkins: { ...state.checkins, [day]: data } }));

        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            await supabase.from('somatic_entries').insert({
              user_id: session.user.id,
              day_number: day,
              tension: data.tension,
              ease: data.ease,
              relational_context: data.relationalContext,
              attachment_pattern: data.attachmentPattern,
              section_id: data.somaticEntry?.sectionId,
              section_label: data.somaticEntry?.section,
              prompt: data.somaticEntry?.prompt,
              diary_response: data.somaticEntry?.response
            });
          }
        } catch (error) {
          console.error('Error syncing checkin to Supabase:', error);
        }
      },

      saveExercise: (day, data) => {
        set((state) => ({
          completedExercises: {
            ...state.completedExercises,
            [day]: data
          }
        }));
      },

      saveLedgerEntry: (id, data) => {
        set((state) => {
          const existing = state.ledgerEntries[id] || { promise: '', glimmers: [] };
          return {
            ledgerEntries: {
              ...state.ledgerEntries,
              [id]: { ...existing, ...data }
            }
          }
        });
      },

      resetProgress: () => {
        set({
          currentDay: 1,
          unlockedDays: [1],
          journals: {},
          checkins: {},
          completedExercises: {},
          ledgerEntries: {}
        });
      }
    }),
    {
      name: 'mane-discovery-storage',
    }
  )
);
