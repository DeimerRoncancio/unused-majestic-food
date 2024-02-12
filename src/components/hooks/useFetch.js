'use client'

import { useState, useEffect } from 'react'

import fetchData from '@/components/helpers/fetchData'

export const useFetch = (url) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    fetchData({ url })
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => setError(err))
      .finally(() => setIsLoading(false))
  }, [])

  return { data, isLoading, error }
}
