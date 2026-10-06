// US states dataset for the World Explorer "US states" mode.
// `fips` matches the zero-padded state ids in us-atlas@3 states-10m.json.
// `region` powers the hint highlight. `isSmall` states get circle hit-targets
// on the map (same pattern as small countries in WorldMap).

export type USRegion = 'Northeast' | 'Midwest' | 'South' | 'West';

export interface USState {
  name: string;
  abbr: string;
  fips: string;
  region: USRegion;
  latitude: number;
  longitude: number;
  isSmall?: boolean;
}

export const usStates: USState[] = [
  { name: 'Alabama', abbr: 'AL', fips: '01', region: 'South', latitude: 32.7, longitude: -86.9 },
  { name: 'Alaska', abbr: 'AK', fips: '02', region: 'West', latitude: 61.4, longitude: -152.3 },
  { name: 'Arizona', abbr: 'AZ', fips: '04', region: 'West', latitude: 33.7, longitude: -111.5 },
  { name: 'Arkansas', abbr: 'AR', fips: '05', region: 'South', latitude: 34.9, longitude: -92.3 },
  { name: 'California', abbr: 'CA', fips: '06', region: 'West', latitude: 36.1, longitude: -119.7 },
  { name: 'Colorado', abbr: 'CO', fips: '08', region: 'West', latitude: 39.0, longitude: -105.5 },
  { name: 'Connecticut', abbr: 'CT', fips: '09', region: 'Northeast', latitude: 41.6, longitude: -72.7, isSmall: true },
  { name: 'Delaware', abbr: 'DE', fips: '10', region: 'South', latitude: 39.3, longitude: -75.5, isSmall: true },
  { name: 'Florida', abbr: 'FL', fips: '12', region: 'South', latitude: 27.9, longitude: -81.7 },
  { name: 'Georgia', abbr: 'GA', fips: '13', region: 'South', latitude: 32.9, longitude: -83.1 },
  { name: 'Hawaii', abbr: 'HI', fips: '15', region: 'West', latitude: 21.1, longitude: -157.5 },
  { name: 'Idaho', abbr: 'ID', fips: '16', region: 'West', latitude: 44.2, longitude: -114.5 },
  { name: 'Illinois', abbr: 'IL', fips: '17', region: 'Midwest', latitude: 40.0, longitude: -89.2 },
  { name: 'Indiana', abbr: 'IN', fips: '18', region: 'Midwest', latitude: 39.8, longitude: -86.1 },
  { name: 'Iowa', abbr: 'IA', fips: '19', region: 'Midwest', latitude: 42.0, longitude: -93.5 },
  { name: 'Kansas', abbr: 'KS', fips: '20', region: 'Midwest', latitude: 38.5, longitude: -98.4 },
  { name: 'Kentucky', abbr: 'KY', fips: '21', region: 'South', latitude: 37.5, longitude: -85.3 },
  { name: 'Louisiana', abbr: 'LA', fips: '22', region: 'South', latitude: 31.0, longitude: -91.9 },
  { name: 'Maine', abbr: 'ME', fips: '23', region: 'Northeast', latitude: 45.4, longitude: -69.4 },
  { name: 'Maryland', abbr: 'MD', fips: '24', region: 'South', latitude: 39.0, longitude: -76.8, isSmall: true },
  { name: 'Massachusetts', abbr: 'MA', fips: '25', region: 'Northeast', latitude: 42.2, longitude: -71.5, isSmall: true },
  { name: 'Michigan', abbr: 'MI', fips: '26', region: 'Midwest', latitude: 43.9, longitude: -84.9 },
  { name: 'Minnesota', abbr: 'MN', fips: '27', region: 'Midwest', latitude: 45.7, longitude: -93.9 },
  { name: 'Mississippi', abbr: 'MS', fips: '28', region: 'South', latitude: 32.7, longitude: -89.6 },
  { name: 'Missouri', abbr: 'MO', fips: '29', region: 'Midwest', latitude: 38.4, longitude: -92.5 },
  { name: 'Montana', abbr: 'MT', fips: '30', region: 'West', latitude: 47.0, longitude: -110.0 },
  { name: 'Nebraska', abbr: 'NE', fips: '31', region: 'Midwest', latitude: 41.1, longitude: -99.9 },
  { name: 'Nevada', abbr: 'NV', fips: '32', region: 'West', latitude: 38.9, longitude: -117.1 },
  { name: 'New Hampshire', abbr: 'NH', fips: '33', region: 'Northeast', latitude: 43.4, longitude: -71.5, isSmall: true },
  { name: 'New Jersey', abbr: 'NJ', fips: '34', region: 'Northeast', latitude: 40.3, longitude: -74.5, isSmall: true },
  { name: 'New Mexico', abbr: 'NM', fips: '35', region: 'West', latitude: 34.8, longitude: -106.2 },
  { name: 'New York', abbr: 'NY', fips: '36', region: 'Northeast', latitude: 42.2, longitude: -74.9 },
  { name: 'North Carolina', abbr: 'NC', fips: '37', region: 'South', latitude: 35.6, longitude: -79.5 },
  { name: 'North Dakota', abbr: 'ND', fips: '38', region: 'Midwest', latitude: 47.4, longitude: -100.5 },
  { name: 'Ohio', abbr: 'OH', fips: '39', region: 'Midwest', latitude: 40.4, longitude: -82.9 },
  { name: 'Oklahoma', abbr: 'OK', fips: '40', region: 'South', latitude: 35.5, longitude: -97.5 },
  { name: 'Oregon', abbr: 'OR', fips: '41', region: 'West', latitude: 44.6, longitude: -120.5 },
  { name: 'Pennsylvania', abbr: 'PA', fips: '42', region: 'Northeast', latitude: 41.2, longitude: -77.2 },
  { name: 'Rhode Island', abbr: 'RI', fips: '44', region: 'Northeast', latitude: 41.7, longitude: -71.5, isSmall: true },
  { name: 'South Carolina', abbr: 'SC', fips: '45', region: 'South', latitude: 33.9, longitude: -80.9 },
  { name: 'South Dakota', abbr: 'SD', fips: '46', region: 'Midwest', latitude: 44.2, longitude: -99.4 },
  { name: 'Tennessee', abbr: 'TN', fips: '47', region: 'South', latitude: 35.7, longitude: -86.7 },
  { name: 'Texas', abbr: 'TX', fips: '48', region: 'South', latitude: 31.0, longitude: -100.0 },
  { name: 'Utah', abbr: 'UT', fips: '49', region: 'West', latitude: 39.5, longitude: -111.4 },
  { name: 'Vermont', abbr: 'VT', fips: '50', region: 'Northeast', latitude: 44.0, longitude: -72.7, isSmall: true },
  { name: 'Virginia', abbr: 'VA', fips: '51', region: 'South', latitude: 37.9, longitude: -78.0 },
  { name: 'Washington', abbr: 'WA', fips: '53', region: 'West', latitude: 47.4, longitude: -120.6 },
  { name: 'West Virginia', abbr: 'WV', fips: '54', region: 'South', latitude: 38.6, longitude: -80.6 },
  { name: 'Wisconsin', abbr: 'WI', fips: '55', region: 'Midwest', latitude: 44.3, longitude: -89.5 },
  { name: 'Wyoming', abbr: 'WY', fips: '56', region: 'West', latitude: 43.0, longitude: -107.5 },
];

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/** Pick `count` random states for a run. */
export function selectRandomStates(count: number = 10): USState[] {
  return shuffleArray(usStates).slice(0, count);
}
