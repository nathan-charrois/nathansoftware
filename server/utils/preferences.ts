export interface Preferences {
  [key: string]: number
}

const buildPreference = (key: string, level: number): string => {
  return `${key} preference level ${level}`
}

export const buildPreferencesString = (preferences: Preferences): string => {
  return Object.entries(preferences)
    .map(([key, level]) => buildPreference(key, level))
    .join(', ')
}

export const buildPrompt = (preferences: Preferences): string => {
  const preferencesStr = buildPreferencesString(preferences)
  return `Generate a meal based on the following preferences: ${preferencesStr}.`
}
