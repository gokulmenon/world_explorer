export interface Country {
  name: string;
  code: string;
  continent: 'Africa' | 'Asia' | 'Europe' | 'North America' | 'South America' | 'Oceania';
  coordinates: { latitude: number; longitude: number };
}

export interface Level {
  level: number;
  countries: Country[];
}

export interface GameState {
  currentLevel: number;
  currentCountryIndex: number;
  selectedCountries: Country[][];
  targetCountry: Country | null;
  score: number;
  questionStartTime: number;
  gameStartTime: number;
  hintUsed: boolean;
  isComplete: boolean;
  showingContinent: string | null;
}

export const countryPools: Record<number, Country[]> = {
  1: [
    { name: 'Russia', code: 'RU', continent: 'Europe', coordinates: { latitude: 61, longitude: 105 } },
    { name: 'Canada', code: 'CA', continent: 'North America', coordinates: { latitude: 56, longitude: -106 } },
    { name: 'United States', code: 'US', continent: 'North America', coordinates: { latitude: 38, longitude: -97 } },
    { name: 'China', code: 'CN', continent: 'Asia', coordinates: { latitude: 35, longitude: 105 } },
    { name: 'Brazil', code: 'BR', continent: 'South America', coordinates: { latitude: -10, longitude: -55 } },
    { name: 'Australia', code: 'AU', continent: 'Oceania', coordinates: { latitude: -27, longitude: 133 } },
    { name: 'India', code: 'IN', continent: 'Asia', coordinates: { latitude: 20, longitude: 77 } },
    { name: 'Argentina', code: 'AR', continent: 'South America', coordinates: { latitude: -34, longitude: -64 } },
    { name: 'Kazakhstan', code: 'KZ', continent: 'Asia', coordinates: { latitude: 48, longitude: 68 } },
    { name: 'Algeria', code: 'DZ', continent: 'Africa', coordinates: { latitude: 28, longitude: 3 } },
    { name: 'Congo', code: 'CD', continent: 'Africa', coordinates: { latitude: -4, longitude: 21 } },
    { name: 'Saudi Arabia', code: 'SA', continent: 'Asia', coordinates: { latitude: 24, longitude: 45 } },
    { name: 'Mexico', code: 'MX', continent: 'North America', coordinates: { latitude: 23, longitude: -102 } },
    { name: 'Indonesia', code: 'ID', continent: 'Asia', coordinates: { latitude: -2, longitude: 118 } },
    { name: 'Libya', code: 'LY', continent: 'Africa', coordinates: { latitude: 27, longitude: 17 } },
  ],
  2: [
    { name: 'Iran', code: 'IR', continent: 'Asia', coordinates: { latitude: 32, longitude: 53 } },
    { name: 'Mongolia', code: 'MN', continent: 'Asia', coordinates: { latitude: 46, longitude: 105 } },
    { name: 'Peru', code: 'PE', continent: 'South America', coordinates: { latitude: -10, longitude: -76 } },
    { name: 'Chad', code: 'TD', continent: 'Africa', coordinates: { latitude: 15, longitude: 19 } },
    { name: 'Niger', code: 'NE', continent: 'Africa', coordinates: { latitude: 16, longitude: 8 } },
    { name: 'Angola', code: 'AO', continent: 'Africa', coordinates: { latitude: -12, longitude: 18 } },
    { name: 'Mali', code: 'ML', continent: 'Africa', coordinates: { latitude: 17, longitude: -4 } },
    { name: 'South Africa', code: 'ZA', continent: 'Africa', coordinates: { latitude: -29, longitude: 24 } },
    { name: 'Colombia', code: 'CO', continent: 'South America', coordinates: { latitude: 4, longitude: -72 } },
    { name: 'Ethiopia', code: 'ET', continent: 'Africa', coordinates: { latitude: 8, longitude: 38 } },
    { name: 'Bolivia', code: 'BO', continent: 'South America', coordinates: { latitude: -17, longitude: -65 } },
    { name: 'Mauritania', code: 'MR', continent: 'Africa', coordinates: { latitude: 20, longitude: -10 } },
    { name: 'Egypt', code: 'EG', continent: 'Africa', coordinates: { latitude: 27, longitude: 30 } },
    { name: 'Turkey', code: 'TR', continent: 'Asia', coordinates: { latitude: 39, longitude: 35 } },
    { name: 'Nigeria', code: 'NG', continent: 'Africa', coordinates: { latitude: 10, longitude: 8 } },
  ],
  3: [
    { name: 'Venezuela', code: 'VE', continent: 'South America', coordinates: { latitude: 8, longitude: -66 } },
    { name: 'Pakistan', code: 'PK', continent: 'Asia', coordinates: { latitude: 30, longitude: 70 } },
    { name: 'Mozambique', code: 'MZ', continent: 'Africa', coordinates: { latitude: -18, longitude: 35 } },
    { name: 'Chile', code: 'CL', continent: 'South America', coordinates: { latitude: -30, longitude: -71 } },
    { name: 'Zambia', code: 'ZM', continent: 'Africa', coordinates: { latitude: -15, longitude: 30 } },
    { name: 'Myanmar', code: 'MM', continent: 'Asia', coordinates: { latitude: 22, longitude: 98 } },
    { name: 'Afghanistan', code: 'AF', continent: 'Asia', coordinates: { latitude: 33, longitude: 65 } },
    { name: 'Somalia', code: 'SO', continent: 'Africa', coordinates: { latitude: 10, longitude: 49 } },
    { name: 'Kenya', code: 'KE', continent: 'Africa', coordinates: { latitude: 1, longitude: 38 } },
    { name: 'France', code: 'FR', continent: 'Europe', coordinates: { latitude: 46, longitude: 2 } },
    { name: 'Spain', code: 'ES', continent: 'Europe', coordinates: { latitude: 40, longitude: -4 } },
    { name: 'Ukraine', code: 'UA', continent: 'Europe', coordinates: { latitude: 49, longitude: 32 } },
    { name: 'Thailand', code: 'TH', continent: 'Asia', coordinates: { latitude: 15, longitude: 100 } },
    { name: 'Yemen', code: 'YE', continent: 'Asia', coordinates: { latitude: 15, longitude: 48 } },
    { name: 'Sweden', code: 'SE', continent: 'Europe', coordinates: { latitude: 62, longitude: 15 } },
  ],
  4: [
    { name: 'Germany', code: 'DE', continent: 'Europe', coordinates: { latitude: 51, longitude: 9 } },
    { name: 'Japan', code: 'JP', continent: 'Asia', coordinates: { latitude: 36, longitude: 138 } },
    { name: 'Poland', code: 'PL', continent: 'Europe', coordinates: { latitude: 52, longitude: 20 } },
    { name: 'Italy', code: 'IT', continent: 'Europe', coordinates: { latitude: 43, longitude: 12 } },
    { name: 'Philippines', code: 'PH', continent: 'Asia', coordinates: { latitude: 13, longitude: 122 } },
    { name: 'Ecuador', code: 'EC', continent: 'South America', coordinates: { latitude: -2, longitude: -77 } },
    { name: 'New Zealand', code: 'NZ', continent: 'Oceania', coordinates: { latitude: -41, longitude: 174 } },
    { name: 'United Kingdom', code: 'GB', continent: 'Europe', coordinates: { latitude: 54, longitude: -2 } },
    { name: 'Romania', code: 'RO', continent: 'Europe', coordinates: { latitude: 46, longitude: 25 } },
    { name: 'Uruguay', code: 'UY', continent: 'South America', coordinates: { latitude: -33, longitude: -56 } },
    { name: 'Tunisia', code: 'TN', continent: 'Africa', coordinates: { latitude: 34, longitude: 9 } },
    { name: 'Bangladesh', code: 'BD', continent: 'Asia', coordinates: { latitude: 24, longitude: 90 } },
    { name: 'Greece', code: 'GR', continent: 'Europe', coordinates: { latitude: 39, longitude: 22 } },
    { name: 'Cuba', code: 'CU', continent: 'North America', coordinates: { latitude: 22, longitude: -79 } },
    { name: 'Portugal', code: 'PT', continent: 'Europe', coordinates: { latitude: 39, longitude: -8 } },
  ],
  5: [
    { name: 'Luxembourg', code: 'LU', continent: 'Europe', coordinates: { latitude: 50, longitude: 6 } },
    { name: 'Singapore', code: 'SG', continent: 'Asia', coordinates: { latitude: 1, longitude: 104 } },
    { name: 'Malta', code: 'MT', continent: 'Europe', coordinates: { latitude: 36, longitude: 14 } },
    { name: 'Bahrain', code: 'BH', continent: 'Asia', coordinates: { latitude: 26, longitude: 51 } },
    { name: 'Mauritius', code: 'MU', continent: 'Africa', coordinates: { latitude: -20, longitude: 57 } },
    { name: 'Cyprus', code: 'CY', continent: 'Europe', coordinates: { latitude: 35, longitude: 33 } },
    { name: 'Jamaica', code: 'JM', continent: 'North America', coordinates: { latitude: 18, longitude: -77 } },
    { name: 'Qatar', code: 'QA', continent: 'Asia', coordinates: { latitude: 25, longitude: 51 } },
    { name: 'Lebanon', code: 'LB', continent: 'Asia', coordinates: { latitude: 34, longitude: 36 } },
    { name: 'Slovenia', code: 'SI', continent: 'Europe', coordinates: { latitude: 46, longitude: 15 } },
    { name: 'Kuwait', code: 'KW', continent: 'Asia', coordinates: { latitude: 29, longitude: 48 } },
    { name: 'Fiji', code: 'FJ', continent: 'Oceania', coordinates: { latitude: -18, longitude: 178 } },
    { name: 'Bahamas', code: 'BS', continent: 'North America', coordinates: { latitude: 25, longitude: -77 } },
    { name: 'Iceland', code: 'IS', continent: 'Europe', coordinates: { latitude: 65, longitude: -18 } },
    { name: 'Estonia', code: 'EE', continent: 'Europe', coordinates: { latitude: 59, longitude: 26 } },
  ],
};

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function selectRandomCountries(level: number, count: number = 5): Country[] {
  const pool = countryPools[level];
  const shuffled = shuffleArray(pool);
  return shuffled.slice(0, count);
}

export function initializeGame(): Country[][] {
  return [
    selectRandomCountries(1),
    selectRandomCountries(2),
    selectRandomCountries(3),
    selectRandomCountries(4),
    selectRandomCountries(5),
  ];
}
