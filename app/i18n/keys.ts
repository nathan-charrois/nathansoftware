export const LANGUAGE_KEYS = [
  // Error messages
  'error_saving_preferences',
  'try_again',

  // Loading messages
  'saving_preferences',

  // Form actions
  'submit',
  'reset',

  // Results
  'no_results_yet',
  'next_meal',

  // Title
  'baby_diet_preferences',

  // Slider labels
  'arrow_symbol',
] as const

export type LanguageKey = typeof LANGUAGE_KEYS[number]
