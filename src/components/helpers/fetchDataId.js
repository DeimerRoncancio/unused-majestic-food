import { ApiError } from '@/errors'

const fetchDataId = ({ url, id }) => {
  return fetch(`${url}/${id}`)
    .then(promise => {
      if (promise.statusText === 'Not Found') throw new ApiError('Source not found')
      return promise
    })
}

export default fetchDataId
