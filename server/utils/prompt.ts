export interface Preferences {
  [key: string]: number
}

/**
 * Build a single preference string in the format "key preference level value"
 *
 * @param key preference category (e.g., "texture", "temperature")
 * @param level preference level (1-5)
 * @returns formatted preference string
 */
const buildPreference = (key: string, level: number): string => {
  return `${key} preference level ${level}`
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
 * Build the title rules string that defines constraints for meal title
 *
 * @returns string containing generation rules and constraints
 */
const buildTitleRulesString = (): string => {
  return `Preference level is 1 to 5. Meal title must be suitable for toddlers. Meal title is creative and fun and a maximum of 5 words.`
}

/**
 * Build the ingredient rules string that defines constraints for meal ingredients
 *
 * @returns string containing generation rules and constraints
 */
const buildIngredientRulesString = (): string => {
  return `Meal ingredients must basic. Meal ingredients should not be creative.`
}

/**
 * Build the language string for the prompt
 *
 * @param language language code string
 * @returns language string
 */
const buildLanguageString = (language: string): string => {
  return `Return meal title in language code: ${language}`
}

/**
 * Build the complete prompt for meal generation
 *
 * Prompt structure:
 * "Generate a meal title and ingredients based on the following preferences ($titleRules. $ingredientRules): $preferences. $language."
 *
 * Example output:
 * "Generate a meal title and ingredients list based on the following preferences (Preference level is 1 to 5. Meal title must be suitable for toddlers. Meal title is creative and fun and a maximum of 5 words. Meal ingredients must be basic. Meal ingredients should not be creative.): texture preference level 3, temperature preference level 4. Return meal title in language code: en."
 *
 * @param preferences key-pair of submitted preferences
 * @param language language code string
 * @returns complete formatted prompt for meal generation
 */
export const buildPrompt = (preferences: Preferences, language: string): string => {
  const languageString = buildLanguageString(language)
  const titleRulesString = buildTitleRulesString()
  const ingredientRulesString = buildIngredientRulesString()
  const preferencesString = buildPreferencesString(preferences)

  return `Generate a meal title and ingredients based on the following preferences (${titleRulesString} ${ingredientRulesString}): ${preferencesString}. ${languageString}.`
}
