export const periodOptions = [
  { value: '30days', label: '30일' },
  { value: '90days', label: '90일' },
  { value: '180days', label: '180일' },
  { value: '365days', label: '1년' },
  { value: '730days', label: '2년' },
  { value: '1095days', label: '3년' },
  { value: '1825days', label: '5년' },
  { value: '3650days', label: '10년' }
];

export const guideSteps = [
  {
    id: 'step1',
    title: '목표 설정 시작',
    description: '새로운 목표를 만들어보세요.',
    questions: [
      {
        id: 'goal_title',
        question: '어떤 목표를 달성하고 싶나요?',
        type: 'text',
        placeholder: '예: 건강한 생활 습관 만들기'
      },
      {
        id: 'goal_period',
        question: '언제까지 달성하고 싶나요?',
        type: 'select',
        options: periodOptions
      }
    ]
  },
  {
    id: 'step2',
    title: '중심 목표 설정',
    description: '만다라트의 중심이 될 핵심 목표를 정해보세요.',
    questions: [
      {
        id: 'center_goal',
        question: '가장 중요한 핵심 목표는 무엇인가요?',
        type: 'textarea',
        placeholder: '예: 매일 운동하기'
      }
    ]
  },
  {
    id: 'step3',
    title: '세부 목표 설정',
    description: '중심 목표를 달성하기 위한 8가지 세부 목표를 설정해보세요.',
    questions: [
      {
        id: 'sub_goals',
        question: '세부 목표들을 입력해주세요',
        type: 'multiple_text',
        count: 8,
        placeholder: '예: 주 3회 헬스장 가기'
      }
    ]
  }
];

export const viewTypes = {
  DASHBOARD: 'dashboard',
  CREATE_GOAL: 'create-goal',
  CALENDAR: 'calendar',
  DAILY_TASKS: 'daily-tasks',
  HIERARCHICAL_GOALS: 'hierarchical-goals',
  FILTERED_TASKS: 'filtered-tasks',
  GOAL_DETAIL: 'goal-detail'
};

export const goalLevels = {
  YEARLY: 'yearly',
  MONTHLY: 'monthly',
  WEEKLY: 'weekly',
  DAILY: 'daily'
};

export const editingTypes = {
  GOAL: 'goal',
  YEARLY: 'yearly',
  MONTHLY: 'monthly',
  WEEKLY: 'weekly',
  TASK: 'task'
};