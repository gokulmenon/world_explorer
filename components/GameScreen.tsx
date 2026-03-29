import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Lightbulb, SkipForward } from 'lucide-react-native';
import { StatusBar } from './StatusBar';
import { WorldMap } from './WorldMap';
import { ConfirmationDialog } from './ConfirmationDialog';
import { FeedbackDialog } from './FeedbackDialog';
import { VictoryModal } from './VictoryModal';
import { Country, initializeGame } from '@/data/gameData';

interface GameScreenProps {
  onExit: () => void;
}

export function GameScreen({ onExit }: GameScreenProps) {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const [selectedCountries, setSelectedCountries] = useState<Country[][]>([]);
  const [targetCountry, setTargetCountry] = useState<Country | null>(null);
  const [score, setScore] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [gameStartTime, setGameStartTime] = useState(Date.now());
  const [questionTime, setQuestionTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [showingContinent, setShowingContinent] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [incorrectCountries, setIncorrectCountries] = useState<Country[]>([]);
  // Separate visible/content so the dialog doesn't flash "Incorrect" while fading out after a correct answer
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackContent, setFeedbackContent] = useState<{ isCorrect: boolean; earnedScore?: number }>({ isCorrect: false });

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    if (!isComplete && !showConfirmDialog) {
      const questionInterval = setInterval(() => {
        setQuestionTime(Math.floor((Date.now() - questionStartTime) / 1000));
      }, 1000);

      return () => clearInterval(questionInterval);
    }
  }, [questionStartTime, isComplete, showConfirmDialog]);

  useEffect(() => {
    if (!isComplete) {
      const totalInterval = setInterval(() => {
        setTotalTime(Math.floor((Date.now() - gameStartTime) / 1000));
      }, 1000);

      return () => clearInterval(totalInterval);
    }
  }, [gameStartTime, isComplete]);

  const initGame = () => {
    const countries = initializeGame();
    setSelectedCountries(countries);
    setTargetCountry(countries[0][0]);
    setCurrentLevel(1);
    setCurrentCountryIndex(0);
    setScore(0);
    setQuestionStartTime(Date.now());
    setGameStartTime(Date.now());
    setQuestionTime(0);
    setTotalTime(0);
    setHintUsed(false);
    setShowingContinent(null);
    setIsComplete(false);
    setSelectedCountry(null);
    setShowConfirmDialog(false);
    setIncorrectCountries([]);
    setFeedbackVisible(false);
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setShowConfirmDialog(true);
  };

  const handleConfirmYes = () => {
    if (!selectedCountry || !targetCountry) return;

    const isCorrect = selectedCountry.code === targetCountry.code;
    const tappedCountry = selectedCountry;

    setShowConfirmDialog(false);
    setSelectedCountry(null);

    if (isCorrect) {
      const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
      const baseScore = Math.max(1000 - timeTaken * 10, 100);
      const levelMultiplier = currentLevel;
      const hintPenalty = hintUsed ? 250 : 0;
      const earnedScore = Math.max(baseScore * levelMultiplier - hintPenalty, 50);

      setScore((prev) => prev + earnedScore);
      setFeedbackContent({ isCorrect: true, earnedScore });
      setFeedbackVisible(true);
    } else {
      setScore((prev) => Math.max(prev - 100, 0));
      setQuestionStartTime((prev) => prev - 20000);
      setIncorrectCountries((prev) => [...prev, tappedCountry]);
      setFeedbackContent({ isCorrect: false });
      setFeedbackVisible(true);
    }
  };

  const handleFeedbackNext = () => {
    setFeedbackVisible(false);
    advanceToNextCountry();
  };

  const handleFeedbackDismiss = () => {
    setFeedbackVisible(false);
  };

  const handleConfirmNo = () => {
    setShowConfirmDialog(false);
    setSelectedCountry(null);
  };

  const advanceToNextCountry = () => {
    const nextIndex = currentCountryIndex + 1;

    if (nextIndex >= 5) {
      if (currentLevel >= 10) {
        setIsComplete(true);
        return;
      }

      const nextLevel = currentLevel + 1;
      setCurrentLevel(nextLevel);
      setCurrentCountryIndex(0);
      setTargetCountry(selectedCountries[nextLevel - 1][0]);
    } else {
      setCurrentCountryIndex(nextIndex);
      setTargetCountry(selectedCountries[currentLevel - 1][nextIndex]);
    }

    setQuestionStartTime(Date.now());
    setQuestionTime(0);
    setHintUsed(false);
    setShowingContinent(null);
    setIncorrectCountries([]);
  };

  const handleHint = () => {
    if (!hintUsed && targetCountry) {
      setHintUsed(true);
      setShowingContinent(targetCountry.continent);
      setScore((prev) => Math.max(prev - 250, 0));
    }
  };

  const handleSkip = () => {
    advanceToNextCountry();
  };

  const handleRestart = () => {
    onExit();
  };

  const handlePlayAgain = () => {
    initGame();
  };

  if (selectedCountries.length === 0 || !targetCountry) {
    return null;
  }

  const currentLevelCountries = selectedCountries[currentLevel - 1];

  return (
    <View style={styles.container}>
      <StatusBar
        level={currentLevel}
        countryIndex={currentCountryIndex}
        totalCountries={5}
        questionTime={questionTime}
        totalTime={totalTime}
        score={score}
        onRestart={handleRestart}
      />

      <View style={styles.content}>
        <View style={styles.targetContainer}>
          <Text style={styles.findText}>Find:</Text>
          <Text style={styles.targetCountryName}>{targetCountry.name}</Text>
        </View>

        <WorldMap
          availableCountries={currentLevelCountries}
          selectedCountry={selectedCountry}
          incorrectCountries={incorrectCountries}
          highlightedContinent={showingContinent}
          onCountrySelect={handleCountrySelect}
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

      <ConfirmationDialog
        visible={showConfirmDialog}
        countryName={targetCountry?.name || ''}
        onYes={handleConfirmYes}
        onNo={handleConfirmNo}
      />

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
  targetCountryName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
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
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
