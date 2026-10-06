// Continents data for the World Explorer "Continents" mode.

export interface ContinentCountry {
  name: string;
  continent: string;
}

export const continentsPool: ContinentCountry[] = [
  { name: 'United States', continent: 'North America' },
  { name: 'Canada', continent: 'North America' },
  { name: 'Mexico', continent: 'North America' },
  { name: 'Brazil', continent: 'South America' },
  { name: 'Argentina', continent: 'South America' },
  { name: 'Chile', continent: 'South America' },
  { name: 'Peru', continent: 'South America' },
  { name: 'Colombia', continent: 'South America' },
  { name: 'United Kingdom', continent: 'Europe' },
  { name: 'France', continent: 'Europe' },
  { name: 'Germany', continent: 'Europe' },
  { name: 'Spain', continent: 'Europe' },
  { name: 'Italy', continent: 'Europe' },
  { name: 'Portugal', continent: 'Europe' },
  { name: 'Netherlands', continent: 'Europe' },
  { name: 'Sweden', continent: 'Europe' },
  { name: 'Greece', continent: 'Europe' },
  { name: 'China', continent: 'Asia' },
  { name: 'Japan', continent: 'Asia' },
  { name: 'India', continent: 'Asia' },
  { name: 'South Korea', continent: 'Asia' },
  { name: 'Thailand', continent: 'Asia' },
  { name: 'Vietnam', continent: 'Asia' },
  { name: 'Indonesia', continent: 'Asia' },
  { name: 'Saudi Arabia', continent: 'Asia' },
  { name: 'Egypt', continent: 'Africa' },
  { name: 'Nigeria', continent: 'Africa' },
  { name: 'Kenya', continent: 'Africa' },
  { name: 'South Africa', continent: 'Africa' },
  { name: 'Morocco', continent: 'Africa' },
  { name: 'Ethiopia', continent: 'Africa' },
  { name: 'Australia', continent: 'Australia' },
  { name: 'New Zealand', continent: 'Australia' },
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
export function selectContinentCountries(count: number = 10): ContinentCountry[] {
  return shuffleArray(continentsPool).slice(0, count);
}

/** Build 4 multiple-choice continent options containing the target. */
export function buildContinentOptions(target: ContinentCountry): string[] {
  const distractors = shuffleArray(
    [...new Set(continentsPool.map((c) => c.continent))].filter(
      (c) => c !== target.continent
    )
  ).slice(0, 3);
  return shuffleArray([target.continent, ...distractors]);
}
