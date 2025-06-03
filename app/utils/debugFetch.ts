export async function debugFetch(input: RequestInfo | URL, init?: RequestInit | undefined, mockSuccess: boolean = true): Promise<Response> {
  if (import.meta.env.DEV) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockSuccess) {
          resolve(new Response(null, { status: 200, statusText: 'OK' }))
        }
        else {
          reject(new Error('Mocked server error'))
        }
      }, 1600)
    })
  }
  else {
    return fetch(input, init)
  }
}
