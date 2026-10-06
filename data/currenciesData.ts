// Currencies data for the World Explorer "Currencies" mode.

export interface CurrencyCountry {
  name: string;
  currency: string;
}

export const currenciesPool: CurrencyCountry[] = [
  { name: 'United States', currency: 'Dollar' },
  { name: 'Japan', currency: 'Yen' },
  { name: 'United Kingdom', currency: 'Pound' },
  { name: 'France', currency: 'Euro' },
  { name: 'India', currency: 'Rupee' },
  { name: 'China', currency: 'Yuan' },
  { name: 'Mexico', currency: 'Peso' },
  { name: 'South Korea', currency: 'Won' },
  { name: 'Brazil', currency: 'Real' },
  { name: 'Russia', currency: 'Ruble' },
  { name: 'South Africa', currency: 'Rand' },
  { name: 'Thailand', currency: 'Baht' },
  { name: 'Vietnam', currency: 'Dong' },
  { name: 'Indonesia', currency: 'Rupiah' },
  { name: 'Saudi Arabia', currency: 'Riyal' },
  { name: 'Israel', currency: 'Shekel' },
  { name: 'Sweden', currency: 'Krona' },
  { name: 'Switzerland', currency: 'Franc' },
  { name: 'Norway', currency: 'Krone' },
  { name: 'Canada', currency: 'Dollar' },
  { name: 'Australia', currency: 'Dollar' },
  { name: 'Turkey', currency: 'Lira' },
  { name: 'Poland', currency: 'Zloty' },
  { name: 'Czech Republic', currency: 'Koruna' },
  { name: 'Hungary', currency: 'Forint' },
  { name: 'New Zealand', currency: 'Dollar' },
  { name: 'Singapore', currency: 'Dollar' },
  { name: 'Philippines', currency: 'Peso' },
  { name: 'Egypt', currency: 'Pound' },
  { name: 'Denmark', currency: 'Krone' },
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
export function selectCurrencyCountries(count: number = 10): CurrencyCountry[] {
  return shuffleArray(currenciesPool).slice(0, count);
}

/** Build 4 multiple-choice currency options containing the target. */
export function buildCurrencyOptions(target: CurrencyCountry): string[] {
  const distractors = shuffleArray(
    [...new Set(currenciesPool.map((c) => c.currency))].filter(
      (c) => c !== target.currency
    )
  ).slice(0, 3);
  return shuffleArray([target.currency, ...distractors]);
}
