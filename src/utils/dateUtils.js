// Get number of days in a month
export const getDaysInMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

// Get first day of month (0 = Sunday, 1 = Monday, etc.)
export const getFirstDayOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

// Format date to YYYY-MM-DD
export const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

// Get today's date string
export const getTodayString = () => {
  return formatDate(new Date());
};

// Check if date is today
export const isToday = (date) => {
  return formatDate(date) === getTodayString();
};

// Get end date based on period
export const getEndDate = (startDate, period) => {
  const start = new Date(startDate);
  const days = parseInt(period.replace('days', ''));
  const endDate = new Date(start);
  endDate.setDate(start.getDate() + days);
  return formatDate(endDate);
};

// Get current week number
export const getCurrentWeek = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now - start;
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.floor(diff / oneWeek) + 1;
};

// Get current month
export const getCurrentMonth = () => {
  return new Date().getMonth() + 1;
};

// Calculate days between two dates
export const daysBetween = (date1, date2) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);
  
  return Math.round(Math.abs((firstDate - secondDate) / oneDay));
};

// Calculate progress percentage based on date range
export const calculateDateProgress = (startDate, endDate, currentDate = new Date()) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const current = new Date(currentDate);
  
  const totalDays = daysBetween(start, end);
  const passedDays = daysBetween(start, current);
  
  if (passedDays <= 0) return 0;
  if (passedDays >= totalDays) return 100;
  
  return Math.round((passedDays / totalDays) * 100);
};