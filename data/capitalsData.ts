// Capitals data for the World Explorer "Capitals" mode.
// Covers the same 40-country pool as Flags Sprint so kids build on what
// they already learned there.

export interface CapitalCountry {
  name: string;
  capital: string;
}

export const capitalsPool: CapitalCountry[] = [
  { name: 'United States', capital: 'Washington, D.C.' },
  { name: 'Canada', capital: 'Ottawa' },
  { name: 'Mexico', capital: 'Mexico City' },
  { name: 'Brazil', capital: 'Brasília' },
  { name: 'Argentina', capital: 'Buenos Aires' },
  { name: 'United Kingdom', capital: 'London' },
  { name: 'France', capital: 'Paris' },
  { name: 'Germany', capital: 'Berlin' },
  { name: 'Italy', capital: 'Rome' },
  { name: 'Spain', capital: 'Madrid' },
  { name: 'Portugal', capital: 'Lisbon' },
  { name: 'Netherlands', capital: 'Amsterdam' },
  { name: 'Switzerland', capital: 'Bern' },
  { name: 'Sweden', capital: 'Stockholm' },
  { name: 'Norway', capital: 'Oslo' },
  { name: 'Greece', capital: 'Athens' },
  { name: 'Turkey', capital: 'Ankara' },
  { name: 'Russia', capital: 'Moscow' },
  { name: 'China', capital: 'Beijing' },
  { name: 'Japan', capital: 'Tokyo' },
  { name: 'South Korea', capital: 'Seoul' },
  { name: 'India', capital: 'New Delhi' },
  { name: 'Thailand', capital: 'Bangkok' },
  { name: 'Vietnam', capital: 'Hanoi' },
  { name: 'Indonesia', capital: 'Jakarta' },
  { name: 'Malaysia', capital: 'Kuala Lumpur' },
  { name: 'Philippines', capital: 'Manila' },
  { name: 'Singapore', capital: 'Singapore' },
  { name: 'Australia', capital: 'Canberra' },
  { name: 'New Zealand', capital: 'Wellington' },
  { name: 'South Africa', capital: 'Pretoria' },
  { name: 'Egypt', capital: 'Cairo' },
  { name: 'Nigeria', capital: 'Abuja' },
  { name: 'Saudi Arabia', capital: 'Riyadh' },
  { name: 'United Arab Emirates', capital: 'Abu Dhabi' },
  { name: 'Israel', capital: 'Jerusalem' },
  { name: 'Colombia', capital: 'Bogotá' },
  { name: 'Chile', capital: 'Santiago' },
  { name: 'Peru', capital: 'Lima' },
  { name: 'Denmark', capital: 'Copenhagen' },
];

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/** Pick `count` random countries for a run. */
export function selectCapitalCountries(count: number = 10): CapitalCountry[] {
  return shuffleArray(capitalsPool).slice(0, count);
}

/** Build 4 multiple-choice capital options containing the target. */
export function buildCapitalOptions(target: CapitalCountry): string[] {
  const distractors = shuffleArray(
    capitalsPool.filter((c) => c.name !== target.name).map((c) => c.capital)
  ).slice(0, 3);
  return shuffleArray([target.capital, ...distractors]);
}
