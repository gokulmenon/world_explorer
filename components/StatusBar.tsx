import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Clock, Star, RotateCcw } from 'lucide-react-native';

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
        <Text style={styles.appName}>🌍 World Explorer</Text>
        <View style={styles.levelRow}>
          <Text style={styles.levelText}>Level {level}</Text>
          <View style={styles.questionTimerInline}>
            <Clock size={16} color="#6B7280" />
            <Text style={styles.questionTimerText}>{formatTime(questionTime)}</Text>
          </View>
        </View>
        <Text style={styles.progressText}>
          Country {countryIndex + 1} of {totalCountries}
        </Text>
      </View>

      <View style={styles.centerSection}>
        <Star size={20} color="#F59E0B" />
        <Text style={styles.scoreText}>{score}</Text>
      </View>

      <View style={styles.rightSection}>
        <View style={styles.totalTimerContainer}>
          <Text style={styles.totalLabel}>Total Time</Text>
          <Text style={styles.totalTimerText}>{formatTime(totalTime)}</Text>
        </View>
        <TouchableOpacity style={styles.restartButton} onPress={onRestart}>
          <RotateCcw size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 2,
    borderBottomColor: '#E5E7EB',
    minHeight: 72,
  },
  leftSection: {
    flex: 1,
  },
  appName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#3B82F6',
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  levelText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  questionTimerInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  questionTimerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  progressText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  centerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F59E0B',
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
  },
  totalTimerContainer: {
    alignItems: 'flex-end',
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  totalTimerText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4B5563',
  },
  restartButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 10,
    minHeight: 44,
    minWidth: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
