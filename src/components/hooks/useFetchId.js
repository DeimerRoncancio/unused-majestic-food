'use client'

import { useState, useEffect } from 'react'

import fetchDataId from '@/components/helpers/fetchDataId'

export const useFetchId = (url, id) => {
  const [dataId, setData] = useState({})
  const [isLoadingId, setIsLoading] = useState(true)
  const [errorId, setError] = useState(null)

  useEffect(() => {
    setIsLoading(true)

    fetchDataId({ url, id })
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => setError(err))
      .finally(() => setIsLoading(false))
  }, [])

  return { dataId, isLoadingId, errorId }
}
