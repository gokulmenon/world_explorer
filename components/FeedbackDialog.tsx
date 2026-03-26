import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

interface FeedbackDialogProps {
  visible: boolean;
  isCorrect: boolean;
  earnedScore?: number;
  onNext: () => void;
  onDismiss: () => void;
}

export function FeedbackDialog({
  visible,
  isCorrect,
  earnedScore,
  onNext,
  onDismiss,
}: FeedbackDialogProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={isCorrect ? onNext : onDismiss}
    >
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={[styles.emoji]}>{isCorrect ? '🎉' : '❌'}</Text>
          <Text style={[styles.title, isCorrect ? styles.correctTitle : styles.incorrectTitle]}>
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </Text>
          <Text style={styles.message}>
            {isCorrect
              ? `Great job! +${earnedScore ?? 0} points`
              : "That's not the right country. Try again!"}
          </Text>
          <TouchableOpacity
            style={[styles.button, isCorrect ? styles.nextButton : styles.tryAgainButton]}
            onPress={isCorrect ? onNext : onDismiss}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>{isCorrect ? 'Next →' : 'Try Again'}</Text>
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
  dialog: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    width: '80%',
    maxWidth: 500,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  correctTitle: {
    color: '#10B981',
  },
  incorrectTitle: {
    color: '#EF4444',
  },
  message: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 28,
    fontWeight: '500',
  },
  button: {
    width: '100%',
    minHeight: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  nextButton: {
    backgroundColor: '#10B981',
  },
  tryAgainButton: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
});
