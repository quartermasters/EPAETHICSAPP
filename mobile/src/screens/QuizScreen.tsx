import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  AccessibilityInfo,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What is the general dollar limit for gifts that federal employees can accept from prohibited sources?',
    options: ['$10', '$20', '$50', '$100'],
    correctAnswer: 1,
    explanation: 'Federal employees generally cannot accept gifts worth $20 or more from prohibited sources, with an annual limit of $50 from the same source.',
    category: 'Gift Ethics',
  },
  {
    id: '2',
    question: 'Which of the following would create a financial conflict of interest requiring recusal?',
    options: [
      'Owning $500 worth of stock in a company affected by your decision',
      'Owning $15,000 worth of stock in a company affected by your decision',
      'Having a savings account at a bank affected by your decision',
      'Owning shares in a widely diversified mutual fund',
    ],
    correctAnswer: 1,
    explanation: 'The $15,000 threshold applies to individual holdings. You must recuse yourself from matters that could affect your financial interests above this threshold.',
    category: 'Financial Conflicts',
  },
  {
    id: '3',
    question: 'Can federal employees use government computers for personal email?',
    options: [
      'Yes, unlimited personal use is allowed',
      'Yes, but only during lunch breaks',
      'Limited personal use may be permitted',
      'No, absolutely no personal use is allowed',
    ],
    correctAnswer: 2,
    explanation: 'Limited personal use of government IT resources may be permitted, but policies vary by agency. Always check your agency\'s specific guidelines.',
    category: 'Use of Position',
  },
  {
    id: '4',
    question: 'How long do post-employment restrictions typically last for matters you worked on personally and substantially?',
    options: ['One year', 'Two years', 'Five years', 'Lifetime'],
    correctAnswer: 3,
    explanation: 'The "switching sides" restriction is permanent. You can never represent others on specific matters you worked on personally and substantially as a government employee.',
    category: 'Post-Employment',
  },
  {
    id: '5',
    question: 'Which outside activity typically requires advance approval?',
    options: [
      'Volunteering at a local charity',
      'Teaching a college course related to your expertise',
      'Attending a professional conference',
      'Reading professional journals',
    ],
    correctAnswer: 1,
    explanation: 'Teaching, especially about topics related to your official responsibilities, typically requires advance written approval from your ethics advisor.',
    category: 'Outside Activities',
  },
  {
    id: '6',
    question: 'What should you do if offered a gift that might violate ethics rules?',
    options: [
      'Accept it and report it later',
      'Accept it if it\'s from a friend',
      'Decline it or consult your ethics advisor first',
      'Accept it if no one will know',
    ],
    correctAnswer: 2,
    explanation: 'When in doubt about any gift, you should decline it or consult with your designated ethics advisor before accepting.',
    category: 'Gift Ethics',
  },
];

