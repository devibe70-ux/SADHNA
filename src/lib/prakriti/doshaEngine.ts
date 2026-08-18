export type Dosha = "vata" | "pitta" | "kapha";

export interface QuestionOption {
  text: string;
  dosha: Dosha;
  detail: string;
}

export interface DoshaQuestion {
  id: string;
  category: "physical" | "mental" | "digestive" | "behavioral";
  prompt: string;
  options: QuestionOption[];
}

export const DOSHA_QUESTIONS: DoshaQuestion[] = [
  {
    id: "q1_body_frame",
    category: "physical",
    prompt: "Which best describes your natural physical frame and bone structure?",
    options: [
      { text: "Slender, light, tall or short, hard to gain weight", dosha: "vata", detail: "Thin frame, prominent joints & quick movements" },
      { text: "Medium, athletic, well-proportioned, moderate muscle build", dosha: "pitta", detail: "Balanced weight, firm muscle tone & warm body heat" },
      { text: "Solid, broad shoulders, sturdy build, gains weight easily", dosha: "kapha", detail: "Heavy bone structure, strong endurance & slow gain" }
    ]
  },
  {
    id: "q2_skin_complexion",
    category: "physical",
    prompt: "How does your skin typically feel and react to weather?",
    options: [
      { text: "Dry, rough, thin, cool to touch, chaps easily in cold", dosha: "vata", detail: "Requires frequent hydration & warm oils" },
      { text: "Warm, reddish/flushed, sensitive, prone to freckles/acne", dosha: "pitta", detail: "Sensitive to sun & heat exposure" },
      { text: "Soft, smooth, moist, thick, cool, and glowing", dosha: "kapha", detail: "Naturally hydrated & youthful elasticity" }
    ]
  },
  {
    id: "q3_mind_stress",
    category: "mental",
    prompt: "Under sudden stress or high pressure, your immediate internal reaction is:",
    options: [
      { text: "Anxiety, restlessness, racing thoughts, and sleep disruption", dosha: "vata", detail: "Vata scatter: erratic energy & overthinking" },
      { text: "Irritation, impatience, intense anger, or sharp argument", dosha: "pitta", detail: "Pitta heat: intense focus & critical edge" },
      { text: "Withdrawal, resistance to change, procrastination, or heavy silence", dosha: "kapha", detail: "Kapha sthira: stubborn inertia & comfort-seeking" }
    ]
  },
  {
    id: "q4_sleep_rhythm",
    category: "behavioral",
    prompt: "What is your natural sleep pattern and quality?",
    options: [
      { text: "Light, irregular, easily interrupted, prone to late-night awakenings", dosha: "vata", detail: "Dreams of flying, running, or wind" },
      { text: "Sound and moderate (6–7 hrs), wake up alert and driven", dosha: "pitta", detail: "Intense, vivid, or colorful dreams" },
      { text: "Deep, heavy (8+ hrs), difficulty waking up in the early morning", dosha: "kapha", detail: "Peaceful dreams of water, clouds, or nature" }
    ]
  },
  {
    id: "q5_digestion_agni",
    category: "digestive",
    prompt: "How does your digestive fire (Agni) behave throughout the day?",
    options: [
      { text: "Irregular (Vishama Agni): erratic hunger, prone to gas and bloating", dosha: "vata", detail: "Appetite fluctuates unpredictably" },
      { text: "Intense (Tikshna Agni): sharp hunger, get hangry if meals are delayed", dosha: "pitta", detail: "Strong digestive fire, fast metabolism" },
      { text: "Slow (Manda Agni): low morning appetite, comfortable skipping meals", dosha: "kapha", detail: "Slow metabolism, heavy post-meal sensation" }
    ]
  },
  {
    id: "q6_climate_preference",
    category: "physical",
    prompt: "Which weather condition causes you the most discomfort?",
    options: [
      { text: "Cold, windy, and dry weather", dosha: "vata", detail: "Thrives in warm, humid, cozy climates" },
      { text: "Hot, muggy, and intense sunshine", dosha: "pitta", detail: "Thrives in cool, crisp, shaded environments" },
      { text: "Damp, cool, and overcast winter days", dosha: "kapha", detail: "Thrives in dry, warm, sunny climates" }
    ]
  },
  {
    id: "q7_learning_memory",
    category: "mental",
    prompt: "How do you learn new information and retain memory?",
    options: [
      { text: "Grasp concepts instantly, but forget quickly", dosha: "vata", detail: "Quick intellect, short memory retention" },
      { text: "Methodical, analytical, sharp memory for logical details", dosha: "pitta", detail: "Precise learning & sharp retention" },
      { text: "Requires steady repetition to learn, but remembers forever", dosha: "kapha", detail: "Slow absorption, unshakeable long-term memory" }
    ]
  },
  {
    id: "q8_speech_pace",
    category: "behavioral",
    prompt: "How would friends describe your manner of speech and communication?",
    options: [
      { text: "Fast, energetic, expressive, often jumping between topics", dosha: "vata", detail: "Dynamic & enthusiastic communicator" },
      { text: "Direct, articulate, persuasive, concise, and focused", dosha: "pitta", detail: "Commanding & clear articulation" },
      { text: "Calm, slow, melodious, thoughtful, and soothing", dosha: "kapha", detail: "Reassuring & gentle speech rhythm" }
    ]
  },
  {
    id: "q9_energy_expenditure",
    category: "physical",
    prompt: "How do you experience physical energy throughout the day?",
    options: [
      { text: "Bursts of high enthusiasm followed by sudden exhaustion", dosha: "vata", detail: "Erratic stamina, needs frequent rest" },
      { text: "Medium stamina, highly focused energy directed at goals", dosha: "pitta", detail: "Targeted drive, over-exertion risk" },
      { text: "High endurance and stamina, slow to start but steady for hours", dosha: "kapha", detail: "Unwavering stamina once activated" }
    ]
  },
  {
    id: "q10_emotional_baseline",
    category: "mental",
    prompt: "What is your default emotional tendency when feeling centered?",
    options: [
      { text: "Joyful, creative, adaptable, spiritual, and free-spirited", dosha: "vata", detail: "Air/Ether lightness" },
      { text: "Passionate, courageous, goal-oriented, and decisive", dosha: "pitta", detail: "Fire/Water sharpness" },
      { text: "Loving, patient, forgiving, steady, and compassionate", dosha: "kapha", detail: "Earth/Water nurturing" }
    ]
  }
];

