import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { Country } from '@/data/gameData';
import * as topojson from 'topojson-client';
import Svg, { Path } from 'react-native-svg';

interface WorldMapProps {
  availableCountries: Country[];
  selectedCountry: Country | null;
  highlightedContinent: string | null;
  onCountrySelect: (country: Country) => void;
}

const countryCodeMap: Record<string, string> = {
  USA: '840', CAN: '124', MEX: '484', BRA: '076', ARG: '032',
  GBR: '826', FRA: '250', DEU: '276', ITA: '380', ESP: '724',
  RUS: '643', CHN: '156', JPN: '392', KOR: '410', IND: '356',
  AUS: '036', ZAF: '710', EGY: '818', SAU: '682', ARE: '784',
  TUR: '792', GRC: '300', THA: '764', VNM: '704', IDN: '360',
  SGP: '702', MYS: '458', PHL: '608', NLD: '528', CHE: '756',
  SWE: '752', NOR: '578', PRT: '620', NZL: '554', ISR: '376',
  COL: '170', CHL: '152', PER: '604', NGA: '566', BEL: '056',
  AUT: '040', POL: '616', CZE: '203', HUN: '348', ROU: '642',
  BGR: '100', HRV: '191', SRB: '688', UKR: '804', FIN: '246',
  DNK: '208', IRL: '372', VEN: '862', CUB: '192', JAM: '388',
  DOM: '214', MAR: '504', DZA: '012', KEN: '404', ETH: '231',
  GHA: '288', TZA: '834', PAK: '586', BGD: '050', LKA: '144',
  IRN: '364', IRQ: '368', JOR: '400', LBN: '422', SYR: '760',
  CRI: '188', PAN: '591', URY: '858', ECU: '218', BOL: '068',
  TWN: '158', SEN: '686', ISL: '352', SVN: '705', SVK: '703',
  BIH: '070', ALB: '008', MKD: '807', EST: '233', LVA: '428',
  LTU: '440', BLR: '112', MDA: '498', GEO: '268', ARM: '051',
  AZE: '031', KAZ: '398', UZB: '860', PRY: '600', GTM: '320',
  HND: '340', SLV: '222', NIC: '558', CIV: '384', CMR: '120',
  AGO: '024', MOZ: '508', ZWE: '716', ZMB: '894', UGA: '800',
  RWA: '646', TUN: '788', LBY: '434', SDN: '729', KWT: '414',
  OMN: '512', QAT: '634', BHR: '048', YEM: '887', NPL: '524',
  MMR: '104', KHM: '116', LAO: '418', MNG: '496', PRK: '408',
  AFG: '004', TJK: '762', KGZ: '417', TKM: '795', MLI: '466',
  BFA: '854', NER: '562', TCD: '148', MRT: '478', GIN: '324',
  SLE: '694', LBR: '430', TGO: '768', BEN: '204', CAF: '140',
  COD: '180', COG: '178', GAB: '266', GNQ: '226', BDI: '108',
  MWI: '454', BWA: '072', NAM: '516', LSO: '426', SWZ: '748',
  MDG: '450', PNG: '598', FJI: '242', HTI: '332', BLZ: '084',
  GUY: '328', SUR: '740', BHS: '044', BRB: '052', TTO: '780',
  CYP: '196', MLT: '470', MNE: '499', AND: '020', MCO: '492',
  SMR: '674', LIE: '438', VAT: '336', LUX: '442', CPV: '132',
  STP: '678', COM: '174', SYC: '690', MUS: '480', ATG: '028',
  KNA: '659', DMA: '212', LCA: '662', VCT: '670', GRD: '308',
  WSM: '882', TON: '776', TUV: '798', KIR: '296', MHL: '584',
  FSM: '583', NRU: '520', PLW: '585', SLB: '090', VUT: '548',
  TLS: '626', GNB: '624', GMB: '270', PSE: '275', BTN: '064',
  BRN: '096', MDV: '462', SOM: '706', SSD: '728', DJI: '262',
  ERI: '232'
};

