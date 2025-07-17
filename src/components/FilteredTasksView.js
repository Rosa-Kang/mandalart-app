import React, { useState } from 'react';
import { PlusIcon, CheckSquareIcon, PencilIcon, TrashIcon, CheckIcon } from '@phosphor-icons/react';

const FilteredTasksView = ({
  setCurrentView, selectedGoal, dailyTasks,
  addDailyTask, toggleTaskCompletion, deleteDailyTask,
  editingItem, editText, setEditText, startEditing, saveEdit, cancelEditing,
}) => {
  const [newTask, setNewTask] = useState('');

  // Filter tasks based on selectedGoal and weeklyGoalId
  const filteredTasks = selectedGoal?.weeklyGoalId
    ? dailyTasks.filter(task => task.weeklyGoalId === selectedGoal.weeklyGoalId)
    : []; // Return empty array if weeklyGoalId is not selected

  const handleAddTask = () => {
    if (newTask.trim() && selectedGoal?.weeklyGoalId) {
      addDailyTask(selectedGoal.weeklyGoalId, newTask);
      setNewTask('');
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          {selectedGoal?.title ? `${selectedGoal.title} 할일` : '필터된 할일'}
        </h1>
        <button onClick={() => setCurrentView('hierarchical-goals')} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      {/* Progress summary */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-4 rounded-xl shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-90">완료율</p>
            <p className="text-2xl font-bold">
              {filteredTasks.length > 0 ? Math.round((filteredTasks.filter(t => t.completed).length / filteredTasks.length) * 100) : 0}%
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">이 목표의 할일</p>
            <p className="text-lg font-semibold">
              {filteredTasks.filter(t => t.completed).length} / {filteredTasks.length}
            </p>
          </div>
        </div>
      </div>

      {/* Add new task */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="할 일을 입력하세요"
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        />
        <button onClick={handleAddTask} className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600">
          <PlusIcon size={20} />
        </button>
      </div>

      {/* Task list */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <CheckSquareIcon size={48} className="mx-auto mb-4 opacity-50" />
            <p>이 목표에 대한 할일이 없습니다!</p>
          </div>
        ) : (
          filteredTasks.map(task => (
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

export default FilteredTasksView;