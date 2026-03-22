export interface DailyPractice {
  title: string;
  durationMinutes: number;
  description: string;
}

export interface DailyLesson {
  title: string;
  lessonText: string[];
  journalPrompt: string;
  herdInsight: string;
  practice: DailyPractice;
}

export const dailyLessons: Record<number, DailyLesson> = {
  // Phase 1: Awareness (Days 1-7)
  1: {
    title: "Finding Your Inner Rhythm",
    lessonText: [
      "We often move through our days on autopilot, reacting to external stimuli rather than responding from a place of grounded presence. Today, we focus on noticing the subtle rhythms of your nervous system.",
      "Awareness is the first step toward profound change. As you begin to observe tension and ease without the need to immediately 'fix' anything, you create space for natural regulation to occur."
    ],
    journalPrompt: "What subtle body rhythms or sensations did you notice today?",
    herdInsight: "A horse at rest will often cock one hind leg, lower its head, and shift its gaze to a soft focus, entering a deeply parasympathetic state while still remaining quietly aware of its surroundings.",
    practice: {
      title: "The Soft Gaze",
      durationMinutes: 3,
      description: "Allow your eyes to defocus slightly, taking in the periphery of the room without staring at any one object. This signals safety to your optic nerve."
    }
  },
  2: {
    title: "Mapping the Landscape",
    lessonText: [
      "Your body is a map of your lived experiences. Certain areas may feel expansive and light, while others might feel dense, numb, or tightly coiled.",
      "By mapping where we hold different emotional states, we begin to learn our unique somatic language. There are no wrong answers here, only observation."
    ],
    journalPrompt: "Where in your body do you notice tension residing most frequently?",
    herdInsight: "In a herd, if one horse notices a threat, the tension ripples through the entire group visually. They map safety by reading the physical tension held in each other's bodies.",
    practice: {
      title: "Body Scan Observation",
      durationMinutes: 3,
      description: "Mentally scan from the crown of your head to your toes. Pause at areas of tension, not to change them, but simply to acknowledge their presence."
    }
  },
  3: {
    title: "The Language of Sensation",
    lessonText: [
      "Sensations are the nervous system's way of communicating. A flutter in the chest, a tightening in the jaw, a sudden wave of heat—these are all messages.",
      "Today, practice translating thoughts like 'I'm anxious' into sensations like 'My chest feels tight and my breathing is shallow.' This shift removes judgment from the experience."
    ],
    journalPrompt: "What is one thought you had today, and how did it manifest as a physical sensation?",
    herdInsight: "Horses communicate through micro-movements—an ear flick, a swish of the tail, a weight shift. They never judge a sensation; they only listen to the information it conveys.",
    practice: {
      title: "Sensation Naming",
      durationMinutes: 2,
      description: "Sit quietly. Notice a physical sensation (heat, pressure, tingling) and silently name it without labeling it as 'good' or 'bad'."
    }
  },
  4: {
    title: "Meeting Resistance",
    lessonText: [
      "When we encounter uncomfortable sensations, our instinct is often to push them away or distract ourselves. This resistance can actually amplify the discomfort.",
      "What happens when you gently turn toward the discomfort with curiosity instead of fear? Sometimes, simply acknowledging the feeling helps it begin to dissipate."
    ],
    journalPrompt: "Did you notice any urge to resist discomfort today? How did you handle it?",
    herdInsight: "When a horse encounters something terrifying like a flapping tarp, resisting and bolting increases their panic. Only by stopping, turning to face it, and assessing it does their heart rate finally drop.",
    practice: {
      title: "Turning Toward Comfort",
      durationMinutes: 3,
      description: "Notice an area of slight discomfort. Instead of tensing against it, try to breathe directly into that space, expanding it with your inhale."
    }
  },
  5: {
    title: "Observing the Triggers",
    lessonText: [
      "Triggers are sudden shifts in your nervous system state, often pulling you rapidly into sympathetic (fight/flight) or dorsal (freeze/shutdown) states.",
      "Understanding what tips your scale is an act of deep self-compassion. It allows you to anticipate these shifts and meet them with grace rather than surprise."
    ],
    journalPrompt: "Can you identify a small trigger from your day, and note how your nervous system reacted?",
    herdInsight: "A horse's primary trigger is isolation. As herd animals, being separated sends them immediately into sympathetic activation because isolation historically meant danger.",
    practice: {
      title: "Trigger Tracking Breath",
      durationMinutes: 3,
      description: "Inhale while counting to 4, honoring the activating energy of a trigger. Exhale slowly to 6, reminding the body that the event consists of energy moving through, not staying."
    }
  },
  6: {
    title: "The Power of the Pause",
    lessonText: [
      "Between a stimulus and your response lies a brief moment of possibility. We call this the 'Pause'.",
      "By lengthening the pause, even by a split second, you regain the power of choice. You move from a reactive state to a responsive one, reclaiming your autonomy."
    ],
    journalPrompt: "Where might you have benefited from taking a 'pause' before reacting today?",
    herdInsight: "Before a horse commits to bolting, it will often freeze and lift its head high to assess the horizon. This pause ensures they don't sprint blindly into greater danger.",
    practice: {
      title: "The 4-Second Hold",
      durationMinutes: 3,
      description: "Inhale deeply, pause and hold the breath for 4 seconds, feeling the stillness. Exhale completely, and pause again before inhaling."
    }
  },
  7: {
    title: "Expanding the Window",
    lessonText: [
      "Your 'Window of Tolerance' is the zone where you feel grounded, flexible, and capable of handling stress without becoming overwhelmed or shutting down.",
      "As we conclude this first week of awareness, remember that simply noticing when you leave your window is the very mechanism that helps it slowly expand over time."
    ],
    journalPrompt: "Reflect on week one. Have you noticed any subtle shifts in your awareness since Day 1?",
    herdInsight: "A young foal naturally has a very narrow window of tolerance, spooking easily. By venturing a few feet from its mother, getting scared, and returning to safety, its window gradually expands.",
    practice: {
      title: "Pendulation Practice",
      durationMinutes: 4,
      description: "Notice an area of tension in your body. Then, intentionally shift your focus to an area that feels completely neutral or comfortable. Alternate your attention between the two."
    }
  },

  // Phase 2: Regulation (Days 8-14)
  8: {
    title: "Befriending the Breath",
    lessonText: [
      "The breath is the only autonomic function we can consciously control, making it the most direct remote control to the nervous system.",
      "When we consciously lengthen the exhale, we tell the vagus nerve to apply the 'brakes', shifting the body toward a state of rest and digest."
    ],
    journalPrompt: "How does your breath change when you intentionally slow down your exhale?",
    herdInsight: "When a horse has assessed a threat and realized it is safe, they will literally 'blow it out'—a deep, audible snort or exhale that rapidly discharges sympathetic arousal.",
    practice: {
      title: "Extended Exhale Breathing",
      durationMinutes: 3,
      description: "Inhale normally through the nose, then purse your lips slightly and exhale as slowly as possible, making the exhale twice as long as the inhale."
    }
  },
  9: {
    title: "Anchoring in the Storm",
    lessonText: [
      "When the nervous system is highly activated, trying to 'calm down' can feel impossible. Instead of forcing calm, we focus on finding an anchor.",
      "An anchor is anything—a sensation, a sound, the feeling of the floor—that reminds your body it is safe in the present moment, even as the storm rages."
    ],
    journalPrompt: "What is a physical anchor you can turn to when you feel overwhelmed?",
    herdInsight: "During a storm, horses don't run; they turn their hindquarters to the wind, drop their heads, and solidly plant all four feet. They anchor into the earth until it passes.",
    practice: {
      title: "The Earth Anchor",
      durationMinutes: 3,
      description: "Press your feet firmly into the floor. Tense your leg muscles for a count of 3, then release, literally feeling the solidity of the ground supporting you."
    }
  },
  10: {
    title: "The Ground Beneath You",
    lessonText: [
      "Gravity is a constant, steadying force. Connecting with the earth is one of the most primal forms of nervous system regulation.",
      "By actively pushing into the floor or feeling the solid back of a chair, we signal to our brain that we are supported, contained, and held."
    ],
    journalPrompt: "How did it feel to consciously connect with gravity and support today?",
    herdInsight: "Because their hooves act as sensors, horses are incredibly attuned to the density and vibration of the ground beneath them, using it to navigate and ground themselves constantly.",
    practice: {
      title: "Gravity Surrender",
      durationMinutes: 3,
      description: "Lying down or seated, intentionally relax your muscles as if you are letting the chair or floor take 100% of your body weight. Feel yourself being held."
    }
  },
  11: {
    title: "Sound as a Soothing Balm",
    lessonText: [
      "The vagus nerve passes through the ear and vocal cords. This is why sound—whether humming, singing, or listening to certain frequencies—can profoundly impact our state.",
      "Creating a low, resonant vibration in the chest communicates safety to the oldest parts of the brain, bypassing logical thought entirely."
    ],
    journalPrompt: "Did you try the humming exercise? What sensations did you notice afterward?",
    herdInsight: "Mares will often use a deep, almost inaudible low 'nicker' vibrating in their throat to soothe and reassure a nervous foal without vocalizing loudly.",
    practice: {
      title: "Vagal Humming",
      durationMinutes: 2,
      description: "Take a deep breath in, and on the exhale, produce a continuous low, resonant 'hmmmm' sound in your throat until you are completely empty of air."
    }
  },
  12: {
    title: "Movement and Flow",
    lessonText: [
      "Trauma and stress are often described as incomplete survival responses trapped in the body. Movement helps to complete those cycles.",
      "Whether it's a gentle shake, a sway, or a brisk walk, allowing the body to move the way it wants to helps discharge pent-up sympathetic energy."
    ],
    journalPrompt: "How does your body naturally want to move when it feels energized or anxious?",
    herdInsight: "After a tense encounter or a fright, a horse will physically shake their entire body, starting from the head and rippling down to the tail, to literally 'shake off' the adrenaline.",
    practice: {
      title: "Somatic Shaking",
      durationMinutes: 3,
      description: "Stand up and gently begin bouncing on your heels. Let your arms hang loose and shake your wrists, allowing the vibration to move freely up through your shoulders."
    }
  },
  13: {
    title: "Containment and Boundaries",
    lessonText: [
      "Just as a river needs banks to flow purposefully, our nervous systems need structural containment to feel safe.",
      "Physical boundaries—like hugging yourself tightly or wrapping up in a heavy blanket—provide the deep pressure that tells the nervous system, 'You are intact. You end here.'"
    ],
    journalPrompt: "In what ways do you currently create physical or emotional boundaries for yourself?",
    herdInsight: "Horses create clear boundaries through body language. A simple pinned ear or a swish of a tail establishes how close another herd member is allowed to be.",
    practice: {
      title: "Self-Containment Hold",
      durationMinutes: 3,
      description: "Place your right hand flat against the left side of your ribs, and your left hand on your right bicep giving yourself a firm, containing hug. Breathe into your hands."
    }
  },
  14: {
    title: "Finding Safe Harbor",
    lessonText: [
      "Regulation isn't about never feeling stressed or numb. It's about knowing how to navigate back to safety when you drift off course.",
      "As we finish our second week, you are acquiring a toolkit. You are building the muscle memory of return, knowing your Safe Harbor is always accessible."
    ],
    journalPrompt: "What regulation tool has felt the most accessible and effective for you so far?",
    herdInsight: "The lead mare doesn't prevent predators from existing; she provides a safe harbor. Her calm, regulating presence allows the rest of the herd to relax and graze.",
    practice: {
      title: "The Safe Harbor Visualization",
      durationMinutes: 4,
      description: "Close your eyes and visualize a deeply safe environment. With every inhale, imagine pulling the security of that environment directly into your chest."
    }
  },

  // Phase 3: Embodiment (Days 15-21)
  15: {
    title: "Inhabiting the Body",
    lessonText: [
      "To embody means to be fully present inside your physical form. It is moving from living 'up in your head' down into the felt experience of your limbs, your core, your breath.",
      "When we inhabit the body safely, we unlock access to deep intuition and instinct that the analytical mind cannot replicate."
    ],
    journalPrompt: "What does it feel like when you are fully 'in' your body versus up in your head?",
    herdInsight: "Because horses do not have a prefrontal cortex designed for ruminating about the past or worrying about the future, they are masters of pure, moment-to-moment physical embodiment.",
    practice: {
      title: "Grounding the Mind",
      durationMinutes: 3,
      description: "Rub your palms together vigorously to create heat. Place them flat over your eyes and feel the physical boundaries of your face, pulling your awareness out of your thoughts and into physical touch."
    }
  },
  16: {
    title: "The Wisdom of the Herd",
    lessonText: [
      "Horses exist primarily in a state of somatic embodiment. They constantly 'read' their internal state and the states of those around them.",
      "We too are designed for co-regulation. Being around a calm, grounded presence (human or animal) can physically lower our heart rate and settle our nerves."
    ],
    journalPrompt: "Who or what in your life acts as a source of somatic co-regulation for you?",
    herdInsight: "When two horses are mutual grooming (nibbling at each other's withers), their heart rates will physically synchronize. This co-regulation mathematically lowers their baseline stress.",
    practice: {
      title: "Co-Regulation Recall",
      durationMinutes: 3,
      description: "Bring to mind the face and energy of someone (or a pet) who makes you feel deeply safe. Breathe rhythmically as you imagine matching your breathing to theirs."
    }
  },
  17: {
    title: "Moving with Intention",
    lessonText: [
      "We often rush from task to task, our bodies treated merely as vehicles to transport our brains. Today, we practice moving with deliberate intention.",
      "Notice the mechanics of a single step. Feel the air moving past your skin. When movement becomes intentional, ordinary actions become grounding rituals."
    ],
    journalPrompt: "Describe a moment today where you slowed down and moved with deep intention.",
    herdInsight: "Watch a horse traverse uneven or rocky ground. They do not rush; they place each hoof deliberately, remaining in constant, intentional dialogue with the terrain.",
    practice: {
      title: "Slow-Motion Hand Movement",
      durationMinutes: 2,
      description: "Hold your hands out in front of you. Extremely slowly, open your fingers stretching them wide, then close them into fists. Notice every tiny muscle involved in this simple act."
    }
  },
  18: {
    title: "Trusting Your Instincts",
    lessonText: [
      "Your nervous system knows exactly what it needs to heal. Sometimes it needs rest, sometimes it needs to shake, sometimes it needs boundaries.",
      "As your window of tolerance expands, you will find it easier to trust these somatic impulses rather than instantly overriding them with logic."
    ],
    journalPrompt: "Was there a moment today where you felt a 'gut instinct'? Did you trust it?",
    herdInsight: "If a horse feels an instinct to move away from a strange object, it simply does. It never questions whether its boundary is 'polite' or 'logical'. It honors its physical truth.",
    practice: {
      title: "Following the Impulse",
      durationMinutes: 3,
      description: "Sit quietly and ask your body what it wants to do right now. Stretch? Yawn? Curl into a ball? For three minutes, follow every physical impulse without censoring it."
    }
  },
  19: {
    title: "Joy as a Compass",
    lessonText: [
      "We spend so much time regulating away from discomfort that we can forget to orient toward joy. A healthy nervous system has the capacity to hold immense pleasure and play.",
      "Joy is a profound indicator of a ventral vagal state. Let it guide you. Notice when you feel light, open, and connected, and lean into it."
    ],
    journalPrompt: "What brought you a fleeting sense of joy or playfulness today?",
    herdInsight: "Play is the ultimate sign of a completely safe, secure herd. When horses buck, rear, and race each other in the pasture, it is an expression of pure ventral vagal joy.",
    practice: {
      title: "The Inner Smile",
      durationMinutes: 3,
      description: "Close your eyes and gently turn the corners of your mouth upward. Imagine that smile radiating down into your chest and heart center, generating a physical feeling of warmth."
    }
  },
  20: {
    title: "Integration and Wholeness",
    lessonText: [
      "Integration means accepting all states of your nervous system—the protective numbness, the mobilizing anxiety, and the grounded calm.",
      "You are not broken because you experience stress or shutdown. These are beautiful, evolutionary survival strategies. Wholeness comes from honoring them all."
    ],
    journalPrompt: "How has your relationship with your 'uncomfortable' states shifted over these 20 days?",
    herdInsight: "A horse does not hate itself when it gets spooked, nor does it view fear as a failure of regulation. Fear, rest, and play are simply different weather patterns passing through the same sky.",
    practice: {
      title: "The Compassionate Observer",
      durationMinutes: 4,
      description: "Take deep breaths while repeating silently: 'Whatever state I am in, my body is trying to keep me safe. I honor my body's attempts to protect me.'"
    }
  },
  21: {
    title: "The Mane Discovery",
    lessonText: [
      "Today, you stand at the culmination of your 21-day reset. But this is not an end; it is a profound beginning. You have discovered your 'mane'—your unique, vital, and grounded life force.",
      "You now possess the somatic vocabulary to map your state, the tools to regulate safely, and the embodied wisdom to trust your herd. Carry this presence with you."
    ],
    journalPrompt: "Looking back at Day 1, what is the most significant change you feel within yourself today?",
    herdInsight: "When a new horse joins a herd, the integration process takes exactly about 21 days for the group to establish their new baseline, discovering a newly balanced rhythm together.",
    practice: {
      title: "The Integration Anchor",
      durationMinutes: 5,
      description: "Rest one hand on your heart and one on your belly. Breathe normally and simply rest in the awareness of the sturdy, resilient container you have built over these 21 days."
    }
  }
};
