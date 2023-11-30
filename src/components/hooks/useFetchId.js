"use client"

import { useState,useEffect } from 'react'
import fetchDataId from '@/components/helpers/fetchDataId'

export const useFetchId = (url,id) => {
    const [dataId,setData] = useState({})   
    const [isLoadingId,setIsLoading] = useState(true)
    const [errorId,setError] = useState(false)

    const getData = async()=> {
        const { data,isLoading,error } = await fetchDataId(url,id)
        setData(data)
        setIsLoading(isLoading)
        setError(error)
    }

    useEffect(()=> {
        getData()
    },[id])

    return {
        dataId,
        isLoadingId,
        errorId
    }
}
