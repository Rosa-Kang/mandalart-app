import { useState, useEffect } from 'react';
import { periodOptions, goalGuideQuestions } from '../constants/appConstants';
import { getDaysInMonth, getFirstDayOfMonth } from '../utils/dateUtils';
import {
  createGoal as utilCreateGoal, addYearlyGoal as utilAddYearlyGoal,
  addMonthlyGoal as utilAddMonthlyGoal, addWeeklyGoal as utilAddWeeklyGoal,
  addDailyTask as utilAddDailyTask, toggleTaskCompletion as utilToggleTaskCompletion,
  deleteGoal as utilDeleteGoal, deleteYearlyGoal as utilDeleteYearlyGoal,
  deleteMonthlyGoal as utilDeleteMonthlyGoal, deleteWeeklyGoal as utilDeleteWeeklyGoal,
  deleteDailyTask as utilDeleteDailyTask
} from '../utils/goalUtils';

const useMandalartGoals = () => {
  // State variables
  const [currentView, setCurrentView] = useState('dashboard');
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [yearlyGoals, setYearlyGoals] = useState([]);
  const [monthlyGoals, setMonthlyGoals] = useState([]);
  const [weeklyGoals, setWeeklyGoals] = useState([]);
  const [dailyTasks, setDailyTasks] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('365days'); // Not used but was in original code
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentGoalLevel, setCurrentGoalLevel] = useState('yearly');
  const [selectedYearlyGoalId, setSelectedYearlyGoalId] = useState(null);
  const [selectedMonthlyGoalId, setSelectedMonthlyGoalId] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [editText, setEditText] = useState('');
  const [guideAnswers, setGuideAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showGoalGuide, setShowGoalGuide] = useState(false);

  // Initialize sample data (runs once when component mounts)
  useEffect(() => {
    const sampleGoals = [
      {
        id: 1, title: "파이프스타일", period: "365days", centerGoal: "중앙 목표",
        subGoals: ["하위 목표 1", "하위 목표 2", "하위 목표 3", "하위 목표 4", "하위 목표 5", "하위 목표 6", "하위 목표 7", "하위 목표 8"], progress: 65,
        createdDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }
    ];
    setGoals(sampleGoals);

    const sampleYearlyGoals = [
      { id: 1, goalId: 1, subGoalIndex: 0, title: "연간 목표 1", completed: false, progress: 30 },
      { id: 2, goalId: 1, subGoalIndex: 1, title: "연간 목표 2", completed: false, progress: 70 }
    ];
    setYearlyGoals(sampleYearlyGoals);

    const sampleMonthlyGoals = [
      { id: 1, yearlyGoalId: 1, title: "월간 목표 1 (2025년 1월)", completed: false, progress: 65, month: new Date().getMonth() + 1 },
      { id: 2, yearlyGoalId: 2, title: "월간 목표 2 (2025년 1월 25일)", completed: false, progress: 70, month: new Date().getMonth() + 1 }
    ];
    setMonthlyGoals(sampleMonthlyGoals);

    const sampleWeeklyGoals = [
      { id: 1, monthlyGoalId: 1, title: "주간 목표 1 (5일차)", completed: false, week: 1 },
      { id: 2, monthlyGoalId: 2, title: "주간 목표 2 (12일차)", completed: false, week: 2 }
    ];
    setWeeklyGoals(sampleWeeklyGoals);

    const sampleDailyTasks = [
      { id: 1, weeklyGoalId: 1, title: "일일 할일 1", completed: false, date: new Date().toISOString().split('T')[0] },
      { id: 2, weeklyGoalId: 1, title: "일일 할일 2 (완료)", completed: true, date: new Date().toISOString().split('T')[0] },
      { id: 3, weeklyGoalId: 2, title: "일일 할일 3", completed: false, date: new Date().toISOString().split('T')[0] }
    ];
    setDailyTasks(sampleDailyTasks);
  }, []);

  // Editing related functions
  const startEditing = (type, id, initialText) => {
    setEditingItem({ type, id });
    setEditText(initialText);
  };

  const saveEdit = () => {
    if (!editingItem) return;

    if (editingItem.type === 'goal') {
      setGoals(goals.map(item => item.id === editingItem.id ? { ...item, title: editText } : item));
    } else if (editingItem.type === 'yearly') {
      setYearlyGoals(yearlyGoals.map(item => item.id === editingItem.id ? { ...item, title: editText } : item));
    } else if (editingItem.type === 'monthly') {
      setMonthlyGoals(monthlyGoals.map(item => item.id === editingItem.id ? { ...item, title: editText } : item));
    } else if (editingItem.type === 'weekly') {
      setWeeklyGoals(weeklyGoals.map(item => item.id === editingItem.id ? { ...item, title: editText } : item));
    } else if (editingItem.type === 'task') {
      setDailyTasks(dailyTasks.map(item => item.id === editingItem.id ? { ...item, title: editText } : item));
    }
    cancelEditing();
  };

  const cancelEditing = () => {
    setEditingItem(null);
    setEditText('');
  };

  // Calendar utility function (depends on state)
  const getDayProgress = (date, goal) => {
    const dateStr = date.toISOString().split('T')[0];
    // dailyTasks is accessible directly as it's state from useMandalartGoals hook
    const dayTasks = dailyTasks.filter(task => task.date === dateStr && task.weeklyGoalId === goal?.weeklyGoalId);
    if (dayTasks.length === 0) return 0;
    return Math.round((dayTasks.filter(task => task.completed).length / dayTasks.length) * 100);
  };

  return {
    currentView, setCurrentView,
    goals,
    selectedGoal, setSelectedGoal,
    yearlyGoals, monthlyGoals, weeklyGoals, dailyTasks,
    selectedPeriod, setSelectedPeriod,
    selectedDate, setSelectedDate,
    currentGoalLevel, setCurrentGoalLevel,
    selectedYearlyGoalId, setSelectedYearlyGoalId,
    selectedMonthlyGoalId, setSelectedMonthlyGoalId,
    editingItem,
    editText, setEditText,
    guideAnswers, setGuideAnswers,
    currentQuestionIndex, setCurrentQuestionIndex,
    showGoalGuide, setShowGoalGuide,
    periodOptions, goalGuideQuestions,
    // Utility functions that update state (pass setters as arguments)
    createGoal: (goalData) => utilCreateGoal(goalData, periodOptions, setGoals, goals, setYearlyGoals, yearlyGoals, setMonthlyGoals, monthlyGoals, setWeeklyGoals, weeklyGoals, setDailyTasks, dailyTasks),
    addYearlyGoal: (goalId, subGoalIndex, title) => utilAddYearlyGoal(goalId, subGoalIndex, title, setYearlyGoals, yearlyGoals, setMonthlyGoals, monthlyGoals, setWeeklyGoals, weeklyGoals, setDailyTasks, dailyTasks),
    addMonthlyGoal: (yearlyGoalId, title) => utilAddMonthlyGoal(yearlyGoalId, title, setMonthlyGoals, monthlyGoals),
    addWeeklyGoal: (monthlyGoalId, title) => utilAddWeeklyGoal(monthlyGoalId, title, setWeeklyGoals, weeklyGoals),
    addDailyTask: (weeklyGoalId, taskTitle) => utilAddDailyTask(weeklyGoalId, taskTitle, setDailyTasks, dailyTasks),
    toggleTaskCompletion: (taskId) => utilToggleTaskCompletion(taskId, setDailyTasks, dailyTasks),
    deleteGoal: (id) => utilDeleteGoal(id, setGoals, goals),
    deleteYearlyGoal: (id) => utilDeleteYearlyGoal(id, setYearlyGoals, yearlyGoals),
    deleteMonthlyGoal: (id) => utilDeleteMonthlyGoal(id, setMonthlyGoals, monthlyGoals),
    deleteWeeklyGoal: (id) => utilDeleteWeeklyGoal(id, setWeeklyGoals, weeklyGoals),
    deleteDailyTask: (id) => utilDeleteDailyTask(id, setDailyTasks, dailyTasks),
    // Editing related functions
    startEditing, saveEdit, cancelEditing,
    // Date utility functions
    getDaysInMonth,
    getFirstDayOfMonth,
    getDayProgress,
  };
};

export default useMandalartGoals;