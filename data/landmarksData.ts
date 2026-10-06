// Landmarks data for the World Explorer "Landmarks" mode.
// Each landmark maps to a unique country so options never collide.

export interface Landmark {
  name: string;
  emoji: string;
  country: string;
}

export const landmarksPool: Landmark[] = [
  { name: 'Eiffel Tower', emoji: '🗼', country: 'France' },
  { name: 'Statue of Liberty', emoji: '🗽', country: 'United States' },
  { name: 'Great Wall', emoji: '🧱', country: 'China' },
  { name: 'Taj Mahal', emoji: '🕌', country: 'India' },
  { name: 'Shinto Shrine', emoji: '⛩️', country: 'Japan' },
  { name: 'Colosseum', emoji: '🏛️', country: 'Italy' },
  { name: 'Pyramids', emoji: '🔺', country: 'Egypt' },
  { name: 'Opera House', emoji: '🎭', country: 'Australia' },
  { name: 'Big Ben', emoji: '💂', country: 'United Kingdom' },
  { name: 'Neuschwanstein', emoji: '🏰', country: 'Germany' },
  { name: 'Chichen Itza', emoji: '🌵', country: 'Mexico' },
  { name: 'Moai Statues', emoji: '🗿', country: 'Chile' },
  { name: 'Table Mountain', emoji: '⛰️', country: 'South Africa' },
  { name: 'Maracanã', emoji: '🏟️', country: 'Brazil' },
  { name: 'Sagrada Familia', emoji: '⛪', country: 'Spain' },
  { name: 'Parthenon', emoji: '🏺', country: 'Greece' },
  { name: 'Windmills', emoji: '🌷', country: 'Netherlands' },
  { name: 'CN Tower', emoji: '🏙️', country: 'Canada' },
  { name: 'Red Square', emoji: '🔴', country: 'Russia' },
  { name: 'Wat Arun', emoji: '🛕', country: 'Thailand' },
  { name: 'Machu Picchu', emoji: '🏔️', country: 'Peru' },
  { name: 'Gyeongbokgung', emoji: '🏯', country: 'South Korea' },
  { name: 'Maasai Mara', emoji: '🦁', country: 'Kenya' },
];

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/** Pick `count` random landmarks for a run. */
export function selectLandmarks(count: number = 10): Landmark[] {
  return shuffleArray(landmarksPool).slice(0, count);
}

/** Build 4 multiple-choice country options containing the target. */
export function buildLandmarkOptions(target: Landmark): string[] {
  const distractors = shuffleArray(
    [...new Set(landmarksPool.map((l) => l.country))].filter(
      (c) => c !== target.country
    )
  ).slice(0, 3);
  return shuffleArray([target.country, ...distractors]);
}
