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
    },
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  const res = await fetch(`http://localhost:3001${url}`, options)

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`)
  }

  return res.json()
}
