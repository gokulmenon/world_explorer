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
    { name: 'United States', code: 'USA', continent: 'North America', coordinates: { latitude: 38, longitude: -97 } },
    { name: 'Canada', code: 'CAN', continent: 'North America', coordinates: { latitude: 56, longitude: -106 } },
    { name: 'Mexico', code: 'MEX', continent: 'North America', coordinates: { latitude: 23, longitude: -102 } },
    { name: 'Brazil', code: 'BRA', continent: 'South America', coordinates: { latitude: -14, longitude: -51 } },
    { name: 'Argentina', code: 'ARG', continent: 'South America', coordinates: { latitude: -38, longitude: -68 } },
    { name: 'United Kingdom', code: 'GBR', continent: 'Europe', coordinates: { latitude: 55, longitude: -3 } },
    { name: 'France', code: 'FRA', continent: 'Europe', coordinates: { latitude: 46, longitude: 2 } },
    { name: 'Germany', code: 'DEU', continent: 'Europe', coordinates: { latitude: 51, longitude: 9 } },
    { name: 'Italy', code: 'ITA', continent: 'Europe', coordinates: { latitude: 41, longitude: 12 } },
    { name: 'Spain', code: 'ESP', continent: 'Europe', coordinates: { latitude: 40, longitude: -4 } },
    { name: 'Russia', code: 'RUS', continent: 'Europe', coordinates: { latitude: 61, longitude: 105 } },
    { name: 'China', code: 'CHN', continent: 'Asia', coordinates: { latitude: 35, longitude: 105 } },
    { name: 'Japan', code: 'JPN', continent: 'Asia', coordinates: { latitude: 36, longitude: 138 } },
    { name: 'South Korea', code: 'KOR', continent: 'Asia', coordinates: { latitude: 35, longitude: 127 } },
    { name: 'India', code: 'IND', continent: 'Asia', coordinates: { latitude: 20, longitude: 77 } },
    { name: 'Australia', code: 'AUS', continent: 'Oceania', coordinates: { latitude: -25, longitude: 133 } },
    { name: 'South Africa', code: 'ZAF', continent: 'Africa', coordinates: { latitude: -30, longitude: 22 } },
    { name: 'Egypt', code: 'EGY', continent: 'Africa', coordinates: { latitude: 26, longitude: 30 } },
    { name: 'Saudi Arabia', code: 'SAU', continent: 'Asia', coordinates: { latitude: 23, longitude: 45 } },
    { name: 'United Arab Emirates', code: 'ARE', continent: 'Asia', coordinates: { latitude: 23, longitude: 53 } },
    { name: 'Turkey', code: 'TUR', continent: 'Asia', coordinates: { latitude: 39, longitude: 35 } },
    { name: 'Greece', code: 'GRC', continent: 'Europe', coordinates: { latitude: 39, longitude: 22 } },
    { name: 'Thailand', code: 'THA', continent: 'Asia', coordinates: { latitude: 15, longitude: 100 } },
    { name: 'Vietnam', code: 'VNM', continent: 'Asia', coordinates: { latitude: 14, longitude: 108 } },
    { name: 'Indonesia', code: 'IDN', continent: 'Asia', coordinates: { latitude: -5, longitude: 120 } },
    { name: 'Singapore', code: 'SGP', continent: 'Asia', coordinates: { latitude: 1.3, longitude: 103.8 } },
    { name: 'Malaysia', code: 'MYS', continent: 'Asia', coordinates: { latitude: 4, longitude: 109 } },
    { name: 'Philippines', code: 'PHL', continent: 'Asia', coordinates: { latitude: 12, longitude: 121 } },
    { name: 'Netherlands', code: 'NLD', continent: 'Europe', coordinates: { latitude: 52, longitude: 5 } },
    { name: 'Switzerland', code: 'CHE', continent: 'Europe', coordinates: { latitude: 47, longitude: 8 } },
    { name: 'Sweden', code: 'SWE', continent: 'Europe', coordinates: { latitude: 60, longitude: 15 } },
    { name: 'Norway', code: 'NOR', continent: 'Europe', coordinates: { latitude: 62, longitude: 10 } },
    { name: 'Portugal', code: 'PRT', continent: 'Europe', coordinates: { latitude: 39, longitude: -8 } },
    { name: 'New Zealand', code: 'NZL', continent: 'Oceania', coordinates: { latitude: -40, longitude: 174 } },
    { name: 'Israel', code: 'ISR', continent: 'Asia', coordinates: { latitude: 31, longitude: 34 } },
    { name: 'Colombia', code: 'COL', continent: 'South America', coordinates: { latitude: 4, longitude: -72 } },
    { name: 'Chile', code: 'CHL', continent: 'South America', coordinates: { latitude: -35, longitude: -71 } },
    { name: 'Peru', code: 'PER', continent: 'South America', coordinates: { latitude: -9, longitude: -75 } },
    { name: 'Nigeria', code: 'NGA', continent: 'Africa', coordinates: { latitude: 9, longitude: 8 } }
  ],
  2: [
    { name: 'Belgium', code: 'BEL', continent: 'Europe', coordinates: { latitude: 50.5, longitude: 4.4 } },
    { name: 'Austria', code: 'AUT', continent: 'Europe', coordinates: { latitude: 47.5, longitude: 14.5 } },
    { name: 'Poland', code: 'POL', continent: 'Europe', coordinates: { latitude: 52, longitude: 20 } },
    { name: 'Czechia', code: 'CZE', continent: 'Europe', coordinates: { latitude: 49.8, longitude: 15.4 } },
    { name: 'Hungary', code: 'HUN', continent: 'Europe', coordinates: { latitude: 47, longitude: 20 } },
    { name: 'Romania', code: 'ROU', continent: 'Europe', coordinates: { latitude: 46, longitude: 25 } },
    { name: 'Bulgaria', code: 'BGR', continent: 'Europe', coordinates: { latitude: 43, longitude: 25 } },
    { name: 'Croatia', code: 'HRV', continent: 'Europe', coordinates: { latitude: 45, longitude: 15 } },
    { name: 'Serbia', code: 'SRB', continent: 'Europe', coordinates: { latitude: 44, longitude: 21 } },
    { name: 'Ukraine', code: 'UKR', continent: 'Europe', coordinates: { latitude: 48, longitude: 30 } },
    { name: 'Finland', code: 'FIN', continent: 'Europe', coordinates: { latitude: 64, longitude: 26 } },
    { name: 'Denmark', code: 'DNK', continent: 'Europe', coordinates: { latitude: 56, longitude: 10 } },
    { name: 'Ireland', code: 'IRL', continent: 'Europe', coordinates: { latitude: 53, longitude: -8 } },
    { name: 'Venezuela', code: 'VEN', continent: 'South America', coordinates: { latitude: 8, longitude: -66 } },
    { name: 'Cuba', code: 'CUB', continent: 'North America', coordinates: { latitude: 21.5, longitude: -80 } },
    { name: 'Jamaica', code: 'JAM', continent: 'North America', coordinates: { latitude: 18.1, longitude: -77.2 } },
    { name: 'Dominican Republic', code: 'DOM', continent: 'North America', coordinates: { latitude: 19, longitude: -70.6 } },
    { name: 'Morocco', code: 'MAR', continent: 'Africa', coordinates: { latitude: 31.7, longitude: -7 } },
    { name: 'Algeria', code: 'DZA', continent: 'Africa', coordinates: { latitude: 28, longitude: 1.6 } },
    { name: 'Kenya', code: 'KEN', continent: 'Africa', coordinates: { latitude: 1, longitude: 38 } },
    { name: 'Ethiopia', code: 'ETH', continent: 'Africa', coordinates: { latitude: 9, longitude: 40 } },
    { name: 'Ghana', code: 'GHA', continent: 'Africa', coordinates: { latitude: 8, longitude: -1 } },
    { name: 'Tanzania', code: 'TZA', continent: 'Africa', coordinates: { latitude: -6, longitude: 35 } },
    { name: 'Pakistan', code: 'PAK', continent: 'Asia', coordinates: { latitude: 30, longitude: 70 } },
    { name: 'Bangladesh', code: 'BGD', continent: 'Asia', coordinates: { latitude: 24, longitude: 90 } },
    { name: 'Sri Lanka', code: 'LKA', continent: 'Asia', coordinates: { latitude: 7, longitude: 81 } },
    { name: 'Iran', code: 'IRN', continent: 'Asia', coordinates: { latitude: 32, longitude: 53 } },
    { name: 'Iraq', code: 'IRQ', continent: 'Asia', coordinates: { latitude: 33, longitude: 44 } },
    { name: 'Jordan', code: 'JOR', continent: 'Asia', coordinates: { latitude: 31, longitude: 36 } },
    { name: 'Lebanon', code: 'LBN', continent: 'Asia', coordinates: { latitude: 33.8, longitude: 35.8 } },
    { name: 'Syria', code: 'SYR', continent: 'Asia', coordinates: { latitude: 35, longitude: 38 } },
    { name: 'Costa Rica', code: 'CRI', continent: 'North America', coordinates: { latitude: 10, longitude: -84 } },
    { name: 'Panama', code: 'PAN', continent: 'North America', coordinates: { latitude: 9, longitude: -80 } },
    { name: 'Uruguay', code: 'URY', continent: 'South America', coordinates: { latitude: -33, longitude: -56 } },
    { name: 'Ecuador', code: 'ECU', continent: 'South America', coordinates: { latitude: -1.8, longitude: -78 } },
    { name: 'Bolivia', code: 'BOL', continent: 'South America', coordinates: { latitude: -16, longitude: -64 } },
    { name: 'Taiwan', code: 'TWN', continent: 'Asia', coordinates: { latitude: 23.6, longitude: 121 } },
    { name: 'Senegal', code: 'SEN', continent: 'Africa', coordinates: { latitude: 14, longitude: -14 } },
    { name: 'Iceland', code: 'ISL', continent: 'Europe', coordinates: { latitude: 65, longitude: -18 } }
  ],
  3: [
    { name: 'Slovenia', code: 'SVN', continent: 'Europe', coordinates: { latitude: 46, longitude: 15 } },
    { name: 'Slovakia', code: 'SVK', continent: 'Europe', coordinates: { latitude: 48.6, longitude: 19.5 } },
    { name: 'Bosnia and Herzegovina', code: 'BIH', continent: 'Europe', coordinates: { latitude: 44, longitude: 18 } },
    { name: 'Albania', code: 'ALB', continent: 'Europe', coordinates: { latitude: 41, longitude: 20 } },
    { name: 'North Macedonia', code: 'MKD', continent: 'Europe', coordinates: { latitude: 41.8, longitude: 21.7 } },
    { name: 'Estonia', code: 'EST', continent: 'Europe', coordinates: { latitude: 59, longitude: 26 } },
    { name: 'Latvia', code: 'LVA', continent: 'Europe', coordinates: { latitude: 57, longitude: 25 } },
    { name: 'Lithuania', code: 'LTU', continent: 'Europe', coordinates: { latitude: 55, longitude: 24 } },
    { name: 'Belarus', code: 'BLR', continent: 'Europe', coordinates: { latitude: 53, longitude: 28 } },
    { name: 'Moldova', code: 'MDA', continent: 'Europe', coordinates: { latitude: 47, longitude: 29 } },
    { name: 'Georgia', code: 'GEO', continent: 'Asia', coordinates: { latitude: 42, longitude: 43.5 } },
    { name: 'Armenia', code: 'ARM', continent: 'Asia', coordinates: { latitude: 40, longitude: 45 } },
    { name: 'Azerbaijan', code: 'AZE', continent: 'Asia', coordinates: { latitude: 40.5, longitude: 47.5 } },
    { name: 'Kazakhstan', code: 'KAZ', continent: 'Asia', coordinates: { latitude: 48, longitude: 68 } },
    { name: 'Uzbekistan', code: 'UZB', continent: 'Asia', coordinates: { latitude: 41, longitude: 64 } },
    { name: 'Paraguay', code: 'PRY', continent: 'South America', coordinates: { latitude: -23, longitude: -58 } },
    { name: 'Guatemala', code: 'GTM', continent: 'North America', coordinates: { latitude: 15.5, longitude: -90.2 } },
    { name: 'Honduras', code: 'HND', continent: 'North America', coordinates: { latitude: 15, longitude: -86.5 } },
    { name: 'El Salvador', code: 'SLV', continent: 'North America', coordinates: { latitude: 13.8, longitude: -88.9 } },
    { name: 'Nicaragua', code: 'NIC', continent: 'North America', coordinates: { latitude: 13, longitude: -85 } },
    { name: 'Ivory Coast', code: 'CIV', continent: 'Africa', coordinates: { latitude: 8, longitude: -5 } },
    { name: 'Cameroon', code: 'CMR', continent: 'Africa', coordinates: { latitude: 6, longitude: 12 } },
    { name: 'Angola', code: 'AGO', continent: 'Africa', coordinates: { latitude: -12.5, longitude: 18.5 } },
    { name: 'Mozambique', code: 'MOZ', continent: 'Africa', coordinates: { latitude: -18.2, longitude: 35 } },
    { name: 'Zimbabwe', code: 'ZWE', continent: 'Africa', coordinates: { latitude: -19, longitude: 29 } },
    { name: 'Zambia', code: 'ZMB', continent: 'Africa', coordinates: { latitude: -15, longitude: 30 } },
    { name: 'Uganda', code: 'UGA', continent: 'Africa', coordinates: { latitude: 1, longitude: 32 } },
    { name: 'Rwanda', code: 'RWA', continent: 'Africa', coordinates: { latitude: -2, longitude: 30 } },
    { name: 'Tunisia', code: 'TUN', continent: 'Africa', coordinates: { latitude: 34, longitude: 9 } },
    { name: 'Libya', code: 'LBY', continent: 'Africa', coordinates: { latitude: 25, longitude: 17 } },
    { name: 'Sudan', code: 'SDN', continent: 'Africa', coordinates: { latitude: 15, longitude: 30 } },
    { name: 'Kuwait', code: 'KWT', continent: 'Asia', coordinates: { latitude: 29.3, longitude: 47.5 } },
    { name: 'Oman', code: 'OMN', continent: 'Asia', coordinates: { latitude: 21, longitude: 56 } },
    { name: 'Qatar', code: 'QAT', continent: 'Asia', coordinates: { latitude: 25.3, longitude: 51.5 } },
    { name: 'Bahrain', code: 'BHR', continent: 'Asia', coordinates: { latitude: 26, longitude: 50.5 } },
    { name: 'Yemen', code: 'YEM', continent: 'Asia', coordinates: { latitude: 15, longitude: 48 } },
    { name: 'Nepal', code: 'NPL', continent: 'Asia', coordinates: { latitude: 28, longitude: 84 } },
    { name: 'Myanmar', code: 'MMR', continent: 'Asia', coordinates: { latitude: 21, longitude: 96 } },
    { name: 'Cambodia', code: 'KHM', continent: 'Asia', coordinates: { latitude: 13, longitude: 105 } }
  ],
  4: [
    { name: 'Laos', code: 'LAO', continent: 'Asia', coordinates: { latitude: 18, longitude: 105 } },
    { name: 'Mongolia', code: 'MNG', continent: 'Asia', coordinates: { latitude: 46, longitude: 105 } },
    { name: 'North Korea', code: 'PRK', continent: 'Asia', coordinates: { latitude: 40, longitude: 127 } },
    { name: 'Afghanistan', code: 'AFG', continent: 'Asia', coordinates: { latitude: 33, longitude: 65 } },
    { name: 'Tajikistan', code: 'TJK', continent: 'Asia', coordinates: { latitude: 39, longitude: 71 } },
    { name: 'Kyrgyzstan', code: 'KGZ', continent: 'Asia', coordinates: { latitude: 41, longitude: 75 } },
    { name: 'Turkmenistan', code: 'TKM', continent: 'Asia', coordinates: { latitude: 40, longitude: 60 } },
    { name: 'Mali', code: 'MLI', continent: 'Africa', coordinates: { latitude: 17, longitude: -4 } },
    { name: 'Burkina Faso', code: 'BFA', continent: 'Africa', coordinates: { latitude: 13, longitude: -2 } },
    { name: 'Niger', code: 'NER', continent: 'Africa', coordinates: { latitude: 16, longitude: 8 } },
    { name: 'Chad', code: 'TCD', continent: 'Africa', coordinates: { latitude: 15, longitude: 19 } },
    { name: 'Mauritania', code: 'MRT', continent: 'Africa', coordinates: { latitude: 20, longitude: -12 } },
    { name: 'Guinea', code: 'GIN', continent: 'Africa', coordinates: { latitude: 11, longitude: -10 } },
    { name: 'Sierra Leone', code: 'SLE', continent: 'Africa', coordinates: { latitude: 8.5, longitude: -11.5 } },
    { name: 'Liberia', code: 'LBR', continent: 'Africa', coordinates: { latitude: 6.5, longitude: -9.5 } },
    { name: 'Togo', code: 'TGO', continent: 'Africa', coordinates: { latitude: 8, longitude: 1.1 } },
    { name: 'Benin', code: 'BEN', continent: 'Africa', coordinates: { latitude: 9.5, longitude: 2.2 } },
    { name: 'Central African Republic', code: 'CAF', continent: 'Africa', coordinates: { latitude: 7, longitude: 21 } },
    { name: 'Democratic Republic of the Congo', code: 'COD', continent: 'Africa', coordinates: { latitude: -4.3, longitude: 23.6 } },
    { name: 'Republic of the Congo', code: 'COG', continent: 'Africa', coordinates: { latitude: -1, longitude: 15 } },
    { name: 'Gabon', code: 'GAB', continent: 'Africa', coordinates: { latitude: -1, longitude: 11.7 } },
    { name: 'Equatorial Guinea', code: 'GNQ', continent: 'Africa', coordinates: { latitude: 2, longitude: 10 } },
    { name: 'Burundi', code: 'BDI', continent: 'Africa', coordinates: { latitude: -3.5, longitude: 30 } },
    { name: 'Malawi', code: 'MWI', continent: 'Africa', coordinates: { latitude: -13.5, longitude: 34 } },
    { name: 'Botswana', code: 'BWA', continent: 'Africa', coordinates: { latitude: -22, longitude: 24 } },
    { name: 'Namibia', code: 'NAM', continent: 'Africa', coordinates: { latitude: -22, longitude: 17 } },
    { name: 'Lesotho', code: 'LSO', continent: 'Africa', coordinates: { latitude: -29.5, longitude: 28.5 } },
    { name: 'Eswatini', code: 'SWZ', continent: 'Africa', coordinates: { latitude: -26.5, longitude: 31.5 } },
    { name: 'Madagascar', code: 'MDG', continent: 'Africa', coordinates: { latitude: -20, longitude: 47 } },
    { name: 'Papua New Guinea', code: 'PNG', continent: 'Oceania', coordinates: { latitude: -6, longitude: 147 } },
    { name: 'Fiji', code: 'FJI', continent: 'Oceania', coordinates: { latitude: -18, longitude: 175 } },
    { name: 'Haiti', code: 'HTI', continent: 'North America', coordinates: { latitude: 19, longitude: -72.4 } },
    { name: 'Belize', code: 'BLZ', continent: 'North America', coordinates: { latitude: 17.2, longitude: -88.8 } },
    { name: 'Guyana', code: 'GUY', continent: 'South America', coordinates: { latitude: 5, longitude: -59 } },
    { name: 'Suriname', code: 'SUR', continent: 'South America', coordinates: { latitude: 4, longitude: -56 } },
    { name: 'Bahamas', code: 'BHS', continent: 'North America', coordinates: { latitude: 24.2, longitude: -76 } },
    { name: 'Barbados', code: 'BRB', continent: 'North America', coordinates: { latitude: 13.1, longitude: -59.5 } },
    { name: 'Trinidad and Tobago', code: 'TTO', continent: 'North America', coordinates: { latitude: 11, longitude: -61 } },
    { name: 'Cyprus', code: 'CYP', continent: 'Europe', coordinates: { latitude: 35, longitude: 33 } }
  ],
  5: [
    { name: 'Malta', code: 'MLT', continent: 'Europe', coordinates: { latitude: 35.9, longitude: 14.4 } },
    { name: 'Montenegro', code: 'MNE', continent: 'Europe', coordinates: { latitude: 42.5, longitude: 19.3 } },
    { name: 'Andorra', code: 'AND', continent: 'Europe', coordinates: { latitude: 42.5, longitude: 1.5 } },
    { name: 'Monaco', code: 'MCO', continent: 'Europe', coordinates: { latitude: 43.7, longitude: 7.4 } },
    { name: 'San Marino', code: 'SMR', continent: 'Europe', coordinates: { latitude: 43.9, longitude: 12.4 } },
    { name: 'Liechtenstein', code: 'LIE', continent: 'Europe', coordinates: { latitude: 47.1, longitude: 9.5 } },
    { name: 'Vatican City', code: 'VAT', continent: 'Europe', coordinates: { latitude: 41.9, longitude: 12.4 } },
    { name: 'Luxembourg', code: 'LUX', continent: 'Europe', coordinates: { latitude: 49.8, longitude: 6.1 } },
    { name: 'Cabo Verde', code: 'CPV', continent: 'Africa', coordinates: { latitude: 16, longitude: -24 } },
    { name: 'Sao Tome and Principe', code: 'STP', continent: 'Africa', coordinates: { latitude: 1, longitude: 7 } },
    { name: 'Comoros', code: 'COM', continent: 'Africa', coordinates: { latitude: -12.2, longitude: 44.2 } },
    { name: 'Seychelles', code: 'SYC', continent: 'Africa', coordinates: { latitude: -4.6, longitude: 55.4 } },
    { name: 'Mauritius', code: 'MUS', continent: 'Africa', coordinates: { latitude: -20.3, longitude: 57.5 } },
    { name: 'Antigua and Barbuda', code: 'ATG', continent: 'North America', coordinates: { latitude: 17.1, longitude: -61.8 } },
    { name: 'Saint Kitts and Nevis', code: 'KNA', continent: 'North America', coordinates: { latitude: 17.3, longitude: -62.7 } },
    { name: 'Dominica', code: 'DMA', continent: 'North America', coordinates: { latitude: 15.4, longitude: -61.3 } },
    { name: 'Saint Lucia', code: 'LCA', continent: 'North America', coordinates: { latitude: 13.9, longitude: -60.9 } },
    { name: 'Saint Vincent and the Grenadines', code: 'VCT', continent: 'North America', coordinates: { latitude: 13.2, longitude: -61.2 } },
    { name: 'Grenada', code: 'GRD', continent: 'North America', coordinates: { latitude: 12.1, longitude: -61.6 } },
    { name: 'Samoa', code: 'WSM', continent: 'Oceania', coordinates: { latitude: -13.7, longitude: -172.1 } },
    { name: 'Tonga', code: 'TON', continent: 'Oceania', coordinates: { latitude: -21.1, longitude: -175.2 } },
    { name: 'Tuvalu', code: 'TUV', continent: 'Oceania', coordinates: { latitude: -8.5, longitude: 179.2 } },
    { name: 'Kiribati', code: 'KIR', continent: 'Oceania', coordinates: { latitude: 1.4, longitude: 173 } },
    { name: 'Marshall Islands', code: 'MHL', continent: 'Oceania', coordinates: { latitude: 7.1, longitude: 171.3 } },
    { name: 'Micronesia', code: 'FSM', continent: 'Oceania', coordinates: { latitude: 6.9, longitude: 158.1 } },
    { name: 'Nauru', code: 'NRU', continent: 'Oceania', coordinates: { latitude: -0.5, longitude: 166.9 } },
    { name: 'Palau', code: 'PLW', continent: 'Oceania', coordinates: { latitude: 7.5, longitude: 134.6 } },
    { name: 'Solomon Islands', code: 'SLB', continent: 'Oceania', coordinates: { latitude: -9, longitude: 160 } },
    { name: 'Vanuatu', code: 'VUT', continent: 'Oceania', coordinates: { latitude: -16, longitude: 167 } },
    { name: 'Timor-Leste', code: 'TLS', continent: 'Asia', coordinates: { latitude: -8.8, longitude: 125.7 } },
    { name: 'Guinea-Bissau', code: 'GNB', continent: 'Africa', coordinates: { latitude: 12, longitude: -15 } },
    { name: 'Gambia', code: 'GMB', continent: 'Africa', coordinates: { latitude: 13.4, longitude: -15.3 } },
    { name: 'Palestine', code: 'PSE', continent: 'Asia', coordinates: { latitude: 31.9, longitude: 35.2 } },
    { name: 'Bhutan', code: 'BTN', continent: 'Asia', coordinates: { latitude: 27.5, longitude: 90.5 } },
    { name: 'Brunei', code: 'BRN', continent: 'Asia', coordinates: { latitude: 4.5, longitude: 114.4 } },
    { name: 'Maldives', code: 'MDV', continent: 'Asia', coordinates: { latitude: 3.2, longitude: 73 } },
    { name: 'Somalia', code: 'SOM', continent: 'Africa', coordinates: { latitude: 5.1, longitude: 46.1 } },
    { name: 'South Sudan', code: 'SSD', continent: 'Africa', coordinates: { latitude: 6.8, longitude: 31.3 } },
    { name: 'Djibouti', code: 'DJI', continent: 'Africa', coordinates: { latitude: 11.8, longitude: 42.5 } },
    { name: 'Eritrea', code: 'ERI', continent: 'Africa', coordinates: { latitude: 15, longitude: 39 } }
  ]
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