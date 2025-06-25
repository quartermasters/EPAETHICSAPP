import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useEthics } from '../context/EthicsContext';

const { width } = Dimensions.get('window');

// Sample quiz questions
const quizQuestions = [
  {
    id: '1',
    question: 'Which of the following is a core principle of federal ethics?',
    options: [
      'Avoiding conflicts of interest',
      'Maximizing personal gain',
      'Ignoring regulations',
      'Acting in secret'
    ],
    correctAnswer: 0,
    explanation: 'Avoiding conflicts of interest is a fundamental principle of federal ethics to ensure public trust.',
    category: 'Ethics Basics'
  },
  {
    id: '2',
    question: 'What should you do if you are unsure about an ethical situation?',
    options: [
      'Ignore it and proceed',
      'Consult with an ethics official',
      'Ask your friends',
      'Make your best guess'
    ],
    correctAnswer: 1,
    explanation: 'When in doubt, always consult with an ethics official to ensure compliance with federal regulations.',
    category: 'General Ethics'
  },
  {
    id: '3',
    question: 'Federal employees are generally prohibited from accepting gifts from:',
    options: [
      'Family members',
      'Prohibited sources',
      'Coworkers',
      'None of the above'
    ],
    correctAnswer: 1,
    explanation: 'Federal employees cannot accept gifts from prohibited sources to avoid potential conflicts of interest.',
    category: 'Gifts and Gratuities'
  },
  {
    id: '4',
    question: 'Which activity requires disclosure under financial disclosure requirements?',
    options: [
      'Grocery shopping',
      'Watching movies',
      'Outside employment',
      'Reading books'
    ],
    correctAnswer: 2,
    explanation: 'Outside employment must be disclosed as it could potentially create conflicts of interest.',
    category: 'Financial Disclosure'
  },
  {
    id: '5',
    question: 'Post-employment restrictions apply to:',
    options: [
      'All former federal employees',
      'Only senior officials',
      'No one',
      'Only elected officials'
    ],
    correctAnswer: 0,
    explanation: 'Post-employment restrictions apply to all former federal employees, though the specific restrictions may vary.',
    category: 'Post-Employment'
  }
];

