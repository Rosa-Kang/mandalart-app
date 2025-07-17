import {
  ChartBarIcon,
  TargetIcon,
  CalendarIcon,
  CheckSquareIcon
} from '@phosphor-icons/react';

const BottomNavBar = ({ currentView, setCurrentView }) => {
  const navItems = [
    { view: 'dashboard', icon: ChartBarIcon, label: '대시보드' },
    { view: 'create-goal', icon: TargetIcon, label: '목표설정' },
    { view: 'hierarchical-goals', icon: CalendarIcon, label: '계층목표' },
    { view: 'daily-tasks', icon: CheckSquareIcon, label: '할일' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg flex justify-around p-2 z-10 max-w-md mx-auto">
      {navItems.map(({ view, icon: Icon, label }) => (
        <button
          key={view}
          onClick={() => setCurrentView(view)}
          className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors w-24 ${
            currentView === view ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          <Icon size={24} weight={currentView === view ? 'fill' : 'regular'} />
          <span className="text-xs mt-1 font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNavBar;
