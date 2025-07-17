import React, { useState } from 'react';
import { PlusIcon } from '@phosphor-icons/react';

const CreateGoalView = ({ setCurrentView, createGoal, periodOptions }) => {
  const [newGoal, setNewGoal] = useState({
    title: '',
    period: '365days',
    centerGoal: '',
    subGoals: Array(8).fill('')
  });

  const handleSubmit = () => {
    if (newGoal.title && newGoal.centerGoal && newGoal.subGoals.some(goal => goal.trim())) {
      createGoal(newGoal);
      setCurrentView('dashboard');
      // Reset form
      setNewGoal({
        title: '',
        period: '365days',
        centerGoal: '',
        subGoals: Array(8).fill('')
      });
    } else {
      // Use proper UI for user messages (instead of alert())
      // For example, use toast message or modal
      console.log("모든 필수 필드를 채워주세요.");
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">새 목표 만들기</h1>
        <button onClick={() => setCurrentView('dashboard')} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      {/* Goal title input */}
      <div>
        <label htmlFor="goalTitle" className="block text-sm font-medium text-gray-700 mb-2">목표 제목</label>
        <input
          id="goalTitle"
          type="text"
          value={newGoal.title}
          onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="예: 2025년 자기계발 목표"
        />
      </div>

      {/* Goal period selection */}
      <div>
        <label htmlFor="goalPeriod" className="block text-sm font-medium text-gray-700 mb-2">목표 기간</label>
        <select
          id="goalPeriod"
          value={newGoal.period}
          onChange={(e) => setNewGoal({ ...newGoal, period: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {periodOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Mandalart grid input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">만다라트 목표 설정</label>
        <div className="grid grid-cols-3 gap-2 aspect-square">
          {Array.from({ length: 9 }).map((_, index) => (
            <React.Fragment key={index}>
              {index === 4 ? ( // Center goal (5th cell)
                <textarea
                  value={newGoal.centerGoal}
                  onChange={(e) => setNewGoal({ ...newGoal, centerGoal: e.target.value })}
                  className="aspect-square p-2 text-xs border border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 text-center flex items-center justify-center"
                  placeholder="중앙 목표"
                />
              ) : (
                <input
                  type="text"
                  value={newGoal.subGoals[index > 4 ? index - 1 : index]} // Adjust sub-goal index (excluding center)
                  onChange={(e) => {
                    const newSubGoals = [...newGoal.subGoals];
                    newSubGoals[index > 4 ? index - 1 : index] = e.target.value;
                    setNewGoal({ ...newGoal, subGoals: newSubGoals });
                  }}
                  className="aspect-square p-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-center"
                  placeholder={`세부 목표 ${index + 1}`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Create goal button */}
      <div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <PlusIcon size={20} />
          목표 생성하기
        </button>
      </div>
    </div>
  );
};

export default CreateGoalView;