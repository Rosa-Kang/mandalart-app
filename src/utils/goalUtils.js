import { formatDate, getEndDate, getCurrentMonth, getCurrentWeek } from './dateUtils';

// Generate unique ID
const generateId = () => {
  return Date.now() + Math.random();
};

// Create new goal
export const createGoal = (goalData, periodOptions, setGoals, goals, setYearlyGoals, yearlyGoals, setMonthlyGoals, monthlyGoals, setWeeklyGoals, weeklyGoals, setDailyTasks, dailyTasks) => {
  const periodOption = periodOptions.find(p => p.value === goalData.period);
  const startDate = formatDate(new Date());
  const endDate = getEndDate(startDate, goalData.period);
  
  const newGoal = {
    id: generateId(),
    title: goalData.title,
    period: goalData.period,
    centerGoal: goalData.centerGoal,
    subGoals: goalData.subGoals,
    progress: 0,
    createdDate: startDate,
    endDate: endDate,
    isActive: true
  };
  
  setGoals([...goals, newGoal]);

  // Create yearly goals from subGoals
  newGoal.subGoals.forEach((subGoalTitle, index) => {
    if (subGoalTitle.trim() !== '') {
      addYearlyGoal(newGoal.id, index, subGoalTitle, setYearlyGoals, yearlyGoals, setMonthlyGoals, monthlyGoals, setWeeklyGoals, weeklyGoals, setDailyTasks, dailyTasks);
    }
  });

  return newGoal;
};

// Add yearly goal
export const addYearlyGoal = (goalId, subGoalIndex, title, setYearlyGoals, yearlyGoals, setMonthlyGoals, monthlyGoals, setWeeklyGoals, weeklyGoals, setDailyTasks, dailyTasks) => {
  const newYearlyGoal = {
    id: generateId(),
    goalId: goalId,
    subGoalIndex: subGoalIndex,
    title: title,
    completed: false,
    progress: 0,
    createdDate: formatDate(new Date())
  };
  
  setYearlyGoals(prevYearlyGoals => [...prevYearlyGoals, newYearlyGoal]);

  // Create a default monthly goal for the new yearly goal
  addMonthlyGoal(newYearlyGoal.id, `${title} (월간 목표)`, setMonthlyGoals, monthlyGoals, setWeeklyGoals, weeklyGoals, setDailyTasks, dailyTasks);

  return newYearlyGoal;
};

// Add monthly goal
export const addMonthlyGoal = (yearlyGoalId, title, setMonthlyGoals, monthlyGoals, setWeeklyGoals, weeklyGoals, setDailyTasks, dailyTasks) => {
  const newMonthlyGoal = {
    id: generateId(),
    yearlyGoalId: yearlyGoalId,
    title: title,
    completed: false,
    progress: 0,
    month: getCurrentMonth(),
    createdDate: formatDate(new Date())
  };
  
  setMonthlyGoals([...monthlyGoals, newMonthlyGoal]);

  // Create a default weekly goal for the new monthly goal
  addWeeklyGoal(newMonthlyGoal.id, `${title} (주간 목표)`, setWeeklyGoals, weeklyGoals, setDailyTasks, dailyTasks);

  return newMonthlyGoal;
};

// Add weekly goal
export const addWeeklyGoal = (monthlyGoalId, title, setWeeklyGoals, weeklyGoals, setDailyTasks, dailyTasks) => {
  const newWeeklyGoal = {
    id: generateId(),
    monthlyGoalId: monthlyGoalId,
    title: title,
    completed: false,
    week: getCurrentWeek(),
    createdDate: formatDate(new Date())
  };
  
  setWeeklyGoals([...weeklyGoals, newWeeklyGoal]);

  // Create a default daily task for the new weekly goal
  addDailyTask(newWeeklyGoal.id, `${title} (일일 할일)`, setDailyTasks, dailyTasks);

  return newWeeklyGoal;
};

// Add daily task
export const addDailyTask = (weeklyGoalId, taskTitle, setDailyTasks, dailyTasks) => {
  const newTask = {
    id: generateId(),
    weeklyGoalId: weeklyGoalId,
    title: taskTitle,
    completed: false,
    date: formatDate(new Date()),
    createdDate: formatDate(new Date())
  };
  
  setDailyTasks([...dailyTasks, newTask]);
  return newTask;
};

// Toggle task completion
export const toggleTaskCompletion = (taskId, setDailyTasks, dailyTasks) => {
  setDailyTasks(dailyTasks.map(task => 
    task.id === taskId ? { ...task, completed: !task.completed } : task
  ));
};

// Delete goal
export const deleteGoal = (id, setGoals, goals) => {
  setGoals(goals.filter(goal => goal.id !== id));
};

// Delete yearly goal
export const deleteYearlyGoal = (id, setYearlyGoals, yearlyGoals) => {
  setYearlyGoals(yearlyGoals.filter(goal => goal.id !== id));
};

// Delete monthly goal
export const deleteMonthlyGoal = (id, setMonthlyGoals, monthlyGoals) => {
  setMonthlyGoals(monthlyGoals.filter(goal => goal.id !== id));
};

// Delete weekly goal
export const deleteWeeklyGoal = (id, setWeeklyGoals, weeklyGoals) => {
  setWeeklyGoals(weeklyGoals.filter(goal => goal.id !== id));
};

// Delete daily task
export const deleteDailyTask = (id, setDailyTasks, dailyTasks) => {
  setDailyTasks(dailyTasks.filter(task => task.id !== id));
};

// Calculate goal progress based on tasks
export const calculateGoalProgress = (goalId, dailyTasks) => {
  const goalTasks = dailyTasks.filter(task => task.weeklyGoalId === goalId);
  if (goalTasks.length === 0) return 0;
  
  const completedTasks = goalTasks.filter(task => task.completed).length;
  return Math.round((completedTasks / goalTasks.length) * 100);
};

// Update goal progress
export const updateGoalProgress = (goalId, progress, setGoals, goals) => {
  setGoals(goals.map(goal => 
    goal.id === goalId ? { ...goal, progress: progress } : goal
  ));
};

// Get tasks for specific date
export const getTasksForDate = (date, dailyTasks) => {
  const dateStr = formatDate(date);
  return dailyTasks.filter(task => task.date === dateStr);
};

// Get completed tasks for specific date
export const getCompletedTasksForDate = (date, dailyTasks) => {
  const dateStr = formatDate(date);
  return dailyTasks.filter(task => task.date === dateStr && task.completed);
};