import { ApiError } from '@/errors'

const fetchDelete = (url) => {
  return fetch(url, { method: 'DELETE' })
    .then(promise => {
      if (promise.statusText === 'Not Found') throw new ApiError('Source not found')
    })
}

export default fetchDelete
