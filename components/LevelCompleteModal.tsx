import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

interface LevelCompleteModalProps {
  visible: boolean;
  level: number;
  totalLevels: number;
  score: number;
  onNextLevel: () => void;
}

export function LevelCompleteModal({
  visible,
  level,
  totalLevels,
  score,
  onNextLevel,
}: LevelCompleteModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.emoji}>🎉</Text>
          <Text style={styles.title}>Level {level} Complete!</Text>
          <Text style={styles.subtitle}>
            {level} of {totalLevels} levels done — keep going!
          </Text>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>Score</Text>
            <Text style={styles.scoreValue}>{score}</Text>
          </View>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={onNextLevel}
            activeOpacity={0.8}
          >
            <Text style={styles.nextButtonText}>Next Level →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 36,
    width: '85%',
    maxWidth: 520,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 16,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 17,
    color: '#6B7280',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 24,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 12,
    marginBottom: 28,
  },
  scoreLabel: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '600',
  },
  scoreValue: {
    fontSize: 30,
    color: '#1F2937',
    fontWeight: '800',
  },
  nextButton: {
    backgroundColor: '#3B82F6',
    width: '100%',
    minHeight: 60,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
});
