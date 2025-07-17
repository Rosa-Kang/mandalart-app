export const periodOptions = [
  { value: '365days', label: '1년' },
  { value: '180days', label: '6개월' },
  { value: '90days', label: '3개월' },
  { value: '30days', label: '1개월' },
];

export const goalGuideQuestions = [
  { id: 'dream', text: '1년 후, 어떤 이상적인 모습을 꿈꾸시나요? 자유롭게 상상해보세요.', placeholder: '예: 더 건강해지고, 새로운 기술을 배우고, 의미 있는 관계를 맺고 싶어요.' },
  { id: 'coreValue', text: '그 모습에서 가장 중요하게 생각하는 가치는 무엇인가요? (예: 성장, 건강, 행복, 안정)', placeholder: '예: 성장' },
  { id: 'mainGoal', text: '가장 중요한 가치를 기반으로, 올해 달성하고 싶은 가장 큰 목표는 무엇인가요? 이것이 당신의 핵심 목표가 됩니다.', placeholder: '예: 꾸준한 학습으로 프론트엔드 개발 역량 강화하기' },
  { id: 'subGoal1', text: '핵심 목표를 달성하기 위해 어떤 구체적인 목표들을 세울 수 있을까요? 첫 번째 세부 목표를 알려주세요.', placeholder: '예: 매일 1시간씩 코딩 연습하기' },
  { id: 'subGoal2', text: '두 번째 세부 목표는 무엇인가요?', placeholder: '예: 매주 기술 블로그 아티클 1개 읽고 정리하기' },
  { id: 'subGoal3', text: '세 번째 세부 목표는 무엇인가요?', placeholder: '예: 분기별로 사이드 프로젝트 1개 완성하기' },
  { id: 'summary', text: '훌륭해요! 설정된 목표를 확인하고, 필요하다면 수정해주세요.' },
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