export type PostPreferencesResponse = {
  title: string
  mealLayers: string[]
  ingredients: string[]
}

export type GetPreferencesResponse = {
  type: string
  key: string
  labelStart: string
  iconStart: string
  labelEnd: string
  iconEnd: string
  value: number
  min: number
  max: number
} | {
  type: string
  key: string
  label: string
  icon: string
  value: number
}
