import React from 'react';
import { PlusIcon, TargetIcon, CalendarIcon, CheckSquareIcon, PencilIcon, TrashIcon, CaretRightIcon, CheckIcon } from '@phosphor-icons/react';

const DashboardView = ({
  setCurrentView, goals, dailyTasks, periodOptions,
  deleteGoal, startEditing, saveEdit, cancelEditing, editingItem, editText, setEditText,
  setSelectedGoal, setShowGoalGuide,
}) => {
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">목표 대시보드</h1>
        <button
          onClick={() => setCurrentView('create-goal')}
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-colors"
        >
          <PlusIcon size={24} />
        </button>
      </div>

      {/* Today's summary */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl shadow-lg">
        <div className="flex justify-between items-start mb-4">
          {/* Goal guide button (commented out, activate if needed) */}
          <button onClick={() => setShowGoalGuide(true)} className="text-2xl font-bold hover:text-blue-200 transition-colors">
            2025 목표
          </button>
          <div className="text-right text-sm opacity-90">
            <p>{new Date().toLocaleDateString('ko-KR')}</p>
          </div>
        </div>
        <h2 className="text-lg font-semibold mb-2">오늘의 현황</h2>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-90">완료된 작업</p>
            <p className="text-xl font-bold">
              {dailyTasks.filter(task => task.completed && task.date === new Date().toISOString().split('T')[0]).length}
            </p>
          </div>
          <div>
            <p className="text-sm opacity-90">전체 작업</p>
            <p className="text-xl font-bold">
              {dailyTasks.filter(task => task.date === new Date().toISOString().split('T')[0]).length}
            </p>
          </div>
        </div>
      </div>

      {/* Active goals list */}
      <h2 className="text-lg font-semibold mb-4 text-gray-800">활성 목표</h2>
      {goals.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <TargetIcon size={48} className="mx-auto mb-4 opacity-50" />
          <p>아직 설정된 목표가 없습니다.</p>
          <p className="text-sm">새로운 목표를 만들어보세요!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {goals.map(goal => (
            <div key={goal.id} className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  {/* Goal title edit mode */}
                  {editingItem?.type === 'goal' && editingItem?.id === goal.id ? (
                    <div className="flex gap-2">
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
                    <h3 className="font-semibold text-gray-800">{goal.title}</h3>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                      {periodOptions.find(p => p.value === goal.period)?.label}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-4">
                  <button onClick={() => startEditing('goal', goal.id, goal.title)} className="text-gray-400 hover:text-blue-600 p-1">
                    <PencilIcon size={14} />
                  </button>
                  <button onClick={() => deleteGoal(goal.id)} className="text-gray-400 hover:text-red-500 p-1">
                    <TrashIcon size={14} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500">{goal.centerGoal}</p>
              <div className="flex justify-between items-center mt-3">
                <div className="flex-1">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{goal.progress}% 완료</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => {
                      setSelectedGoal(goal);
                      setCurrentView('calendar');
                    }}
                    className="text-purple-500 hover:text-purple-700 p-1"
                  >
                    <CalendarIcon size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedGoal(goal);
                      setCurrentView('goal-detail'); // 'goal-detail' view is not currently implemented
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <CaretRightIcon size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick action buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setCurrentView('hierarchical-goals')}
          className="bg-green-50 border border-green-200 p-4 rounded-xl text-center hover:bg-green-100 transition-colors"
        >
          <TargetIcon className="mx-auto mb-2 text-green-800" size={24} />
          <p className="text-sm font-medium text-green-800">계층 목표</p>
        </button>
        <button
          onClick={() => setCurrentView('daily-tasks')}
          className="bg-orange-50 border border-orange-200 p-4 rounded-xl text-center hover:bg-orange-100 transition-colors"
        >
          <CheckSquareIcon className="mx-auto mb-2 text-orange-800" size={24} />
          <p className="text-sm font-medium text-orange-800">일일 할일</p>
        </button>
      </div>
    </div>
  );
};

export default DashboardView;