const QuizScreen: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;
  const correctAnswers = Object.entries(selectedAnswers).filter(
    ([questionId, answerIndex]) => {
      const question = quizQuestions.find(q => q.id === questionId);
      return question && question.correctAnswer === answerIndex;
    }
  ).length;

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    AccessibilityInfo.announceForAccessibility('Quiz started. Question 1 of ' + totalQuestions);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = { ...selectedAnswers, [currentQuestion.id]: answerIndex };
    setSelectedAnswers(newAnswers);
    AccessibilityInfo.announceForAccessibility(`Selected option ${answerIndex + 1}`);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      AccessibilityInfo.announceForAccessibility(`Question ${currentQuestionIndex + 2} of ${totalQuestions}`);
    } else {
      setShowResults(true);
      AccessibilityInfo.announceForAccessibility(`Quiz completed. You scored ${correctAnswers} out of ${totalQuestions}`);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      AccessibilityInfo.announceForAccessibility(`Question ${currentQuestionIndex} of ${totalQuestions}`);
    }
  };

  const handleRestartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    AccessibilityInfo.announceForAccessibility('Quiz reset. Ready to start again.');
  };

  const getScoreColor = () => {
    const percentage = (correctAnswers / totalQuestions) * 100;
    if (percentage >= 80) return '#28A745'; // Green
    if (percentage >= 60) return '#FFC107'; // Yellow
    return '#DC3545'; // Red
  };

  const getScoreMessage = () => {
    const percentage = (correctAnswers / totalQuestions) * 100;
    if (percentage >= 80) return 'Excellent! You have a strong understanding of federal ethics.';
    if (percentage >= 60) return 'Good job! Consider reviewing the areas you missed.';
    return 'You may want to review the ethics guide materials for better understanding.';
  };

  if (!quizStarted) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.introSection}>
            <Ionicons name="help-circle" size={64} color="#0066CC" />
            <Text style={styles.introTitle}>Test Your Knowledge</Text>
            <Text style={styles.introDescription}>
              Test your understanding of federal ethics rules and regulations. 
              This quiz covers key topics from the Ethics Guide.
            </Text>
            
            <View style={styles.quizInfo}>
              <View style={styles.infoItem}>
                <Ionicons name="document-text-outline" size={20} color="#666666" />
                <Text style={styles.infoText}>{totalQuestions} Questions</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="time-outline" size={20} color="#666666" />
                <Text style={styles.infoText}>~10 minutes</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="checkmark-circle-outline" size={20} color="#666666" />
                <Text style={styles.infoText}>Multiple choice</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.startButton}
              onPress={handleStartQuiz}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Start quiz"
              accessibilityHint={`Begin the ethics knowledge quiz with ${totalQuestions} questions`}
            >
              <Text style={styles.startButtonText}>Start Quiz</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (showResults) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.resultsSection}>
            <Ionicons name="trophy" size={64} color={getScoreColor()} />
            <Text style={styles.resultsTitle}>Quiz Complete!</Text>
            
            <View style={styles.scoreCard}>
              <Text style={styles.scoreText}>Your Score</Text>
              <Text style={[styles.scoreNumber, { color: getScoreColor() }]}>
                {correctAnswers}/{totalQuestions}
              </Text>
              <Text style={styles.scorePercentage}>
                {Math.round((correctAnswers / totalQuestions) * 100)}%
              </Text>
            </View>

            <Text style={styles.scoreMessage}>{getScoreMessage()}</Text>

            <View style={styles.reviewSection}>
              <Text style={styles.reviewTitle}>Review Your Answers</Text>
              {quizQuestions.map((question, index) => {
                const userAnswer = selectedAnswers[question.id];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <View key={question.id} style={styles.reviewItem}>
                    <View style={styles.reviewHeader}>
                      <Text style={styles.reviewQuestionNumber}>Q{index + 1}</Text>
                      <Ionicons
                        name={isCorrect ? 'checkmark-circle' : 'close-circle'}
                        size={20}
                        color={isCorrect ? '#28A745' : '#DC3545'}
                      />
                    </View>
                    <Text style={styles.reviewQuestion}>{question.question}</Text>
                    <Text style={styles.reviewAnswer}>
                      Your answer: {question.options[userAnswer]}
                    </Text>
                    {!isCorrect && (
                      <Text style={styles.correctAnswer}>
                        Correct answer: {question.options[question.correctAnswer]}
                      </Text>
                    )}
                    <Text style={styles.explanation}>{question.explanation}</Text>
                  </View>
                );
              })}
            </View>

            <TouchableOpacity
              style={styles.restartButton}
              onPress={handleRestartQuiz}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Take quiz again"
              accessibilityHint="Restart the quiz from the beginning"
            >
              <Ionicons name="refresh" size={20} color="#0066CC" />
              <Text style={styles.restartButtonText}>Take Quiz Again</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.quizHeader}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }
              ]}
            />
          </View>
        </View>
      </View>

      <ScrollView style={styles.questionContainer}>
        <View style={styles.questionCard}>
          <Text style={styles.category}>{currentQuestion.category}</Text>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion.id] === index;
              
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    isSelected && styles.optionButtonSelected
                  ]}
                  onPress={() => handleAnswerSelect(index)}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel={`Option ${index + 1}: ${option}`}
                  accessibilityState={{ selected: isSelected }}
                >
                  <View style={[
                    styles.optionRadio,
                    isSelected && styles.optionRadioSelected
                  ]}>
                    {isSelected && <View style={styles.optionRadioInner} />}
                  </View>
                  <Text style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected
                  ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[
            styles.navButton,
            currentQuestionIndex === 0 && styles.navButtonDisabled
          ]}
          onPress={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Previous question"
          accessibilityState={{ disabled: currentQuestionIndex === 0 }}
        >
          <Ionicons name="arrow-back" size={20} color={currentQuestionIndex === 0 ? '#CCCCCC' : '#0066CC'} />
          <Text style={[
            styles.navButtonText,
            currentQuestionIndex === 0 && styles.navButtonTextDisabled
          ]}>
            Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            styles.nextButton,
            selectedAnswers[currentQuestion.id] === undefined && styles.navButtonDisabled
          ]}
          onPress={handleNextQuestion}
          disabled={selectedAnswers[currentQuestion.id] === undefined}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={currentQuestionIndex === totalQuestions - 1 ? "Finish quiz" : "Next question"}
          accessibilityState={{ disabled: selectedAnswers[currentQuestion.id] === undefined }}
        >
          <Text style={[
            styles.navButtonText,
            styles.nextButtonText,
            selectedAnswers[currentQuestion.id] === undefined && styles.navButtonTextDisabled
          ]}>
            {currentQuestionIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
          </Text>
          <Ionicons 
            name={currentQuestionIndex === totalQuestions - 1 ? 'checkmark' : 'arrow-forward'} 
            size={20} 
            color={selectedAnswers[currentQuestion.id] === undefined ? '#CCCCCC' : '#FFFFFF'} 
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  introSection: {
    padding: 20,
    alignItems: 'center',
  },
  introTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  introDescription: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  quizInfo: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 8,
    marginBottom: 24,
    width: '100%',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 12,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0066CC',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 8,
  },
  quizHeader: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  progressContainer: {
    width: '100%',
  },
  progressText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    textAlign: 'center',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0066CC',
    borderRadius: 2,
  },
  questionContainer: {
    flex: 1,
    padding: 20,
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  category: {
    fontSize: 14,
    color: '#0066CC',
    fontWeight: '600',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 18,
    color: '#333333',
    lineHeight: 26,
    marginBottom: 24,
    fontWeight: '500',
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  optionButtonSelected: {
    backgroundColor: '#F0F8FF',
    borderColor: '#0066CC',
  },
  optionRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionRadioSelected: {
    borderColor: '#0066CC',
  },
  optionRadioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0066CC',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    lineHeight: 22,
  },
  optionTextSelected: {
    color: '#0066CC',
    fontWeight: '500',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#0066CC',
  },
  nextButton: {
    backgroundColor: '#0066CC',
  },
  navButtonDisabled: {
    borderColor: '#CCCCCC',
    backgroundColor: '#F8F9FA',
  },
  navButtonText: {
    fontSize: 16,
    color: '#0066CC',
    fontWeight: '500',
    marginHorizontal: 4,
  },
  nextButtonText: {
    color: '#FFFFFF',
  },
  navButtonTextDisabled: {
    color: '#CCCCCC',
  },
  resultsSection: {
    padding: 20,
    alignItems: 'center',
  },
  resultsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 16,
    marginBottom: 24,
  },
  scoreCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scoreText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  scorePercentage: {
    fontSize: 20,
    color: '#666666',
  },
  scoreMessage: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  reviewSection: {
    width: '100%',
    marginBottom: 24,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  reviewItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewQuestionNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0066CC',
  },
  reviewQuestion: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 8,
    lineHeight: 20,
  },
  reviewAnswer: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  correctAnswer: {
    fontSize: 14,
    color: '#28A745',
    fontWeight: '500',
    marginBottom: 8,
  },
  explanation: {
    fontSize: 13,
    color: '#666666',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  restartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#0066CC',
  },
  restartButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0066CC',
    marginLeft: 8,
  },
});

export default QuizScreen;