export type DietPreferenceTypeRange = {
  type: 'range'
  key: string
  labelStart: string
  labelEnd: string
  iconStart: string
  iconEnd: string
  value: number
  min: number
  max: number
}

export type DietPreferenceTypeBoolean = {
  type: 'boolean'
  key: string
  label: string
  icon: string
  value: number
}

export type DietPreference =
  DietPreferenceTypeRange |
  DietPreferenceTypeBoolean

export type DietPreferencesByType = {
  range: DietPreferenceTypeRange[]
  boolean: DietPreferenceTypeBoolean[]
}

export type DietMeal = {
  id: string
  dateSaved: string
  name: string
  ingredients: string[]
  image: string
}