interface GeoFeature {
  id: string;
  type: string;
  geometry: {
    type: string;
    coordinates: any[];
  };
  properties?: any;
}

export function WorldMap({
  availableCountries,
  selectedCountry,
  highlightedContinent,
  onCountrySelect,
}: WorldMapProps) {
  const [geographies, setGeographies] = useState<GeoFeature[]>([]);
  const { width: screenWidth } = useWindowDimensions();

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(res => res.json())
      .then(data => {
        // 1. Convert TopoJSON to standard GeoJSON
        const geojsonData = topojson.feature(data, data.objects.countries) as any;

        // 2. Safely format the features for rendering
        if (geojsonData && geojsonData.features) {
          const features = geojsonData.features.map((feature: any) => ({
            ...feature,
            // Grab the actual ISO numeric ID (e.g., "840" for USA) from the TopoJSON
            // and ensure it's a string so it perfectly matches your countryCodeMap
            id: String(feature.id),
            properties: { ...feature.properties, id: String(feature.id) }
          }));
          
          setGeographies(features);
        }
      })
      .catch(err => console.error('Failed to load map data:', err));
  }, []);

  const availableCountryCodes = new Set(
    availableCountries.map(c => countryCodeMap[c.code]).filter(Boolean)
  );

  const getCountryByGeoId = (geoId: string): Country | null => {
    return availableCountries.find(c => countryCodeMap[c.code] === geoId) || null;
  };

  const getFillColor = (country: Country | null): string => {
    if (!country) return '#E5E7EB';

    if (selectedCountry?.code === country.code) {
      return '#3B82F6';
    }

    if (highlightedContinent === country.continent) {
      return '#FBBF24';
    }

    return '#34D399';
  };

  const pathToSvg = (geometry: any): string => {
    const path: string[] = [];

    const project = (coords: [number, number]): [number, number] => {
      const [lon, lat] = coords;
      return [
        (lon + 180) / 360 * 960,
        (90 - lat) / 180 * 500,
      ];
    };

    const drawRing = (ring: any[]) => {
      ring.forEach((point, idx) => {
        const [x, y] = project(point);
        if (idx === 0) path.push(`M${x},${y}`);
        else path.push(`L${x},${y}`);
      });
      path.push('Z');
    };

    if (geometry.type === 'Polygon') {
      geometry.coordinates.forEach((ring: any[]) => drawRing(ring));
    } else if (geometry.type === 'MultiPolygon') {
      geometry.coordinates.forEach((polygon: any[]) => {
        polygon.forEach((ring: any[]) => drawRing(ring));
      });
    }

    return path.join(' ');
  };

  const handlePress = (geoId: string) => {
    const country = getCountryByGeoId(geoId);
    if (country && availableCountryCodes.has(geoId)) {
      onCountrySelect(country);
    }
  };

  const mapWidth = Math.min(screenWidth - 40, 1000);
  const mapHeight = mapWidth * (500 / 960);

  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>Tap a country to select it</Text>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.mapWrapper}>
          <View style={[styles.mapContainer, { width: mapWidth, height: mapHeight }]}>
            <Svg
              width={mapWidth}
              height={mapHeight}
              viewBox="0 0 960 500"
            >
              {geographies.map((geo) => {
                const geoId = geo.properties?.id || geo.id;
                const country = getCountryByGeoId(geoId);
                const fillColor = getFillColor(country);

                return (
                  <Path
                    key={geoId}
                    d={pathToSvg(geo.geometry)}
                    fill={fillColor}
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                    onPress={() => handlePress(geoId)}
                  />
                );
              })}
            </Svg>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2FE',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  instructionText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin: 20,
    marginBottom: 8,
  },
  mapWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  mapContainer: {
    backgroundColor: '#7DD3FC',
    borderRadius: 12,
    overflow: 'hidden',
  },
});
