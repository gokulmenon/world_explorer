import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { Country } from '@/data/gameData';
import * as topojson from 'topojson-client';
import Svg, { Path, Circle } from 'react-native-svg';
import { geoMercator, geoPath } from 'd3-geo';
import type { Feature, FeatureCollection } from 'geojson';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  clamp,
} from 'react-native-reanimated';

interface WorldMapProps {
  availableCountries: Country[];
  selectedCountry: Country | null;
  incorrectCountries: Country[];
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

const MIN_SCALE = 1;
const MAX_SCALE = 6;

export function WorldMap({
  availableCountries,
  selectedCountry,
  incorrectCountries,
  highlightedContinent,
  onCountrySelect,
}: WorldMapProps) {
  const [geojsonData, setGeojsonData] = useState<FeatureCollection | null>(null);
  const { width: screenWidth } = useWindowDimensions();

  // Zoom / pan shared values
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(res => res.json())
      .then(data => {
        const collection = topojson.feature(data, data.objects.countries) as unknown as FeatureCollection;
        if (collection && collection.features) {
          const features = collection.features.map((feature: any) => ({
            ...feature,
            id: String(feature.id),
            properties: { ...feature.properties, id: String(feature.id) }
          }));
          setGeojsonData({ ...collection, features });
        }
      })
      .catch(err => console.error('Failed to load map data:', err));
  }, []);

  const mapWidth = Math.min(screenWidth - 16, 1200);
  const mapHeight = mapWidth * (500 / 960);

  // Clamp translation so the map cannot be panned completely off-screen
  const maxTranslateX = mapWidth * (MAX_SCALE - 1) / 2;
  const maxTranslateY = mapHeight * (MAX_SCALE - 1) / 2;

  // ── Pinch gesture ────────────────────────────────────────────────────────
  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      savedScale.value = scale.value;
    })
    .onUpdate((e: { scale: number }) => {
      scale.value = clamp(savedScale.value * e.scale, MIN_SCALE, MAX_SCALE);
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      // Snap back to 1 if scale went below threshold
      if (scale.value < 1.05) {
        scale.value = withSpring(1);
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        savedScale.value = 1;
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
      }
    });

  // ── Pan gesture (only moves the map when zoomed in) ──────────────────────
  const panGesture = Gesture.Pan()
    .minDistance(4)
    .onStart(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    })
    .onUpdate((e: { translationX: number; translationY: number }) => {
      if (scale.value <= 1.05) return;
      translateX.value = clamp(
        savedTranslateX.value + e.translationX,
        -maxTranslateX,
        maxTranslateX,
      );
      translateY.value = clamp(
        savedTranslateY.value + e.translationY,
        -maxTranslateY,
        maxTranslateY,
      );
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  // ── Double-tap to reset zoom ──────────────────────────────────────────────
  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      scale.value = withSpring(1);
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      savedScale.value = 1;
      savedTranslateX.value = 0;
      savedTranslateY.value = 0;
    });

  const composed = Gesture.Simultaneous(pinchGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  // ── Map projection ────────────────────────────────────────────────────────
  const habitableWorld = {
    type: 'Feature' as const,
    geometry: {
      type: 'Polygon' as const,
      coordinates: [[
        [-179.9, -56], [179.9, -56], [179.9, 72],
        [-179.9, 72], [-179.9, -56],
      ]],
    },
    properties: {},
  };
  const projection = geoMercator().fitSize([960, 500], habitableWorld as Feature);
  const pathGenerator = geoPath().projection(projection);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const availableCountryCodes = new Set(
    availableCountries.map(c => countryCodeMap[c.code]).filter(Boolean)
  );

  const getCountryByGeoId = (geoId: string): Country | null =>
    availableCountries.find(c => countryCodeMap[c.code] === geoId) || null;

  const getFillColor = (country: Country | null): string => {
    if (!country) return '#E5E7EB';
    if (selectedCountry?.code === country.code) return '#3B82F6';
    if (incorrectCountries.some(c => c.code === country.code)) return '#EF4444';
    if (highlightedContinent === country.continent) return '#FBBF24';
    return '#34D399';
  };

  const handlePress = (geoId: string) => {
    const country = getCountryByGeoId(geoId);
    if (country && availableCountryCodes.has(geoId)) {
      onCountrySelect(country);
    }
  };

  // Small countries that need a circle hit-target
  const smallCountryMarkers = availableCountries
    .filter(c => c.isSmall && countryCodeMap[c.code])
    .map(c => {
      const geoId = countryCodeMap[c.code];
      const feature = geojsonData?.features.find(
        (f: Feature) => (f.properties?.id ?? String(f.id)) === geoId
      );
      if (!feature) return null;
      const centroid = pathGenerator.centroid(feature as Feature);
      if (!centroid || isNaN(centroid[0]) || isNaN(centroid[1])) return null;
      return { country: c, geoId, cx: centroid[0], cy: centroid[1] };
    })
    .filter(Boolean) as { country: Country; geoId: string; cx: number; cy: number }[];

  return (
    <View style={styles.container}>
      <View style={styles.mapWrapper}>
        <GestureDetector gesture={Gesture.Race(doubleTapGesture, composed)}>
          <Animated.View style={[{ width: mapWidth, height: mapHeight }, animatedStyle]}>
            <View style={[styles.mapContainer, { width: mapWidth, height: mapHeight }]}>
              <Svg width={mapWidth} height={mapHeight} viewBox="0 0 960 500">
                {/* Country path fills */}
                {geojsonData && geojsonData.features.map((feature: Feature) => {
                  const geoId = String(feature.properties?.id ?? feature.id);
                  const country = getCountryByGeoId(geoId);
                  const fillColor = getFillColor(country);
                  const d = pathGenerator(feature);
                  if (!d) return null;
                  return (
                    <Path
                      key={geoId}
                      d={d}
                      fill={fillColor}
                      stroke="#FFFFFF"
                      strokeWidth={0.5}
                      onPress={() => handlePress(geoId)}
                    />
                  );
                })}

                {/* Circle hit-targets for small / hard-to-tap countries */}
                {geojsonData && smallCountryMarkers.map(({ country, geoId, cx, cy }) => (
                  <Circle
                    key={`marker-${country.code}`}
                    cx={cx}
                    cy={cy}
                    r={10}
                    fill={getFillColor(country)}
                    stroke="#FFFFFF"
                    strokeWidth={1.5}
                    onPress={() => handlePress(geoId)}
                  />
                ))}
              </Svg>
            </View>
          </Animated.View>
        </GestureDetector>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  mapContainer: {
    backgroundColor: '#7DD3FC',
    borderRadius: 12,
    overflow: 'hidden',
  },
});
