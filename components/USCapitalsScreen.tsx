import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { StatusBar } from './StatusBar';
import { FeedbackDialog } from './FeedbackDialog';
import { VictoryModal } from './VictoryModal';
import { USState, selectRandomStates } from '@/data/usStates';
import {
  usStateCapitals,
  allCapitals,
  shuffleArray,
} from '@/data/usStateCapitals';

interface USCapitalsScreenProps {
  onExit: () => void;
}

const ROUNDS = 10;

function buildOptions(target: USState): string[] {
  const distractors = shuffleArray(
    allCapitals().filter((c) => c !== usStateCapitals[target.abbr])
  ).slice(0, 3);
  return shuffleArray([usStateCapitals[target.abbr], ...distractors]);
}

export function USCapitalsScreen({ onExit }: USCapitalsScreenProps) {
  const [states, setStates] = useState<USState[]>([]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [gameStartTime, setGameStartTime] = useState(Date.now());
  const [questionTime, setQuestionTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackContent, setFeedbackContent] = useState<{
    isCorrect: boolean;
    earnedScore?: number;
  }>({ isCorrect: false });

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    if (!isComplete && !feedbackVisible) {
      const questionInterval = setInterval(() => {
        setQuestionTime(Math.floor((Date.now() - questionStartTime) / 1000));
      }, 1000);
      return () => clearInterval(questionInterval);
    }
  }, [questionStartTime, isComplete, feedbackVisible]);

  useEffect(() => {
    if (!isComplete) {
      const totalInterval = setInterval(() => {
        setTotalTime(Math.floor((Date.now() - gameStartTime) / 1000));
      }, 1000);
      return () => clearInterval(totalInterval);
    }
  }, [gameStartTime, isComplete]);

  const initGame = () => {
    const picked = selectRandomStates(ROUNDS);
    setStates(picked);
    setRoundIndex(0);
    setOptions(buildOptions(picked[0]));
    setScore(0);
    setQuestionStartTime(Date.now());
    setGameStartTime(Date.now());
    setQuestionTime(0);
    setTotalTime(0);
    setIsComplete(false);
    setFeedbackVisible(false);
  };

  const handleCapitalPress = (capital: string) => {
    const target = states[roundIndex];
    if (!target) return;
    const isCorrect = capital === usStateCapitals[target.abbr];

    if (isCorrect) {
      const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
      const earnedScore = Math.max(1000 - timeTaken * 10, 100);
      setScore((prev) => prev + earnedScore);
      setFeedbackContent({ isCorrect: true, earnedScore });
    } else {
      setScore((prev) => prev - 100);
      setFeedbackContent({ isCorrect: false });
    }
    setFeedbackVisible(true);
  };

  const handleFeedbackNext = () => {
    setFeedbackVisible(false);
    const nextIndex = roundIndex + 1;
    if (nextIndex >= ROUNDS) {
      setIsComplete(true);
      return;
    }
    setRoundIndex(nextIndex);
    setOptions(buildOptions(states[nextIndex]));
    setQuestionStartTime(Date.now());
    setQuestionTime(0);
  };

  const handleFeedbackDismiss = () => {
    setFeedbackVisible(false);
  };

  const handlePlayAgain = () => {
    initGame();
  };

  if (states.length === 0) {
    return null;
  }

  const target = states[roundIndex];

  return (
    <View style={styles.container}>
      <StatusBar
        level={1}
        countryIndex={roundIndex}
        totalCountries={ROUNDS}
        questionTime={questionTime}
        totalTime={totalTime}
        score={score}
        onRestart={onExit}
      />

      <View style={styles.content}>
        <View style={styles.targetContainer}>
          <Text style={styles.findText}>What is the capital of</Text>
          <Text style={styles.targetStateName}>{target?.name}?</Text>
        </View>

        <View style={styles.list}>
          {options.map((capital) => (
            <TouchableOpacity
              key={capital}
              style={styles.capitalButton}
              onPress={() => handleCapitalPress(capital)}
              activeOpacity={0.8}
            >
              <Text style={styles.capitalText}>{capital}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FeedbackDialog
        visible={feedbackVisible}
        isCorrect={feedbackContent.isCorrect}
        earnedScore={feedbackContent.earnedScore}
        onNext={handleFeedbackNext}
        onDismiss={handleFeedbackDismiss}
      />

      <VictoryModal
        visible={isComplete}
        score={score}
        totalTime={totalTime}
        onPlayAgain={handlePlayAgain}
      />
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
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  targetContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  findText: {
    fontSize: 20,
    color: '#6B7280',
    fontWeight: '500',
  },
  targetStateName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
  },
  list: {
    gap: 14,
    maxWidth: 640,
    alignSelf: 'center',
    width: '100%',
  },
  capitalButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 88,
    paddingVertical: 20,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  capitalText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
  },
});
