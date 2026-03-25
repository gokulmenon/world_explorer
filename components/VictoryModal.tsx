import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Trophy, Clock } from 'lucide-react-native';

interface VictoryModalProps {
  visible: boolean;
  score: number;
  totalTime: number;
  onPlayAgain: () => void;
}

export function VictoryModal({
  visible,
  score,
  totalTime,
  onPlayAgain,
}: VictoryModalProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.trophyContainer}>
            <Trophy size={80} color="#F59E0B" />
          </View>

          <Text style={styles.title}>Victory!</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statRow}>
              <Trophy size={32} color="#F59E0B" />
              <View>
                <Text style={styles.statLabel}>Final Score</Text>
                <Text style={styles.statValue}>{score}</Text>
              </View>
            </View>

            <View style={styles.statRow}>
              <Clock size={32} color="#3B82F6" />
              <View>
                <Text style={styles.statLabel}>Total Time</Text>
                <Text style={styles.statValue}>{formatTime(totalTime)}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.playAgainButton}
            onPress={onPlayAgain}
            activeOpacity={0.8}
          >
            <Text style={styles.playAgainText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 40,
    width: '85%',
    maxWidth: 600,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 20,
  },
  trophyContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 32,
  },
  statsContainer: {
    width: '100%',
    gap: 24,
    marginBottom: 40,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#F3F4F6',
    padding: 20,
    borderRadius: 12,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
  },
  playAgainButton: {
    backgroundColor: '#10B981',
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 12,
    minHeight: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  playAgainText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
});
