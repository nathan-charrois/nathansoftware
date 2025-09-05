export interface Preferences {
  [key: string]: number
}

/**
 * Build a single preference string based on key and level
 *
 * @param key preference range (e.g., "hot-cold")
 * @param level preference level (0-20)
 * @returns formatted preference string
 */
const buildPreference = (key: string, level: number): string => {
  const isPreferenceTypeRange = key.includes('-')

  if (isPreferenceTypeRange) {
    return buildRangePreference(key, level)
  }
  else {
    return buildBooleanPreference(key, level)
  }
}

/**
 * Build a preference string for range type preferences
 *
 * @param key preference range (e.g., "hot-cold")
 * @param level preference level (0-20)
 * @returns formatted preference string
 */
const buildRangePreference = (key: string, level: number): string => {
  let descriptor = ''
  let strength = 0

  if (level <= 10) {
    descriptor = key.split('-')[0]
    strength = 10 - level
  }
  else {
    descriptor = key.split('-')[1]
    strength = level - 10
  }

  return `${descriptor} preference level ${strength}/10`
}

/**
 * Build a preference string for boolean type preferences
 *
 * @param key preference range (e.g., "veggie_boost")
 * @param level preference level (0-20)
 * @returns formatted preference string
 */
const buildBooleanPreference = (key: string, level: number): string => {
  const parsedKey = key.replaceAll('_', ' ')

  if (level) {
    return `preference is ${parsedKey}`
  }
  else {
    return `preference is NOT ${parsedKey}`
  }
}

/**
 * Convert preferences object to a comma-separated string of all preferences
 *
 * @param preferences object containing preference categories and their levels
 * @returns comma-separated string of all preferences
 */
const buildPreferencesString = (preferences: Preferences): string => {
  return Object.entries(preferences)
    .map(([key, level]) => buildPreference(key, level))
    .join(', ')
}

/**
 * Build the complete prompt for meal generation
 *
 * @param preferences key-pair of submitted preferences
 * @param languageString language code string
 * @returns complete formatted prompt for meal generation
 */
export const buildPrompt = (preferences: Preferences, languageString: string): string => {
  const preferencesString = buildPreferencesString(preferences)

  return `
    You are a creative chef specializing in fun and unique meals for toddlers.

    Rules:
    - Meal title is a maximum of 6 words.
    - Meal title should not include words from the preferences.
    - Ingredient list should be common, healthy items suitable for toddlers.
    - Language code is provided for localization.

    Preferences:
    ${preferencesString}

    Language Code:
    ${languageString}
  `
}
