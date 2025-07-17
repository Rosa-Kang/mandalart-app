import {
  ChartBarIcon,
  TargetIcon,
  CalendarIcon,
  CheckSquareIcon
} from '@phosphor-icons/react';
import useMandalartGoals from './hooks/useMandalartGoals';
import DashboardView from './components/DashboardView';
import CreateGoalView from './components/CreateGoalView';
import HierarchicalGoalsView from './components/HierarchicalGoalsView';
import DailyTasksView from './components/DailyTasksView';
import CalendarView from './components/CalendarView';
import FilteredTasksView from './components/FilteredTasksView';

function App() {
  const {
    currentView, setCurrentView,
    goals, selectedGoal, setSelectedGoal,
    yearlyGoals, monthlyGoals, weeklyGoals, dailyTasks,
    periodOptions,
    createGoal, addYearlyGoal, addMonthlyGoal, addWeeklyGoal, addDailyTask,
    toggleTaskCompletion,
    deleteGoal, deleteYearlyGoal, deleteMonthlyGoal, deleteWeeklyGoal, deleteDailyTask,
    editingItem, editText, setEditText, startEditing, saveEdit, cancelEditing, 
    selectedDate, setSelectedDate, getDaysInMonth, getFirstDayOfMonth, getDayProgress,
    currentGoalLevel, setCurrentGoalLevel,
    selectedYearlyGoalId, setSelectedYearlyGoalId, 
    selectedMonthlyGoalId, setSelectedMonthlyGoalId, 
    showGoalGuide, setShowGoalGuide, 
  } = useMandalartGoals();

 
  const commonProps = {
    setCurrentView,
    goals, selectedGoal, setSelectedGoal,
    yearlyGoals, monthlyGoals, weeklyGoals, dailyTasks,
    periodOptions,
    createGoal, addYearlyGoal, addMonthlyGoal, addWeeklyGoal, addDailyTask,
    toggleTaskCompletion,
    deleteGoal, deleteYearlyGoal, deleteMonthlyGoal, deleteWeeklyGoal, deleteDailyTask,
    editingItem, editText, setEditText, startEditing, saveEdit, cancelEditing,
    selectedDate, setSelectedDate, getDaysInMonth, getFirstDayOfMonth, getDayProgress,
    currentGoalLevel, setCurrentGoalLevel,
    selectedYearlyGoalId, setSelectedYearlyGoalId,
    selectedMonthlyGoalId, setSelectedMonthlyGoalId,
    showGoalGuide, setShowGoalGuide,
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 max-w-md mx-auto">
      {/* Bottom navigation bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg flex justify-around p-2 z-10">
        <button
          onClick={() => setCurrentView('dashboard')}
          className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
            currentView === 'dashboard' ? 'text-blue-500 bg-blue-50' : 'text-gray-500'
          }`}
        >
          <ChartBarIcon size={20} />
          <span className="text-xs mt-1">대시보드</span>
        </button>

        <button
          onClick={() => setCurrentView('create-goal')}
          className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
            currentView === 'create-goal' ? 'text-blue-500 bg-blue-50' : 'text-gray-500'
          }`}
        >
          <TargetIcon size={20} />
          <span className="text-xs mt-1">목표설정</span>
        </button>

        <button
          onClick={() => setCurrentView('hierarchical-goals')}
          className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
            currentView === 'hierarchical-goals' ? 'text-blue-500 bg-blue-50' : 'text-gray-500'
          }`}
        >
          <CalendarIcon size={20} />
          <span className="text-xs mt-1">계층목표</span>
        </button>

        <button
          onClick={() => setCurrentView('daily-tasks')}
          className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
            currentView === 'daily-tasks' ? 'text-blue-500 bg-blue-50' : 'text-gray-500'
          }`}
        >
          <CheckSquareIcon size={20} />
          <span className="text-xs mt-1">할일</span>
        </button>
      </div>

      {/* Main content area */}
      <div className="min-h-screen bg-gray-50 pb-20 max-w-md mx-auto">
        {currentView === 'dashboard' && <DashboardView {...commonProps} />}
        {currentView === 'create-goal' && <CreateGoalView {...commonProps} />}
        {currentView === 'hierarchical-goals' && <HierarchicalGoalsView {...commonProps} />}
        {currentView === 'daily-tasks' && <DailyTasksView {...commonProps} />}
        {currentView === 'calendar' && <CalendarView {...commonProps} />} {/* 'CalendarIcon' → 'calendar' 수정 */}
        {currentView === 'filtered-tasks' && <FilteredTasksView {...commonProps} />}
        {/* GoalGuideView는 모달로 처리될 수 있으며, showGoalGuide 상태에 따라 렌더링됩니다. */}
        {/* {showGoalGuide && <GoalGuideView {...commonProps} />} */}
      </div>
    </div>
  );
}

export default App;