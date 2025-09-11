import { detectLanguage } from './languageDetection'

interface FetchOptions {
  url: string
  method?: string
  body?: object
}

export async function fetchData<T>({
  url,
  method = 'GET',
  body,
}: FetchOptions): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': detectLanguage(),
    },
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  const res = await fetch(url, options)

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`)
  }

  return res.json()
}
