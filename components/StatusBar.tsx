import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Clock, Timer, Star, RotateCcw } from 'lucide-react-native';

interface StatusBarProps {
  level: number;
  countryIndex: number;
  totalCountries: number;
  questionTime: number;
  totalTime: number;
  score: number;
  onRestart: () => void;
}

export function StatusBar({
  level,
  countryIndex,
  totalCountries,
  questionTime,
  totalTime,
  score,
  onRestart,
}: StatusBarProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.levelText}>Level {level}</Text>
        <Text style={styles.progressText}>
          Country {countryIndex + 1} of {totalCountries}
        </Text>
      </View>

      <View style={styles.centerSection}>
        <View style={styles.timerContainer}>
          <Clock size={20} color="#4B5563" />
          <Text style={styles.timerText}>{formatTime(questionTime)}</Text>
        </View>

        <View style={styles.timerContainer}>
          <Timer size={20} color="#4B5563" />
          <Text style={styles.timerText}>{formatTime(totalTime)}</Text>
        </View>

        <View style={styles.scoreContainer}>
          <Star size={20} color="#F59E0B" />
          <Text style={styles.scoreText}>{score}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.restartButton} onPress={onRestart}>
        <RotateCcw size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 2,
    borderBottomColor: '#E5E7EB',
    minHeight: 80,
  },
  leftSection: {
    flex: 1,
  },
  levelText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  centerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    flex: 2,
    justifyContent: 'center',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F59E0B',
  },
  restartButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 12,
    minHeight: 48,
    minWidth: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
