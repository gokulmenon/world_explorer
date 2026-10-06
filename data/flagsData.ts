// Flags Sprint data: curated pool of well-known countries with ISO-2 codes.
// The main gameData pools use 3-letter codes and the repo ships no flag
// assets, so the sprint renders flags as regional-indicator emoji (zero
// assets, renders on iPad Safari) via flagEmoji().

export interface FlagCountry {
  name: string;
  code3: string;
  iso2: string;
}

/** Regional-indicator emoji flag for a 2-letter ISO code, e.g. "US" → 🇺🇸 */
export function flagEmoji(iso2: string): string {
  return String.fromCodePoint(
    ...iso2
      .toUpperCase()
      .split('')
      .map((c) => 127397 + c.charCodeAt(0))
  );
}

export const flagsPool: FlagCountry[] = [
  { name: 'United States', code3: 'USA', iso2: 'US' },
  { name: 'Canada', code3: 'CAN', iso2: 'CA' },
  { name: 'Mexico', code3: 'MEX', iso2: 'MX' },
  { name: 'Brazil', code3: 'BRA', iso2: 'BR' },
  { name: 'Argentina', code3: 'ARG', iso2: 'AR' },
  { name: 'United Kingdom', code3: 'GBR', iso2: 'GB' },
  { name: 'France', code3: 'FRA', iso2: 'FR' },
  { name: 'Germany', code3: 'DEU', iso2: 'DE' },
  { name: 'Italy', code3: 'ITA', iso2: 'IT' },
  { name: 'Spain', code3: 'ESP', iso2: 'ES' },
  { name: 'Portugal', code3: 'PRT', iso2: 'PT' },
  { name: 'Netherlands', code3: 'NLD', iso2: 'NL' },
  { name: 'Switzerland', code3: 'CHE', iso2: 'CH' },
  { name: 'Sweden', code3: 'SWE', iso2: 'SE' },
  { name: 'Norway', code3: 'NOR', iso2: 'NO' },
  { name: 'Greece', code3: 'GRC', iso2: 'GR' },
  { name: 'Turkey', code3: 'TUR', iso2: 'TR' },
  { name: 'Russia', code3: 'RUS', iso2: 'RU' },
  { name: 'China', code3: 'CHN', iso2: 'CN' },
  { name: 'Japan', code3: 'JPN', iso2: 'JP' },
  { name: 'South Korea', code3: 'KOR', iso2: 'KR' },
  { name: 'India', code3: 'IND', iso2: 'IN' },
  { name: 'Thailand', code3: 'THA', iso2: 'TH' },
  { name: 'Vietnam', code3: 'VNM', iso2: 'VN' },
  { name: 'Indonesia', code3: 'IDN', iso2: 'ID' },
  { name: 'Malaysia', code3: 'MYS', iso2: 'MY' },
  { name: 'Philippines', code3: 'PHL', iso2: 'PH' },
  { name: 'Singapore', code3: 'SGP', iso2: 'SG' },
  { name: 'Australia', code3: 'AUS', iso2: 'AU' },
  { name: 'New Zealand', code3: 'NZL', iso2: 'NZ' },
  { name: 'South Africa', code3: 'ZAF', iso2: 'ZA' },
  { name: 'Egypt', code3: 'EGY', iso2: 'EG' },
  { name: 'Nigeria', code3: 'NGA', iso2: 'NG' },
  { name: 'Saudi Arabia', code3: 'SAU', iso2: 'SA' },
  { name: 'United Arab Emirates', code3: 'ARE', iso2: 'AE' },
  { name: 'Israel', code3: 'ISR', iso2: 'IL' },
  { name: 'Colombia', code3: 'COL', iso2: 'CO' },
  { name: 'Chile', code3: 'CHL', iso2: 'CL' },
  { name: 'Peru', code3: 'PER', iso2: 'PE' },
];

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/** Pick `count` random countries for a sprint run. */
export function selectSprintCountries(count: number = 10): FlagCountry[] {
  return shuffleArray(flagsPool).slice(0, count);
}

/** Build 4 multiple-choice options containing the target. */
export function buildFlagOptions(target: FlagCountry): FlagCountry[] {
  const distractors = shuffleArray(
    flagsPool.filter((c) => c.code3 !== target.code3)
  ).slice(0, 3);
  return shuffleArray([target, ...distractors]);
}