export interface DoshaScoreResult {
  vataScore: number;
  pittaScore: number;
  kaphaScore: number;
  primaryDosha: string;
  elements: string;
  description: string;
  dietAdvice: string[];
  lifestyleAdvice: string[];
  recommendations: {
    recommendedPranayama: string;
    healingFrequencies: string;
    meditationFocus: string;
    herbalSupport: string;
  };
}

export function calculatePrakriti(selectedAnswers: { [questionId: string]: Dosha }): DoshaScoreResult {
  const scores: Record<Dosha, number> = { vata: 0, pitta: 0, kapha: 0 };

  Object.values(selectedAnswers).forEach((dosha) => {
    if (scores[dosha] !== undefined) {
      scores[dosha] += 1;
    }
  });

  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
  const vataPct = Math.round((scores.vata / total) * 100);
  const pittaPct = Math.round((scores.pitta / total) * 100);
  const kaphaPct = Math.round((scores.kapha / total) * 100);

  // Check for dual dosha vs single dosha
  const sorted = [
    { name: "Vata", score: vataPct, key: "vata" as Dosha },
    { name: "Pitta", score: pittaPct, key: "pitta" as Dosha },
    { name: "Kapha", score: kaphaPct, key: "kapha" as Dosha },
  ].sort((a, b) => b.score - a.score);

  let primaryDosha = `${sorted[0].name} Dominant`;
  let elements = "";
  let description = "";
  let dietAdvice: string[] = [];
  let lifestyleAdvice: string[] = [];
  let recommendations = {
    recommendedPranayama: "Nadi Shodhana (Alternate Nostril)",
    healingFrequencies: "432 Hz (Universal Harmony)",
    meditationFocus: "Anāhata (Heart Chakra)",
    herbalSupport: "Triphala & Tulsi"
  };

  if (sorted[0].score >= 50) {
    // Pure single dosha dominant
    if (sorted[0].key === "vata") {
      primaryDosha = "Vata Dominant (Vāyu & Ākāśa)";
      elements = "Air & Ether";
      description = "Your constitution is governed by the principles of movement, quickness, and subtle energy. You are naturally creative, intuitive, and vivacious, but susceptible to restlessness, dry skin, and anxiety when ungrounded.";
      dietAdvice = [
        "Favor warm, cooked, nourishing meals with ghee and healthy oils.",
        "Emphasize sweet, sour, and salty tastes; avoid cold, raw salads.",
        "Sip warm herbal teas like Ginger, Cinnamon, and Cardamom."
      ];
      lifestyleAdvice = [
        "Maintain regular daily sleep, meal, and meditation routines.",
        "Practice daily warm sesame oil self-massage (Abhyanga).",
        "Keep warm and shield yourself from cold dry winds."
      ];
      recommendations = {
        recommendedPranayama: "Bhramari (Humming Bee) & Sama Vritti (Box Breath)",
        healingFrequencies: "174 Hz & 432 Hz (Grounding & Pain Relief)",
        meditationFocus: "Mūlādhāra (Root Chakra) for grounding and security",
        herbalSupport: "Ashwagandha, Shatavari, & Warm Golden Milk"
      };
    } else if (sorted[0].key === "pitta") {
      primaryDosha = "Pitta Dominant (Agni & Jala)";
      elements = "Fire & Water";
      description = "Your constitution is governed by the principles of transformation, intellect, and metabolic fire. You possess sharp leadership, clear vision, and strong digestion, but can experience irritability, overheating, and heartburn when elevated.";
      dietAdvice = [
        "Favor cooling, refreshing foods like sweet fruits, cucumbers, and coconut water.",
        "Emphasize sweet, bitter, and astringent tastes; minimize spicy, oily, and salty foods.",
        "Drink cooling Mint, Fennel, or Chamomile teas."
      ];
      lifestyleAdvice = [
        "Avoid excessive heat and direct mid-day solar exposure.",
        "Engage in non-competitive, calming outdoor walks near water.",
        "Practice surrendering perfectionism and cultivating compassion."
      ];
      recommendations = {
        recommendedPranayama: "Sheetali (Cooling Breath) & Chandra Bhedana",
        healingFrequencies: "528 Hz (Transformation & Miracles) & 639 Hz",
        meditationFocus: "Anāhata (Heart Chakra) and cooling blue visualization",
        herbalSupport: "Amalaki, Brahmi, & Guduchi"
      };
    } else {
      primaryDosha = "Kapha Dominant (Pṛthvī & Jala)";
      elements = "Earth & Water";
      description = "Your constitution is governed by the principles of structure, cohesion, and emotional stability. You possess profound endurance, calm wisdom, and deep compassion, but may slide into lethargy, weight gain, and attachment when sluggish.";
      dietAdvice = [
        "Favor light, warm, dry, and well-spiced foods.",
        "Emphasize pungent, bitter, and astringent tastes; minimize heavy dairy and sugar.",
        "Drink stimulating Black Pepper, Trikatu, and Green teas."
      ];
      lifestyleAdvice = [
        "Rise early before 6:00 AM (during Brahma Muhurta) to prevent heaviness.",
        "Engage in vigorous daily exercise and dynamic Surya Namaskar.",
        "Seek out novel experiences and dynamic change."
      ];
      recommendations = {
        recommendedPranayama: "Kapalabhati (Skull Shining) & Bhastrika (Fire Breath)",
        healingFrequencies: "741 Hz & 852 Hz (Energy Cleansing & Intuition)",
        meditationFocus: "Maṇipūra (Solar Plexus) to ignite inner Agni",
        herbalSupport: "Trikatu, Punarnava, & Guggulu"
      };
    }
  } else if (sorted[0].score - sorted[1].score <= 15) {
    // Dual Dosha
    primaryDosha = `${sorted[0].name}-${sorted[1].name} Dual Constitution`;
    elements = "Combined Dual Elements";
    description = `You embody a harmonious blend of ${sorted[0].name} and ${sorted[1].name}. Your practices should adapt seasonally: pacify ${sorted[0].name} during its peak season and support ${sorted[1].name} when needed.`;
    dietAdvice = [
      "Maintain a balanced diet that avoids extremes of hot or ice-cold foods.",
      "Adjust diet according to seasonal changes (Ritucharya)."
    ];
    lifestyleAdvice = [
      "Balance active dynamic movement with grounding restorative Dhyāna.",
      "Keep a steady daily ritual tracker for optimum Sādhanā."
    ];
    recommendations = {
      recommendedPranayama: "Nadi Shodhana (Alternate Nostril Breathing)",
      healingFrequencies: "432 Hz & 528 Hz (Universal Harmonic Equilibrium)",
      meditationFocus: "Ajna & Anahata Chakra Balance",
      herbalSupport: "Triphala & Tulsi Daily Rasayana"
    };
  } else {
    // Tridoshic
    primaryDosha = "Sama Doshic / Tridoshic Balanced";
    elements = "All 5 Great Elements (Pañcamahābhūta)";
    description = "You maintain a rare, equanimous constitution balanced across Vata, Pitta, and Kapha. Focus on sustaining this natural poise through seasonal awareness.";
    dietAdvice = ["Eat fresh, seasonal, sattvic foods in moderate portions."];
    lifestyleAdvice = ["Maintain daily Sādhanā rituals and Brahma Muhurta meditation."];
    recommendations = {
      recommendedPranayama: "Full Nadi Shodhana & Gayatri Chanting",
      healingFrequencies: "432 Hz & 963 Hz (Divine Consciousness)",
      meditationFocus: "Sahasrāra (Crown Alignment)",
      herbalSupport: "Chyawanprash & Brahmi"
    };
  }

  return {
    vataScore: vataPct,
    pittaScore: pittaPct,
    kaphaScore: kaphaPct,
    primaryDosha,
    elements,
    description,
    dietAdvice,
    lifestyleAdvice,
    recommendations
  };
}