export default function QuizScreen() {
  const { dispatch } = useEthics();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));

  const totalQuestions = quizQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  useEffect(() => {
    // Animate question transitions
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [currentQuestion]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (selectedAnswers[currentQuestion] === undefined) {
      Alert.alert('Please select an answer', 'You must select an answer before proceeding.');
      return;
    }

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setQuizComplete(true);
        calculateResults();
      }
      
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setCurrentQuestion(currentQuestion - 1);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const calculateResults = () => {
    let correctAnswers = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === quizQuestions[index].correctAnswer) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Save quiz score
    dispatch({
      type: 'SAVE_QUIZ_SCORE',
      payload: {
        moduleId: 'general-ethics-quiz',
        score: score,
      },
    });

    setShowResults(true);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizComplete(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return 'Excellent! You have a strong understanding of federal ethics.';
    if (score >= 60) return 'Good job! Consider reviewing the areas where you missed questions.';
    return 'You may want to review the ethics training modules before retaking the quiz.';
  };

  if (showResults) {
    const correctAnswers = selectedAnswers.filter((answer, index) => 
      answer === quizQuestions[index].correctAnswer
    ).length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.resultsContainer}>
        <LinearGradient
          colors={['#1B365D', '#A51C30']}
          style={styles.resultsHeader}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name="trophy" size={64} color="white" />
          <Text style={styles.resultsTitle}>Quiz Complete!</Text>
          <Text style={styles.resultsScore}>{score}%</Text>
          <Text style={styles.resultsText}>
            {correctAnswers} out of {totalQuestions} correct
          </Text>
        </LinearGradient>

        <View style={styles.resultsCard}>
          <Text style={[styles.scoreMessage, { color: getScoreColor(score) }]}>
            {getScoreMessage(score)}
          </Text>

          <View style={styles.resultsBreakdown}>
            <Text style={styles.breakdownTitle}>Question Breakdown</Text>
            {quizQuestions.map((question, index) => {
              const isCorrect = selectedAnswers[index] === question.correctAnswer;
              return (
                <View key={question.id} style={styles.questionResult}>
                  <View style={styles.questionResultHeader}>
                    <Text style={styles.questionNumber}>Q{index + 1}</Text>
                    <Ionicons
                      name={isCorrect ? 'checkmark-circle' : 'close-circle'}
                      size={20}
                      color={isCorrect ? '#10B981' : '#EF4444'}
                    />
                  </View>
                  <Text style={styles.questionText} numberOfLines={2}>
                    {question.question}
                  </Text>
                  {!isCorrect && (
                    <Text style={styles.explanationText}>
                      {question.explanation}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>

          <View style={styles.resultsActions}>
            <TouchableOpacity style={styles.retakeButton} onPress={restartQuiz}>
              <Text style={styles.retakeButtonText}>Retake Quiz</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.continueButton}>
              <LinearGradient
                colors={['#1B365D', '#A51C30']}
                style={styles.continueButtonGradient}
              >
                <Text style={styles.continueButtonText}>Continue Learning</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  if (!quizComplete) {
    const question = quizQuestions[currentQuestion];

    return (
      <View style={styles.container}>
        {/* Progress Header */}
        <View style={styles.progressHeader}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>
              Question {currentQuestion + 1} of {totalQuestions}
            </Text>
            <Text style={styles.progressPercentage}>{Math.round(progress)}%</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <LinearGradient
              colors={['#1B365D', '#A51C30']}
              style={[styles.progressBar, { width: `${progress}%` }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </View>
        </View>

        {/* Question Content */}
        <ScrollView style={styles.questionContainer} showsVerticalScrollIndicator={false}>
          <Animated.View style={[styles.questionCard, { opacity: fadeAnim }]}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{question.category}</Text>
            </View>
            
            <Text style={styles.questionText}>{question.question}</Text>
            
            <View style={styles.optionsContainer}>
              {question.options.map((option, index) => {
                const isSelected = selectedAnswers[currentQuestion] === index;
                
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      isSelected && styles.optionButtonSelected,
                    ]}
                    onPress={() => handleAnswerSelect(index)}
                    accessibilityLabel={`Option ${index + 1}: ${option}`}
                    accessibilityRole="button"
                  >
                    <View style={[
                      styles.optionCircle,
                      isSelected && styles.optionCircleSelected,
                    ]}>
                      {isSelected && (
                        <View style={styles.optionCircleInner} />
                      )}
                    </View>
                    <Text style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected,
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Animated.View>
        </ScrollView>

        {/* Navigation Footer */}
        <View style={styles.navigationFooter}>
          <TouchableOpacity
            style={[styles.navButton, currentQuestion === 0 && styles.navButtonDisabled]}
            onPress={handlePrevious}
            disabled={currentQuestion === 0}
            accessibilityLabel="Previous question"
          >
            <Ionicons 
              name="chevron-back" 
              size={20} 
              color={currentQuestion === 0 ? '#CBD5E1' : '#64748B'} 
            />
            <Text style={[styles.navButtonText, currentQuestion === 0 && styles.navButtonTextDisabled]}>
              Previous
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.nextButton,
              selectedAnswers[currentQuestion] === undefined && styles.nextButtonDisabled,
            ]}
            onPress={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            accessibilityLabel={currentQuestion === totalQuestions - 1 ? "Complete quiz" : "Next question"}
          >
            <LinearGradient
              colors={
                selectedAnswers[currentQuestion] === undefined 
                  ? ['#CBD5E1', '#94A3B8'] 
                  : ['#1B365D', '#A51C30']
              }
              style={styles.nextButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.nextButtonText}>
                {currentQuestion === totalQuestions - 1 ? 'Finish' : 'Next'}
              </Text>
              <Ionicons 
                name={currentQuestion === totalQuestions - 1 ? 'checkmark' : 'chevron-forward'} 
                size={20} 
                color="white" 
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  progressHeader: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  progressPercentage: {
    fontSize: 16,
    color: '#1B365D',
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  questionContainer: {
    flex: 1,
    padding: 20,
  },
  questionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    lineHeight: 28,
    marginBottom: 32,
  },
  optionsContainer: {
    gap: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    backgroundColor: '#FAFAFA',
  },
  optionButtonSelected: {
    borderColor: '#A51C30',
    backgroundColor: '#FEF2F2',
  },
  optionCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionCircleSelected: {
    borderColor: '#A51C30',
  },
  optionCircleInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#A51C30',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    lineHeight: 22,
  },
  optionTextSelected: {
    color: '#1E293B',
    fontWeight: '500',
  },
  navigationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 16,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  navButtonTextDisabled: {
    color: '#CBD5E1',
  },
  nextButton: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  nextButtonDisabled: {
    opacity: 0.6,
  },
  nextButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  nextButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  resultsContainer: {
    padding: 20,
  },
  resultsHeader: {
    alignItems: 'center',
    padding: 40,
    borderRadius: 16,
    marginBottom: 20,
  },
  resultsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
    marginBottom: 8,
  },
  resultsScore: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  resultsText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  resultsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  scoreMessage: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  resultsBreakdown: {
    marginBottom: 32,
  },
  breakdownTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  questionResult: {
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    marginBottom: 12,
  },
  questionResultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#64748B',
  },
  explanationText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 8,
    fontStyle: 'italic',
  },
  resultsActions: {
    gap: 12,
  },
  retakeButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#1B365D',
    backgroundColor: 'white',
  },
  retakeButtonText: {
    fontSize: 16,
    color: '#1B365D',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  continueButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  continueButtonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  continueButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});