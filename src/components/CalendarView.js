import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';

const CalendarView = ({
  setCurrentView, selectedGoal, selectedDate, setSelectedDate,
  getDaysInMonth, getFirstDayOfMonth, getDayProgress,
}) => {
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  const daysInMonth = getDaysInMonth(selectedDate);
  const firstDay = getFirstDayOfMonth(selectedDate);

  const days = [];
  // Add empty cells before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  // Month navigation function
  const navigateMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(currentMonth + direction);
    setSelectedDate(newDate);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          {selectedGoal ? selectedGoal.title : '캘린더'}
        </h1>
        <button onClick={() => setCurrentView('dashboard')} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      {/* Goal information */}
      {selectedGoal && (
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 rounded-xl shadow-lg">
          <h3 className="font-semibold mb-2">{selectedGoal.centerGoal}</h3>
          <div className="flex justify-between text-sm opacity-90">
            <span>시작일: {selectedGoal.createdDate}</span>
            <span>목표일: {selectedGoal.endDate}</span>
          </div>
        </div>
      )}

      {/* Month navigation */}
      <div className="flex justify-between items-center">
        <button onClick={() => navigateMonth(-1)} className="p-2 hover:bg-gray-100 rounded">
          <CaretLeftIcon size={20} />
        </button>
        <h2 className="text-lg font-semibold">
          {currentYear}년 {currentMonth + 1}월
        </h2>
        <button onClick={() => navigateMonth(1)} className="p-2 hover:bg-gray-100 rounded">
          <CaretRightIcon size={20} />
        </button>
      </div>

      {/* Calendar grid */}
      <div className="bg-white rounded-xl p-4 shadow-md">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['일', '월', '화', '수', '목', '금', '토'].map(day => (
            <div key={day} className="text-center text-sm font-semibold text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>
        {/* Calendar dates */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            if (day === null) {
              return <div key={index} className="aspect-square"></div>;
            }
            const dayDate = new Date(currentYear, currentMonth, day);
            const progress = selectedGoal ? getDayProgress(dayDate, selectedGoal) : 0;
            const isToday = dayDate.toDateString() === new Date().toDateString();

            return (
              <div
                key={day}
                className={`aspect-square flex flex-col items-center justify-center text-sm border rounded-lg cursor-pointer
                  ${isToday ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`
                }
              >
                <span className={`font-medium ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
                  {day}
                </span>
                {progress > 0 && (
                  <div className="w-4/5 h-1 mt-1 bg-gray-200 rounded-full">
                    <div
                      className="bg-green-500 h-full rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress legend */}
      <div className="bg-white rounded-xl p-4 shadow-md">
        <h3 className="font-semibold mb-3">진행 범례</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">완료된 할일</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
            <span className="text-sm text-gray-700">미완료 할일</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;