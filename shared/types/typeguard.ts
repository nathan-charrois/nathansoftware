import type { PostPreferencesResponse } from './api'
import type {
  DietPreference,
  DietPreferenceTypeBoolean,
  DietPreferenceTypeRange,
} from './context'

export const isDietPreferenceTypeRange = (
  preference: DietPreference,
): preference is DietPreferenceTypeRange => {
  return preference.type === 'range'
}

export const isDietPreferenceTypeBoolean = (
  preference: DietPreference,
): preference is DietPreferenceTypeBoolean => {
  return preference.type === 'boolean'
}

export const isDietPreferenceResponse = (
  response: unknown,
): response is PostPreferencesResponse => {
  return typeof response === 'object' && response !== null && 'title' in response
}
