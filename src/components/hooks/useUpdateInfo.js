import fetchPut from '@/components/helpers/fetchPutData'
import fetchDataId from '@/components/helpers/fetchDataId'
import getDate from '@/components/helpers/getDate'

import { ApiError } from '@/errors'

export function useUpdateInfo ({ url, id, urlPut }) {
  const updateData = async (evt) => {
    evt.preventDefault()

    try {
      const dataId = await fetchDataId({ url, id }).then(res => res.json())

      if (evt.target[0].type === 'text' || evt.target[0].type === 'textarea') {
        const newData = evt.target[0].value
        dataId[evt.target[0].name] = newData
      } else {
        const newData = getDate(evt.target[0].value)
        dataId[evt.target[0].name] = newData
      }

      await fetchPut({ urlPut, dataId })
    } catch (err) {
      if (err instanceof ApiError) console.log('Hubo un error, no se encontro el recurso.')
    }
  }

  return {
    updateData
  }
}
