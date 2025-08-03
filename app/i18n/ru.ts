import type { LanguageKey } from './keys'

export const ru: Record<LanguageKey, string> = {
  // Error messages
  error_saving_preferences: 'Ошибка сохранения предпочтений.',
  try_again: 'Попробовать снова',

  // Loading messages
  saving_preferences: 'Сохранение ваших предпочтений...',

  // Form actions
  submit: 'Отправить',
  reset: 'Сбросить',

  // Results
  no_results_yet: 'Пока нет результатов',
  next_meal: 'Следующий прием пищи',

  // Title
  baby_diet_preferences: 'питании малыша',

  // Slider labels
  arrow_symbol: '↔',
} as const

export type RuKeys = keyof typeof ru
