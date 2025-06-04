export interface PostPreferencesResponse {
  title: string
  image: string
}

export interface GetPreferencesResponse {
  key: string
  label: string
  min: number
  max: number
  value: number
}
