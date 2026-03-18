export interface DailyLesson {
  title: string;
  lessonText: string[];
  journalPrompt: string;
}

export const dailyLessons: Record<number, DailyLesson> = {
  // Phase 1: Awareness (Days 1-7)
  1: {
    title: "Finding Your Inner Rhythm",
    lessonText: [
      "We often move through our days on autopilot, reacting to external stimuli rather than responding from a place of grounded presence. Today, we focus on noticing the subtle rhythms of your nervous system.",
      "Awareness is the first step toward profound change. As you begin to observe tension and ease without the need to immediately 'fix' anything, you create space for natural regulation to occur."
    ],
    journalPrompt: "What subtle body rhythms or sensations did you notice today?"
  },
  2: {
    title: "Mapping the Landscape",
    lessonText: [
      "Your body is a map of your lived experiences. Certain areas may feel expansive and light, while others might feel dense, numb, or tightly coiled.",
      "By mapping where we hold different emotional states, we begin to learn our unique somatic language. There are no wrong answers here, only observation."
    ],
    journalPrompt: "Where in your body do you notice tension residing most frequently?"
  },
  3: {
    title: "The Language of Sensation",
    lessonText: [
      "Sensations are the nervous system's way of communicating. A flutter in the chest, a tightening in the jaw, a sudden wave of heat—these are all messages.",
      "Today, practice translating thoughts like 'I'm anxious' into sensations like 'My chest feels tight and my breathing is shallow.' This shift removes judgment from the experience."
    ],
    journalPrompt: "What is one thought you had today, and how did it manifest as a physical sensation?"
  },
  4: {
    title: "Meeting Resistance",
    lessonText: [
      "When we encounter uncomfortable sensations, our instinct is often to push them away or distract ourselves. This resistance can actually amplify the discomfort.",
      "What happens when you gently turn toward the discomfort with curiosity instead of fear? Sometimes, simply acknowledging the feeling helps it begin to dissipate."
    ],
    journalPrompt: "Did you notice any urge to resist discomfort today? How did you handle it?"
  },
  5: {
    title: "Observing the Triggers",
    lessonText: [
      "Triggers are sudden shifts in your nervous system state, often pulling you rapidly into sympathetic (fight/flight) or dorsal (freeze/shutdown) states.",
      "Understanding what tips your scale is an act of deep self-compassion. It allows you to anticipate these shifts and meet them with grace rather than surprise."
    ],
    journalPrompt: "Can you identify a small trigger from your day, and note how your nervous system reacted?"
  },
  6: {
    title: "The Power of the Pause",
    lessonText: [
      "Between a stimulus and your response lies a brief moment of possibility. We call this the 'Pause'.",
      "By lengthening the pause, even by a split second, you regain the power of choice. You move from a reactive state to a responsive one, reclaiming your autonomy."
    ],
    journalPrompt: "Where might you have benefited from taking a 'pause' before reacting today?"
  },
  7: {
    title: "Expanding the Window",
    lessonText: [
      "Your 'Window of Tolerance' is the zone where you feel grounded, flexible, and capable of handling stress without becoming overwhelmed or shutting down.",
      "As we conclude this first week of awareness, remember that simply noticing when you leave your window is the very mechanism that helps it slowly expand over time."
    ],
    journalPrompt: "Reflect on week one. Have you noticed any subtle shifts in your awareness since Day 1?"
  },

  // Phase 2: Regulation (Days 8-14)
  8: {
    title: "Befriending the Breath",
    lessonText: [
      "The breath is the only autonomic function we can consciously control, making it the most direct remote control to the nervous system.",
      "When we consciously lengthen the exhale, we tell the vagus nerve to apply the 'brakes', shifting the body toward a state of rest and digest."
    ],
    journalPrompt: "How does your breath change when you intentionally slow down your exhale?"
  },
  9: {
    title: "Anchoring in the Storm",
    lessonText: [
      "When the nervous system is highly activated, trying to 'calm down' can feel impossible. Instead of forcing calm, we focus on finding an anchor.",
      "An anchor is anything—a sensation, a sound, the feeling of the floor—that reminds your body it is safe in the present moment, even as the storm rages."
    ],
    journalPrompt: "What is a physical anchor you can turn to when you feel overwhelmed?"
  },
  10: {
    title: "The Ground Beneath You",
    lessonText: [
      "Gravity is a constant, steadying force. Connecting with the earth is one of the most primal forms of nervous system regulation.",
      "By actively pushing into the floor or feeling the solid back of a chair, we signal to our brain that we are supported, contained, and held."
    ],
    journalPrompt: "How did it feel to consciously connect with gravity and support today?"
  },
  11: {
    title: "Sound as a Soothing Balm",
    lessonText: [
      "The vagus nerve passes through the ear and vocal cords. This is why sound—whether humming, singing, or listening to certain frequencies—can profoundly impact our state.",
      "Creating a low, resonant vibration in the chest communicates safety to the oldest parts of the brain, bypassing logical thought entirely."
    ],
    journalPrompt: "Did you try the humming exercise? What sensations did you notice afterward?"
  },
  12: {
    title: "Movement and Flow",
    lessonText: [
      "Trauma and stress are often described as incomplete survival responses trapped in the body. Movement helps to complete those cycles.",
      "Whether it's a gentle shake, a sway, or a brisk walk, allowing the body to move the way it wants to helps discharge pent-up sympathetic energy."
    ],
    journalPrompt: "How does your body naturally want to move when it feels energized or anxious?"
  },
  13: {
    title: "Containment and Boundaries",
    lessonText: [
      "Just as a river needs banks to flow purposefully, our nervous systems need structural containment to feel safe.",
      "Physical boundaries—like hugging yourself tightly or wrapping up in a heavy blanket—provide the deep pressure that tells the nervous system, 'You are intact. You end here.'"
    ],
    journalPrompt: "In what ways do you currently create physical or emotional boundaries for yourself?"
  },
  14: {
    title: "Finding Safe Harbor",
    lessonText: [
      "Regulation isn't about never feeling stressed or numb. It's about knowing how to navigate back to safety when you drift off course.",
      "As we finish our second week, you are acquiring a toolkit. You are building the muscle memory of return, knowing your Safe Harbor is always accessible."
    ],
    journalPrompt: "What regulation tool has felt the most accessible and effective for you so far?"
  },

  // Phase 3: Embodiment (Days 15-21)
  15: {
    title: "Inhabiting the Body",
    lessonText: [
      "To embody means to be fully present inside your physical form. It is moving from living 'up in your head' down into the felt experience of your limbs, your core, your breath.",
      "When we inhabit the body safely, we unlock access to deep intuition and instinct that the analytical mind cannot replicate."
    ],
    journalPrompt: "What does it feel like when you are fully 'in' your body versus up in your head?"
  },
  16: {
    title: "The Wisdom of the Herd",
    lessonText: [
      "Horses exist primarily in a state of somatic embodiment. They constantly 'read' their internal state and the states of those around them.",
      "We too are designed for co-regulation. Being around a calm, grounded presence (human or animal) can physically lower our heart rate and settle our nerves."
    ],
    journalPrompt: "Who or what in your life acts as a source of somatic co-regulation for you?"
  },
  17: {
    title: "Moving with Intention",
    lessonText: [
      "We often rush from task to task, our bodies treated merely as vehicles to transport our brains. Today, we practice moving with deliberate intention.",
      "Notice the mechanics of a single step. Feel the air moving past your skin. When movement becomes intentional, ordinary actions become grounding rituals."
    ],
    journalPrompt: "Describe a moment today where you slowed down and moved with deep intention."
  },
  18: {
    title: "Trusting Your Instincts",
    lessonText: [
      "Your nervous system knows exactly what it needs to heal. Sometimes it needs rest, sometimes it needs to shake, sometimes it needs boundaries.",
      "As your window of tolerance expands, you will find it easier to trust these somatic impulses rather than instantly overriding them with logic."
    ],
    journalPrompt: "Was there a moment today where you felt a 'gut instinct'? Did you trust it?"
  },
  19: {
    title: "Joy as a Compass",
    lessonText: [
      "We spend so much time regulating away from discomfort that we can forget to orient toward joy. A healthy nervous system has the capacity to hold immense pleasure and play.",
      "Joy is a profound indicator of a ventral vagal state. Let it guide you. Notice when you feel light, open, and connected, and lean into it."
    ],
    journalPrompt: "What brought you a fleeting sense of joy or playfulness today?"
  },
  20: {
    title: "Integration and Wholeness",
    lessonText: [
      "Integration means accepting all states of your nervous system—the protective numbness, the mobilizing anxiety, and the grounded calm.",
      "You are not broken because you experience stress or shutdown. These are beautiful, evolutionary survival strategies. Wholeness comes from honoring them all."
    ],
    journalPrompt: "How has your relationship with your 'uncomfortable' states shifted over these 20 days?"
  },
  21: {
    title: "The Mane Discovery",
    lessonText: [
      "Today, you stand at the culmination of your 21-day reset. But this is not an end; it is a profound beginning. You have discovered your 'mane'—your unique, vital, and grounded life force.",
      "You now possess the somatic vocabulary to map your state, the tools to regulate safely, and the embodied wisdom to trust your herd. Carry this presence with you."
    ],
    journalPrompt: "Looking back at Day 1, what is the most significant change you feel within yourself today?"
  }
};
