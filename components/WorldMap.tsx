import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Country } from '@/data/gameData';

interface WorldMapProps {
  availableCountries: Country[];
  selectedCountry: Country | null;
  highlightedContinent: string | null;
  onCountrySelect: (country: Country) => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export function WorldMap({
  availableCountries,
  selectedCountry,
  highlightedContinent,
  onCountrySelect,
}: WorldMapProps) {
  const getCountryPosition = (country: Country) => {
    const mapWidth = screenWidth - 40;
    const mapHeight = screenHeight - 200;

    const x = ((country.coordinates.longitude + 180) / 360) * mapWidth;
    const y = ((90 - country.coordinates.latitude) / 180) * mapHeight;

    return { x, y };
  };

  const getButtonColor = (country: Country): string => {
    if (selectedCountry?.code === country.code) {
      return '#3B82F6';
    }
    if (highlightedContinent === country.continent) {
      return '#FBBF24';
    }
    return '#10B981';
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.mapContainer}>
          <View style={styles.mapBackground}>
            <Text style={styles.instructionText}>Tap a country to select it</Text>

            {availableCountries.map((country) => {
              const position = getCountryPosition(country);
              return (
                <TouchableOpacity
                  key={country.code}
                  style={[
                    styles.countryButton,
                    {
                      left: position.x - 60,
                      top: position.y - 25,
                      backgroundColor: getButtonColor(country),
                    },
                  ]}
                  onPress={() => onCountrySelect(country)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.countryText}>{country.name}</Text>
                </TouchableOpacity>
              );
            })}
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
  },
  mapContainer: {
    flex: 1,
    padding: 20,
  },
  mapBackground: {
    flex: 1,
    backgroundColor: '#7DD3FC',
    borderRadius: 12,
    position: 'relative',
    minHeight: screenHeight - 200,
  },
  instructionText: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  countryButton: {
    position: 'absolute',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    minHeight: 50,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  countryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
});
