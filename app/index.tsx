import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GameScreen } from '@/components/GameScreen';
import { Globe, Play } from 'lucide-react-native';

export default function Index() {
  const [gameStarted, setGameStarted] = useState(false);

  if (gameStarted) {
    return <GameScreen onExit={() => setGameStarted(false)} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Globe size={120} color="#3B82F6" strokeWidth={2} />
        </View>

        <Text style={styles.title}>Adit's World Explorer</Text>
        <Text style={styles.subtitle}>Master Geography Across 5 Levels</Text>

        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <Text style={styles.featureEmoji}>🌍</Text>
            <Text style={styles.featureText}>Explore countries worldwide</Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.featureEmoji}>⏱️</Text>
            <Text style={styles.featureText}>Race against the clock</Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.featureEmoji}>⭐</Text>
            <Text style={styles.featureText}>Earn points for speed</Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.featureEmoji}>💡</Text>
            <Text style={styles.featureText}>Use hints when needed</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => setGameStarted(true)}
          activeOpacity={0.8}
        >
          <Play size={28} color="#FFFFFF" fill="#FFFFFF" />
          <Text style={styles.startButtonText}>Start Adventure</Text>
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>How to Play:</Text>
          <Text style={styles.infoText}>
            1. Find the target country on the map{'\n'}
            2. Tap to select and confirm your choice{'\n'}
            3. Complete 5 countries per level{'\n'}
            4. Progress through 5 difficulty levels{'\n'}
            5. Use hints to highlight continents
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2FE',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 22,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 48,
    fontWeight: '500',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 48,
    maxWidth: 800,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 12,
    minWidth: 240,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureEmoji: {
    fontSize: 28,
  },
  featureText: {
    fontSize: 16,
    color: '#4B5563',
    fontWeight: '600',
  },
  startButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 20,
    paddingHorizontal: 48,
    borderRadius: 16,
    minHeight: 70,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 48,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    maxWidth: 600,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
});
