import React, { useState, useEffect } from 'react';
import { goalGuideQuestions } from '../constants/appConstants';

const GoalGuideView = ({
  showGoalGuide, setShowGoalGuide,
  guideAnswers, setGuideAnswers,
  currentQuestionIndex, setCurrentQuestionIndex,
  createGoal,
  setCurrentView,
}) => {
  console.log("GoalGuideView rendered. guideAnswers:", guideAnswers, "currentQuestionIndex:", currentQuestionIndex);

  const [currentInput, setCurrentInput] = useState('');

  useEffect(() => {
    console.log("GoalGuideView useEffect triggered. showGoalGuide:", showGoalGuide, "currentQuestionIndex:", currentQuestionIndex, "guideAnswers:", guideAnswers);
    if (showGoalGuide) {
      // Ensure all necessary variables are defined before accessing properties
      if (guideAnswers && goalGuideQuestions && currentQuestionIndex !== undefined && currentQuestionIndex >= 0 && currentQuestionIndex < goalGuideQuestions.length) {
        const question = goalGuideQuestions[currentQuestionIndex];
        if (question && question.id !== undefined) {
          setCurrentInput(guideAnswers[question.id] || '');
        } else {
          console.warn("GoalGuideView: currentQuestion or its ID is undefined in useEffect.", { question, currentQuestionIndex, goalGuideQuestions });
          setCurrentInput('');
        }
      } else {
        console.warn("GoalGuideView: Missing or invalid props/data in useEffect.", { guideAnswers, goalGuideQuestions, currentQuestionIndex });
        setCurrentInput('');
      }
    }
  }, [currentQuestionIndex, showGoalGuide, guideAnswers]);

  if (!showGoalGuide) return null;

  const currentQuestion = goalGuideQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === goalGuideQuestions.length - 1;

  const handleNext = () => {
    if (!currentQuestion) {
      console.error("currentQuestion is undefined in handleNext. Cannot save answer.");
      return;
    }
    // Save current answer
    setGuideAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: currentInput
    }));

    if (isLastQuestion) {
      // Create goal from answers
      const newGoal = {
        title: guideAnswers.mainGoal || '새로운 목표',
        period: '365days', // Default to 1 year for guided goals
        centerGoal: guideAnswers.mainGoal || '',
        subGoals: [
          guideAnswers.subGoal1 || '',
          guideAnswers.subGoal2 || '',
          guideAnswers.subGoal3 || '',
          '', '', '', '', '' // Fill remaining with empty strings
        ].filter(Boolean).concat(Array(8).fill('')).slice(0, 8), // Ensure 8 subgoals
      };
      createGoal(newGoal);
      setShowGoalGuide(false);
      setCurrentQuestionIndex(0);
      setGuideAnswers({});
      setCurrentView('dashboard'); // Go back to dashboard after creating goal
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!currentQuestion) {
      console.error("currentQuestion is undefined in handlePrevious. Cannot save answer.");
      return;
    }
    setGuideAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: currentInput
    }));
    setCurrentQuestionIndex(prev => prev - 1);
  };

  const handleClose = () => {
    setShowGoalGuide(false);
    setCurrentQuestionIndex(0);
    setGuideAnswers({});
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-auto space-y-4 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">목표 설정 가이드</h2>

        {currentQuestion && (
          <div className="space-y-4">
            <p className="text-lg font-semibold text-gray-700">{currentQuestion.text}</p>
            {currentQuestion.id !== 'summary' ? (
              <textarea
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
                placeholder={currentQuestion.placeholder}
              />
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2 text-sm">
                <p><strong>1년 후 꿈:</strong> {guideAnswers.dream}</p>
                <p><strong>핵심 가치:</strong> {guideAnswers.coreValue}</p>
                <p><strong>메인 목표:</strong> {guideAnswers.mainGoal}</p>
                <p><strong>세부 목표 1:</strong> {guideAnswers.subGoal1}</p>
                <p><strong>세부 목표 2:</strong> {guideAnswers.subGoal2}</p>
                <p><strong>세부 목표 3:</strong> {guideAnswers.subGoal3}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`py-2 px-4 rounded-lg font-medium transition-colors ${
              currentQuestionIndex === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            이전
          </button>
          <button
            onClick={handleNext}
            className="py-2 px-4 rounded-lg font-medium transition-colors bg-blue-500 text-white hover:bg-blue-600"
          >
            {isLastQuestion ? '목표 생성하기' : '다음'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalGuideView;