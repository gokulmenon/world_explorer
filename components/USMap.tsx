import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { USState, usStates } from '@/data/usStates';
import * as topojson from 'topojson-client';
import Svg, { Path, Circle } from 'react-native-svg';
import { geoAlbersUsa, geoPath } from 'd3-geo';
import type { Feature, FeatureCollection } from 'geojson';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  clamp,
} from 'react-native-reanimated';

interface USMapProps {
  selectedState: USState | null;
  incorrectStates: USState[];
  highlightedRegion: string | null;
  onStateSelect: (state: USState) => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 6;

export function USMap({
  selectedState,
  incorrectStates,
  highlightedRegion,
  onStateSelect,
}: USMapProps) {
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
    fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json')
      .then(res => res.json())
      .then(data => {
        const collection = topojson.feature(data, data.objects.states) as unknown as FeatureCollection;
        if (collection && collection.features) {
          const features = collection.features.map((feature: any) => ({
            ...feature,
            id: String(feature.id).padStart(2, '0'),
            properties: { ...feature.properties, id: String(feature.id).padStart(2, '0') }
          }));
          setGeojsonData({ ...collection, features });
        }
      })
      .catch(err => console.error('Failed to load US map data:', err));
  }, []);

  const mapWidth = Math.min(screenWidth - 16, 900);
  const mapHeight = mapWidth * (600 / 960);

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

  // ── Double-tap to reset zoom ─────────────────────────────────────────────
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

  // ── Map projection (fit to the loaded states geometry) ───────────────────
  const emptyCollection: FeatureCollection = { type: 'FeatureCollection', features: [] };
  const projection = geoAlbersUsa().fitSize([960, 600], geojsonData ?? emptyCollection);
  const pathGenerator = geoPath().projection(projection);

  // ── Helpers ──────────────────────────────────────────────────────────────
  const getStateByFips = (fips: string): USState | null =>
    usStates.find(s => s.fips === fips) || null;

  const getFillColor = (state: USState | null): string => {
    if (!state) return '#E5E7EB';
    if (selectedState?.fips === state.fips) return '#3B82F6';
    if (incorrectStates.some(s => s.fips === state.fips)) return '#EF4444';
    if (highlightedRegion === state.region) return '#FBBF24';
    return '#34D399';
  };

  const handlePress = (fips: string) => {
    const state = getStateByFips(fips);
    if (state) {
      onStateSelect(state);
    }
  };

  // Circle hit-targets for small states (New England etc.)
  const smallStateMarkers = usStates
    .filter(s => s.isSmall)
    .map(s => {
      const feature = geojsonData?.features.find(
        (f: Feature) => (f.properties?.id ?? String(f.id)) === s.fips
      );
      if (!feature) return null;
      const centroid = pathGenerator.centroid(feature as Feature);
      if (!centroid || isNaN(centroid[0]) || isNaN(centroid[1])) return null;
      return { state: s, cx: centroid[0], cy: centroid[1] };
    })
    .filter(Boolean) as { state: USState; cx: number; cy: number }[];

  return (
    <View style={styles.container}>
      <View style={styles.mapWrapper}>
        <GestureDetector gesture={Gesture.Race(doubleTapGesture, composed)}>
          <Animated.View style={[{ width: mapWidth, height: mapHeight }, animatedStyle]}>
            <View style={[styles.mapContainer, { width: mapWidth, height: mapHeight }]}>
              <Svg width={mapWidth} height={mapHeight} viewBox="0 0 960 600">
                {geojsonData && geojsonData.features.map((feature: Feature) => {
                  const fips = String(feature.properties?.id ?? feature.id);
                  const state = getStateByFips(fips);
                  const fillColor = getFillColor(state);
                  const d = pathGenerator(feature);
                  if (!d) return null;
                  return (
                    <Path
                      key={fips}
                      d={d}
                      fill={fillColor}
                      stroke="#FFFFFF"
                      strokeWidth={0.5}
                      onPress={() => handlePress(fips)}
                    />
                  );
                })}

                {geojsonData && smallStateMarkers.map(({ state, cx, cy }) => (
                  <Circle
                    key={`marker-${state.fips}`}
                    cx={cx}
                    cy={cy}
                    r={10}
                    fill={getFillColor(state)}
                    stroke="#FFFFFF"
                    strokeWidth={1.5}
                    onPress={() => handlePress(state.fips)}
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
