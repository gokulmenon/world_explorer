import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { Lightbulb } from 'lucide-react-native';
import { StatusBar } from './StatusBar';
import { WorldMap } from './WorldMap';
import { ConfirmationDialog } from './ConfirmationDialog';
import { VictoryModal } from './VictoryModal';
import { Country, initializeGame } from '@/data/gameData';

export function GameScreen() {
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
      const hintPenalty = hintUsed ? 50 : 0;
      const earnedScore = Math.max(baseScore * levelMultiplier - hintPenalty, 50);

      setScore((prev) => prev + earnedScore);
      Alert.alert('Correct!', 'Great job.', [{ text: 'Next', onPress: advanceToNextCountry }]);
    } else {
      setScore((prev) => Math.max(prev - 100, 0));
      setQuestionStartTime((prev) => prev - 20000);
      setIncorrectCountries((prev) => [...prev, tappedCountry]);
      Alert.alert('Incorrect', "That's not the right country. Try again!");
    }
  };

  const handleConfirmNo = () => {
    setShowConfirmDialog(false);
    setSelectedCountry(null);
  };

  const advanceToNextCountry = () => {
    const nextIndex = currentCountryIndex + 1;

    if (nextIndex >= 5) {
      if (currentLevel >= 5) {
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
      setScore((prev) => Math.max(prev - 50, 0));
    }
  };

  const handleRestart = () => {
    initGame();
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

        <TouchableOpacity
          style={[styles.hintButton, hintUsed && styles.hintButtonDisabled]}
          onPress={handleHint}
          disabled={hintUsed}
          activeOpacity={0.8}
        >
          <Lightbulb size={24} color="#FFFFFF" />
          <Text style={styles.hintText}>
            {hintUsed ? 'Hint Used' : 'Hint (-50 pts)'}
          </Text>
        </TouchableOpacity>
      </View>

      <ConfirmationDialog
        visible={showConfirmDialog}
        countryName={targetCountry?.name || ''}
        onYes={handleConfirmYes}
        onNo={handleConfirmNo}
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
    position: 'absolute',
    bottom: 40,
    right: 40,
    backgroundColor: '#8B5CF6',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    minHeight: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  hintButtonDisabled: {
    backgroundColor: '#9CA3AF',
    opacity: 0.6,
  },
  hintText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
