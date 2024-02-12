import { ApiError } from '@/errors'

const fetchPost = ({ url, body }) => {
  return fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body)
  }).then(promise => {
    if (promise.statusText === 'Not Found') throw new ApiError('Source not found.')
    return promise
  })
}

export default fetchPost
