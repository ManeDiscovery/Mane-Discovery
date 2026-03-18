'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore, RingSelection } from '@/store/useAppStore';
import ManeDiscoveryRing from '@/components/ManeDiscoveryRing';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CheckinPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const day = parseInt(id, 10);
  const { saveCheckin } = useAppStore();

  const handleSave = (data: RingSelection) => {
    saveCheckin(day, data);
    router.push(`/day/${day}/content`);
  };

  return (
    <div className="w-full max-w-2xl px-6 py-12 mx-auto space-y-12 fade-in">
      <Link href="/" className="inline-flex items-center text-sage-500 hover:text-sage-900 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>

      <div className="text-center space-y-4">
        <h2 className="text-sm font-bold tracking-widest text-rose-700 uppercase">Day {day} • Preparation</h2>
        <h1 className="text-4xl font-serif text-sage-900">Body Check-in</h1>
        <p className="text-sage-700 text-lg">Take a moment to map your nervous system before we begin today's lesson. This helps build somatic awareness over the 21 days.</p>
      </div>

      <ManeDiscoveryRing onSave={handleSave} />
    </div>
  );
}
