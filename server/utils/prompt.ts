export interface Preferences {
  [key: string]: number
}

const buildPreference = (key: string, level: number): string => {
  return `${key} preference level ${level}`
}

const buildPreferencesString = (preferences: Preferences): string => {
  return Object.entries(preferences)
    .map(([key, level]) => buildPreference(key, level))
    .join(', ')
}

const buildRulesString = (): string => {
  return `Preference level is 1 to 5. Meal name must be suitable for toddlers. Meal name is creative and fun and a maximum of 5 words.`
}

const buildLanguageString = (language: string): string => {
  return `Return meal name in language code: ${language}`
}

export const buildPrompt = (preferences: Preferences, language: string): string => {
  const languageString = buildLanguageString(language)
  const rulesString = buildRulesString()
  const preferencesString = buildPreferencesString(preferences)

  return `Generate a meal name on the following preferences (${rulesString}): ${preferencesString}. ${languageString}.`
}
