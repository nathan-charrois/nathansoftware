export type DietPreferenceTypeRange = {
  type: 'range'
  key: string
  label: string
  value: number
  min: number
  max: number
}

export type DietPreferenceTypeBoolean = {
  type: 'boolean'
  key: string
  label: string
  value: number
}

export type DietPreference =
  DietPreferenceTypeRange |
  DietPreferenceTypeBoolean

export type DietPreferencesByType = {
  range: DietPreferenceTypeRange[]
  boolean: DietPreferenceTypeBoolean[]
}
