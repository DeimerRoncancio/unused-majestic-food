import { ApiError } from '@/errors'

const fetchData = ({ url }) => {
  return fetch(url)
    .then(promise => {
      if (promise.statusText === 'Not Found') throw new ApiError('Source not found')
      return promise
    })
}

export default fetchData
