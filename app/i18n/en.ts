import type { LanguageKey } from './keys'

export const en: Record<LanguageKey, string> = {
  // Error messages
  error_saving_preferences: 'Error saving preferences.',
  try_again: 'Try again',

  // Loading messages
  saving_preferences: 'Saving your preferences...',

  // Form actions
  submit: 'Submit',
  reset: 'Reset',

  // Results
  no_result_yet: 'No results yet',
  next_meal: 'Next Meal',

  // Title
  baby_diet_preferences: 'Baby Diet Preferences',

  // Slider labels
  arrow_symbol: '↔',

  // Settings modal
  settings: 'Settings',
  language: 'Language',
  play_sounds: 'Play sounds',
  apply: 'Apply',
  close: 'Close',

  // Meal library
  meal_library: 'Meal Library',
  no_meals_saved: 'No meals saved yet',
  saved_on: 'Saved on',
} as const

export type EnKeys = keyof typeof en
