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
import BottomNavBar from './components/BottomNavBar';
import GoalGuideView from './components/GoalGuideView';

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
    guideAnswers, setGuideAnswers,
    currentQuestionIndex, setCurrentQuestionIndex,
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
    guideAnswers, setGuideAnswers,
    currentQuestionIndex, setCurrentQuestionIndex,
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 max-w-md mx-auto">
      {/* Main content area */}
      <div className="min-h-screen bg-gray-50 pb-20 max-w-md mx-auto">
        {currentView === 'dashboard' && <DashboardView {...commonProps} />}
        {currentView === 'create-goal' && <CreateGoalView {...commonProps} />}
        {currentView === 'hierarchical-goals' && <HierarchicalGoalsView {...commonProps} />}
        {currentView === 'daily-tasks' && <DailyTasksView {...commonProps} />}
        {currentView === 'calendar' && <CalendarView {...commonProps} />} 
        {currentView === 'filtered-tasks' && <FilteredTasksView {...commonProps} />}
        {showGoalGuide && <GoalGuideView {...commonProps} />}
      </div>
      <BottomNavBar currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
}

export default App;