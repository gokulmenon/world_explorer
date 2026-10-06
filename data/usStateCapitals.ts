// US state capitals for the World Explorer "US Capitals" mode.
// Keyed by the 2-letter abbreviations used in data/usStates.ts.

export const usStateCapitals: Record<string, string> = {
  AL: 'Montgomery',
  AK: 'Juneau',
  AZ: 'Phoenix',
  AR: 'Little Rock',
  CA: 'Sacramento',
  CO: 'Denver',
  CT: 'Hartford',
  DE: 'Dover',
  FL: 'Tallahassee',
  GA: 'Atlanta',
  HI: 'Honolulu',
  ID: 'Boise',
  IL: 'Springfield',
  IN: 'Indianapolis',
  IA: 'Des Moines',
  KS: 'Topeka',
  KY: 'Frankfort',
  LA: 'Baton Rouge',
  ME: 'Augusta',
  MD: 'Annapolis',
  MA: 'Boston',
  MI: 'Lansing',
  MN: 'Saint Paul',
  MS: 'Jackson',
  MO: 'Jefferson City',
  MT: 'Helena',
  NE: 'Lincoln',
  NV: 'Carson City',
  NH: 'Concord',
  NJ: 'Trenton',
  NM: 'Santa Fe',
  NY: 'Albany',
  NC: 'Raleigh',
  ND: 'Bismarck',
  OH: 'Columbus',
  OK: 'Oklahoma City',
  OR: 'Salem',
  PA: 'Harrisburg',
  RI: 'Providence',
  SC: 'Columbia',
  SD: 'Pierre',
  TN: 'Nashville',
  TX: 'Austin',
  UT: 'Salt Lake City',
  VT: 'Montpelier',
  VA: 'Richmond',
  WA: 'Olympia',
  WV: 'Charleston',
  WI: 'Madison',
  WY: 'Cheyenne',
};

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/** All capital names, for building distractor options. */
export function allCapitals(): string[] {
  return Object.values(usStateCapitals);
}
