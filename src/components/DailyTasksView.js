import React, { useState } from 'react';
import { PlusIcon, CheckSquareIcon, PencilIcon, TrashIcon, CheckIcon } from '@phosphor-icons/react';

const DailyTasksView = ({
  setCurrentView, dailyTasks, weeklyGoals,
  addDailyTask, toggleTaskCompletion, deleteDailyTask,
  editingItem, editText, setEditText, startEditing, saveEdit, cancelEditing,
}) => {
  const [newTask, setNewTask] = useState('');
  const [selectedWeeklyGoalId, setSelectedWeeklyGoalId] = useState(weeklyGoals[0]?.id || null);

  const handleAddTask = () => {
    if (newTask.trim() && selectedWeeklyGoalId) {
      addDailyTask(selectedWeeklyGoalId, newTask);
      setNewTask('');
    }
  };

  // Filter tasks for today only
  const todayTasks = dailyTasks.filter(task =>
    task.date === new Date().toISOString().split('T')[0]
  );

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">오늘의 할일</h1>
        <button onClick={() => setCurrentView('dashboard')} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      {/* Progress summary */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-4 rounded-xl shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-90">완료된 작업</p>
            <p className="text-2xl font-bold">
              {todayTasks.filter(t => t.completed).length} / {todayTasks.length}
            </p>
          </div>
        </div>
      </div>

      {/* Weekly goal selection dropdown for adding new tasks */}
      {weeklyGoals.length > 0 && (
        <div>
          <label htmlFor="weeklyGoalSelect" className="block text-sm font-medium text-gray-700 mb-2">어떤 주간 목표에 속하는 할일인가요?</label>
          <select
            id="weeklyGoalSelect"
            value={selectedWeeklyGoalId || ''}
            onChange={(e) => setSelectedWeeklyGoalId(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">주간 목표를 선택하세요</option>
            {weeklyGoals.map(wg => (
              <option key={wg.id} value={wg.id}>{wg.title}</option>
            ))}
          </select>
        </div>
      )}

      {/* New task input field */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="새 할 일을 입력하세요"
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        />
        <button onClick={handleAddTask} className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600">
          <PlusIcon size={20} />
        </button>
      </div>

      {/* Today's task list */}
      <div className="space-y-3">
        {todayTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <CheckSquareIcon size={48} className="mx-auto mb-4 opacity-50" />
            <p>오늘 할일이 없습니다!</p>
          </div>
        ) : (
          todayTasks.map(task => (
            <div key={task.id} className={`bg-white rounded-lg p-4 shadow-md border border-gray-100 transition-all ${task.completed ? 'opacity-75' : ''}`}>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-green-500'
                  }`}
                >
                  {task.completed && <CheckIcon size={16} />}
                </button>
                <div className="flex-1">
                  {/* Task title edit mode */}
                  {editingItem?.type === 'task' && editingItem?.id === task.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1 p-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
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
                    <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                      {task.title}
                    </span>
                  )}
                  <p className="text-xs text-gray-500 mt-1">{task.date}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => startEditing('task', task.id, task.title)} className="text-gray-400 hover:text-blue-600 p-1">
                    <PencilIcon size={14} />
                  </button>
                  <button onClick={() => deleteDailyTask(task.id)} className="text-gray-400 hover:text-red-600 p-1">
                    <TrashIcon size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DailyTasksView;