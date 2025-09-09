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
 * @param theme currently selected theme
 * @returns complete formatted prompt for meal generation
 */
export const buildMealPrompt = (preferences: Preferences, languageString: string, theme: string): string => {
  if (theme === 'baby') {
    return buildMealPromptForBaby(preferences, languageString)
  }

  return buildMealPromptForMommy(preferences, languageString)
}

/**
 * Build meal prompt for baby
 *
 * @param preferences key-pair of submitted preferences
 * @param languageString language code string
 * @returns complete formatted prompt for meal generation
 */
export const buildMealPromptForBaby = (preferences: Preferences, languageString: string): string => {
  const preferencesString = buildPreferencesString(preferences)

  return `
    You are a creative chef specializing in fun and unique meals for toddlers.

    Rules:
    - Meal title is a maximum of 8 words.
    - Meal title should not include words from the preferences.
    - Ingredients should be healthy and suitable for toddlers.
    - Language code is provided for localization.

    Banned Food:
    - Pancakes

    Banned Ingredients:
    - Honey
    - Pepper

    Preferences:
    ${preferencesString}

    Language Code:
    ${languageString}
  `
}

/**
 * Build meal prompt for mommy
 *
 * @param preferences key-pair of submitted preferences
 * @param languageString language code string
 * @returns complete formatted prompt for meal generation
 */
export const buildMealPromptForMommy = (preferences: Preferences, languageString: string): string => {
  const preferencesString = buildPreferencesString(preferences)

  return `
    You are a creative chef specializing in safe and healthy meals for pregnant women.

    Rules:
    - Meal title is a maximum of 8 words.
    - Meal title should not include words from the preferences.
    - Ingredients should be healthy and safe for pregnant women.
    - Language code is provided for localization.

    Preferences:
    ${preferencesString}

    Language Code:
    ${languageString}
  `
}

/**
 * Build the prompt for meal image generation
 *
 * @param title generated meal title
 * @param ingredients generated meal ingredients
 * @param theme currently selected theme
 * @returns complete formatted prompt for meal image generation
 */
export const buildImagePrompt = (title: string, ingredients: string[], theme: string): string => {
  if (theme === 'baby') {
    return buildImagePromptForBaby(title, ingredients)
  }

  return buildImagePromptForMommy(title, ingredients)
}

/**
 * Build meal image prompt for baby
 *
 * @param title generated meal title
 * @param ingredients generated meal ingredients
 * @returns complete formatted prompt for meal image generation
 */
export const buildImagePromptForBaby = (title: string, ingredients: string[]): string => {
  return `
    Generate a cartoon-style image of a meal for toddlers.

    Rules:
    - Image must have a transparent background.
    - Meal must be served on a plate, leaf, bowl, or in a cup.
    - Do not include text.
    - Include colourful elements.

    Meal Title:
    ${title}

    Ingredients:
    ${ingredients.join(', ')}
  `
}

/**
 * Build meal image prompt for mommy
 *
 * @param title generated meal title
 * @param ingredients generated meal ingredients
 * @returns complete formatted prompt for meal image generation
 */
export const buildImagePromptForMommy = (title: string, ingredients: string[]): string => {
  return `
    Generate a cartoon-style image of a meal for pregnant women.

    Rules:
    - Image must have a transparent background.
    - Meal must be served on a plate, leaf, bowl, or in a cup.
    - Do not include text.
    - Include purple coloured elements.

    Meal Title:
    ${title}

    Ingredients:
    ${ingredients.join(', ')}
  `
}
