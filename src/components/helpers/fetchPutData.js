import { ApiError } from '@/errors'

const fetchPut = ({ url, body }) => {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(promise => {
      if (promise.statusText === 'Not Found') throw new ApiError('Source not found')
      return promise
    })
}

export default fetchPut
