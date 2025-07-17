import React, { useState } from 'react';
import { PlusIcon, TargetIcon, PencilIcon, TrashIcon, CaretRightIcon, CheckIcon } from '@phosphor-icons/react';

const HierarchicalGoalsView = ({
  setCurrentView, goals, yearlyGoals, monthlyGoals, weeklyGoals,
  addYearlyGoal, addMonthlyGoal, addWeeklyGoal,
  deleteYearlyGoal, deleteMonthlyGoal, deleteWeeklyGoal,
  editingItem, editText, setEditText, startEditing, saveEdit, cancelEditing,
  currentGoalLevel, setCurrentGoalLevel, setSelectedYearlyGoalId, setSelectedMonthlyGoalId,
  setSelectedGoal, // Required for navigation to FilteredTasksView
}) => {
  const [newGoalText, setNewGoalText] = useState('');
  // Set initial value to first goal's ID, or null if none exist
  const [selectedGoalId, setSelectedGoalId] = useState(goals[0]?.id || null);
  const [selectedYearlyGoalId, setInternalSelectedYearlyGoalId] = useState(null);
  const [selectedMonthlyGoalId, setInternalSelectedMonthlyGoalId] = useState(null);
  const [selectedSubGoalIndex, setSelectedSubGoalIndex] = useState(0);

  // Filter goals based on current selected level
  const currentYearlyGoals = yearlyGoals.filter(yg => yg.goalId === selectedGoalId);
  const currentMonthlyGoals = monthlyGoals.filter(mg => mg.yearlyGoalId === selectedYearlyGoalId);
  const currentWeeklyGoals = weeklyGoals.filter(wg => wg.monthlyGoalId === selectedMonthlyGoalId);

  // Use parent component's setSelectedYearlyGoalId
  const handleSetSelectedYearlyGoalId = (id) => {
    setInternalSelectedYearlyGoalId(id);
    setSelectedYearlyGoalId(id); // Update useMandalartGoals hook state
  };

  // Use parent component's setSelectedMonthlyGoalId
  const handleSetSelectedMonthlyGoalId = (id) => {
    setInternalSelectedMonthlyGoalId(id);
    setSelectedMonthlyGoalId(id); // Update useMandalartGoals hook state
  };

  const handleAddGoal = () => {
    if (!newGoalText.trim()) return;

    if (currentGoalLevel === 'yearly' && selectedGoalId !== null) {
      addYearlyGoal(selectedGoalId, selectedSubGoalIndex, newGoalText);
    } else if (currentGoalLevel === 'monthly' && selectedYearlyGoalId !== null) {
      addMonthlyGoal(selectedYearlyGoalId, newGoalText);
    } else if (currentGoalLevel === 'weekly' && selectedMonthlyGoalId !== null) {
      addWeeklyGoal(selectedMonthlyGoalId, newGoalText);
    }
    setNewGoalText('');
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">계층 목표 관리</h1>
        <button onClick={() => setCurrentView('dashboard')} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      {/* Level navigation */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        {['yearly', 'monthly', 'weekly'].map(level => (
          <button
            key={level}
            onClick={() => setCurrentGoalLevel(level)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              currentGoalLevel === level ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {level === 'yearly' ? '연간' : level === 'monthly' ? '월간' : '주간'}
          </button>
        ))}
      </div>

      {/* Goal selection dropdown */}
      {goals.length > 0 && currentGoalLevel === 'yearly' && (
        <div>
          <label htmlFor="longTermGoalSelect" className="block text-sm font-medium text-gray-700 mb-2">장기 목표 선택</label>
          <select
            id="longTermGoalSelect"
            value={selectedGoalId || ''}
            onChange={(e) => setSelectedGoalId(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {goals.map(goal => (
              <option key={goal.id} value={goal.id}>{goal.title}</option>
            ))}
          </select>
          {selectedGoalId && (
            <div className="mt-3">
              <label htmlFor="subGoalSelect" className="block text-sm font-medium text-gray-700 mb-2">세부 목표 선택</label>
              <select
                id="subGoalSelect"
                value={selectedSubGoalIndex}
                onChange={(e) => setSelectedSubGoalIndex(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {goals.find(g => g.id === selectedGoalId)?.subGoals.map((subGoal, index) => (
                  <option key={index} value={index}>{subGoal}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {currentGoalLevel === 'monthly' && (
        <div>
          <label htmlFor="yearlyGoalSelect" className="block text-sm font-medium text-gray-700 mb-2">연간 목표 선택</label>
          <select
            id="yearlyGoalSelect"
            value={selectedYearlyGoalId || ''}
            onChange={(e) => handleSetSelectedYearlyGoalId(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">연간 목표를 선택하세요</option>
            {yearlyGoals.map(yg => (
              <option key={yg.id} value={yg.id}>{yg.title}</option>
            ))}
          </select>
        </div>
      )}

      {currentGoalLevel === 'weekly' && (
        <div>
          <label htmlFor="monthlyGoalSelect" className="block text-sm font-medium text-gray-700 mb-2">월간 목표 선택</label>
          <select
            id="monthlyGoalSelect"
            value={selectedMonthlyGoalId || ''}
            onChange={(e) => handleSetSelectedMonthlyGoalId(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">월간 목표를 선택하세요</option>
            {monthlyGoals.map(mg => (
              <option key={mg.id} value={mg.id}>{mg.title}</option>
            ))}
          </select>
        </div>
      )}

      {/* New goal input field */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newGoalText}
          onChange={(e) => setNewGoalText(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder={`${currentGoalLevel === 'yearly' ? '연간' : currentGoalLevel === 'monthly' ? '월간' : '주간'} 목표를 입력하세요`}
          onKeyPress={(e) => e.key === 'Enter' && handleAddGoal()}
        />
        <button onClick={handleAddGoal} className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600">
          <PlusIcon size={20} />
        </button>
      </div>

      {/* Goal list */}
      <div className="space-y-3">
        {currentGoalLevel === 'yearly' && currentYearlyGoals.map(yearlyGoal => (
          <div key={yearlyGoal.id} className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {editingItem?.type === 'yearly' && editingItem?.id === yearlyGoal.id ? (
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 p-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                      autoFocus
                    />
                    <button onClick={saveEdit} className="text-green-600 hover:text-green-800">
                      <CheckIcon size={16} />
                    </button>
                    <button onClick={cancelEditing} className="text-gray-500 hover:text-gray-700">
                      ✕
                    </button>
                  </div>
                ) : (
                  <h3 className="font-medium text-gray-800 mb-2">{yearlyGoal.title}</h3>
                )}
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${yearlyGoal.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">{yearlyGoal.progress}%</span>
                </div>
              </div>
              <div className="flex items-center gap-1 ml-4">
                <button onClick={() => startEditing('yearly', yearlyGoal.id, yearlyGoal.title)} className="text-gray-400 hover:text-blue-600 p-1">
                  <PencilIcon size={14} />
                </button>
                <button onClick={() => deleteYearlyGoal(yearlyGoal.id)} className="text-gray-400 hover:text-red-600 p-1">
                  <TrashIcon size={14} />
                </button>
                <button
                  onClick={() => {
                    handleSetSelectedYearlyGoalId(yearlyGoal.id); // Update internal state and useMandalartGoals state
                    setCurrentGoalLevel('monthly');
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <CaretRightIcon size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {currentGoalLevel === 'monthly' && currentMonthlyGoals.map(monthlyGoal => (
          <div key={monthlyGoal.id} className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {editingItem?.type === 'monthly' && editingItem?.id === monthlyGoal.id ? (
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 p-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                      autoFocus
                    />
                    <button onClick={saveEdit} className="text-green-600 hover:text-green-800">
                      <CheckIcon size={16} />
                    </button>
                    <button onClick={cancelEditing} className="text-gray-500 hover:text-gray-700">
                      ✕
                    </button>
                  </div>
                ) : (
                  <h3 className="font-medium text-gray-800">{monthlyGoal.title}</h3>
                )}
                <p className="text-sm text-gray-500">{monthlyGoal.month}월</p>
              </div>
              <div className="flex items-center gap-1 ml-4">
                <button onClick={() => startEditing('monthly', monthlyGoal.id, monthlyGoal.title)} className="text-gray-400 hover:text-blue-600 p-1">
                  <PencilIcon size={14} />
                </button>
                <button onClick={() => deleteMonthlyGoal(monthlyGoal.id)} className="text-gray-400 hover:text-red-600 p-1">
                  <TrashIcon size={14} />
                </button>
                <button
                  onClick={() => {
                    handleSetSelectedMonthlyGoalId(monthlyGoal.id); // Update internal state and useMandalartGoals state
                    setCurrentGoalLevel('weekly');
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <CaretRightIcon size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {currentGoalLevel === 'weekly' && currentWeeklyGoals.map(weeklyGoal => (
          <div key={weeklyGoal.id} className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {editingItem?.type === 'weekly' && editingItem?.id === weeklyGoal.id ? (
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 p-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                      autoFocus
                    />
                    <button onClick={saveEdit} className="text-green-600 hover:text-green-800">
                      <CheckIcon size={16} />
                    </button>
                    <button onClick={cancelEditing} className="text-gray-500 hover:text-gray-700">
                      ✕
                    </button>
                  </div>
                ) : (
                  <h3 className="font-medium text-gray-800">{weeklyGoal.title}</h3>
                )}
                <p className="text-sm text-gray-500">주차: {weeklyGoal.week}</p>
              </div>
              <div className="flex items-center gap-1 ml-4">
                <button onClick={() => startEditing('weekly', weeklyGoal.id, weeklyGoal.title)} className="text-gray-400 hover:text-blue-600 p-1">
                  <PencilIcon size={14} />
                </button>
                <button onClick={() => deleteWeeklyGoal(weeklyGoal.id)} className="text-gray-400 hover:text-red-600 p-1">
                  <TrashIcon size={14} />
                </button>
                <button
                  onClick={() => {
                    setCurrentView('filtered-tasks');
                    // Set weeklyGoalId and title for use in FilteredTasksView
                    setSelectedGoal({ weeklyGoalId: weeklyGoal.id, title: weeklyGoal.title });
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <CaretRightIcon size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Message when no goals exist */}
        {((currentGoalLevel === 'yearly' && currentYearlyGoals.length === 0) ||
          (currentGoalLevel === 'monthly' && currentMonthlyGoals.length === 0) ||
          (currentGoalLevel === 'weekly' && currentWeeklyGoals.length === 0)) && (
            <div className="text-center py-8 text-gray-500">
              <TargetIcon size={48} className="mx-auto mb-4 opacity-50" />
              <p>{currentGoalLevel === 'yearly' ? '연간' : currentGoalLevel === 'monthly' ? '월간' : '주간'} 목표를 추가해보세요!</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default HierarchicalGoalsView;