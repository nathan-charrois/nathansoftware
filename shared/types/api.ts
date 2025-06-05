export type PostPreferencesResponse = {
  title: string
  image: string
}

export type GetPreferencesResponse = {
  type: string
  key: string
  label: string
  value: number
  min: number
  max: number
} | {
  type: string
  key: string
  label: string
  value: number
}
