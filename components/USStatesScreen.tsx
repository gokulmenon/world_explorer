import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Lightbulb, SkipForward } from 'lucide-react-native';
import { StatusBar } from './StatusBar';
import { USMap } from './USMap';
import { FeedbackDialog } from './FeedbackDialog';
import { VictoryModal } from './VictoryModal';
import { USState, selectRandomStates } from '@/data/usStates';

interface USStatesScreenProps {
  onExit: () => void;
}

const ROUNDS = 10;

export function USStatesScreen({ onExit }: USStatesScreenProps) {
  const [states, setStates] = useState<USState[]>([]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [gameStartTime, setGameStartTime] = useState(Date.now());
  const [questionTime, setQuestionTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [showingRegion, setShowingRegion] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedState, setSelectedState] = useState<USState | null>(null);
  const [incorrectStates, setIncorrectStates] = useState<USState[]>([]);
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
    setStates(selectRandomStates(ROUNDS));
    setRoundIndex(0);
    setScore(0);
    setQuestionStartTime(Date.now());
    setGameStartTime(Date.now());
    setQuestionTime(0);
    setTotalTime(0);
    setHintUsed(false);
    setShowingRegion(null);
    setIsComplete(false);
    setSelectedState(null);
    setIncorrectStates([]);
    setFeedbackVisible(false);
  };

  const handleStateSelect = (state: USState) => {
    if (feedbackVisible || isComplete) return;
    const target = states[roundIndex];
    if (!target) return;

    const isCorrect = state.fips === target.fips;
    setSelectedState(state);

    if (isCorrect) {
      const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
      const baseScore = Math.max(1000 - timeTaken * 10, 100);
      const hintPenalty = hintUsed ? 250 : 0;
      const earnedScore = Math.max(baseScore - hintPenalty, 50);
      setScore((prev) => prev + earnedScore);
      setFeedbackContent({ isCorrect: true, earnedScore });
    } else {
      setScore((prev) => Math.max(prev - 100, 0));
      setIncorrectStates((prev) => [...prev, state]);
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
    setQuestionStartTime(Date.now());
    setQuestionTime(0);
    setHintUsed(false);
    setShowingRegion(null);
    setSelectedState(null);
    setIncorrectStates([]);
  };

  const handleFeedbackDismiss = () => {
    setFeedbackVisible(false);
  };

  const handleHint = () => {
    const target = states[roundIndex];
    if (!hintUsed && target) {
      setHintUsed(true);
      setShowingRegion(target.region);
      setScore((prev) => Math.max(prev - 250, 0));
    }
  };

  const handleSkip = () => {
    handleFeedbackNext();
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
          <Text style={styles.findText}>Find:</Text>
          <Text style={styles.targetStateName}>{target?.name}</Text>
        </View>

        <USMap
          selectedState={selectedState}
          incorrectStates={incorrectStates}
          highlightedRegion={showingRegion}
          onStateSelect={handleStateSelect}
        />

        <View style={styles.actionBar}>
          <TouchableOpacity
            style={[styles.actionButton, styles.hintButton, hintUsed && styles.hintButtonDisabled]}
            onPress={handleHint}
            disabled={hintUsed}
            activeOpacity={0.8}
          >
            <Lightbulb size={22} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>
              {hintUsed ? 'Hint Used' : 'Hint (-250 pts)'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.skipButton]}
            onPress={handleSkip}
            activeOpacity={0.8}
          >
            <SkipForward size={22} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Skip</Text>
          </TouchableOpacity>
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
  },
  targetContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
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
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#E0F2FE',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    minHeight: 52,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  hintButton: {
    backgroundColor: '#8B5CF6',
  },
  hintButtonDisabled: {
    backgroundColor: '#9CA3AF',
    opacity: 0.6,
  },
  skipButton: {
    backgroundColor: '#F59E0B',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
