// Languages data for the World Explorer "Languages" mode.

export interface LanguageCountry {
  name: string;
  language: string;
}

export const languagesPool: LanguageCountry[] = [
  { name: 'Brazil', language: 'Portuguese' },
  { name: 'Japan', language: 'Japanese' },
  { name: 'France', language: 'French' },
  { name: 'Germany', language: 'German' },
  { name: 'Spain', language: 'Spanish' },
  { name: 'Mexico', language: 'Spanish' },
  { name: 'Italy', language: 'Italian' },
  { name: 'China', language: 'Mandarin' },
  { name: 'India', language: 'Hindi' },
  { name: 'Russia', language: 'Russian' },
  { name: 'Egypt', language: 'Arabic' },
  { name: 'Saudi Arabia', language: 'Arabic' },
  { name: 'South Korea', language: 'Korean' },
  { name: 'Thailand', language: 'Thai' },
  { name: 'Vietnam', language: 'Vietnamese' },
  { name: 'Indonesia', language: 'Indonesian' },
  { name: 'Turkey', language: 'Turkish' },
  { name: 'Sweden', language: 'Swedish' },
  { name: 'Norway', language: 'Norwegian' },
  { name: 'Netherlands', language: 'Dutch' },
  { name: 'Greece', language: 'Greek' },
  { name: 'Portugal', language: 'Portuguese' },
  { name: 'Argentina', language: 'Spanish' },
  { name: 'Chile', language: 'Spanish' },
  { name: 'Colombia', language: 'Spanish' },
  { name: 'Peru', language: 'Spanish' },
  { name: 'Poland', language: 'Polish' },
  { name: 'Ukraine', language: 'Ukrainian' },
  { name: 'Kenya', language: 'Swahili' },
  { name: 'Israel', language: 'Hebrew' },
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
export function selectLanguageCountries(count: number = 10): LanguageCountry[] {
  return shuffleArray(languagesPool).slice(0, count);
}

/** Build 4 multiple-choice language options containing the target. */
export function buildLanguageOptions(target: LanguageCountry): string[] {
  const distractors = shuffleArray(
    [...new Set(languagesPool.map((c) => c.language))].filter(
      (c) => c !== target.language
    )
  ).slice(0, 3);
  return shuffleArray([target.language, ...distractors]);
}
