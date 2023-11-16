"use client"

import { useState,useEffect } from 'react'

export const useFetchId = (url,id) => {
    const [dataId,setData] = useState({})   
    const [isLoadingId,setIsLoading] = useState(true)
    const [errorId,setError] = useState(true)
    
    const getData = async()=> {
        try {
            const response = await fetch(`${url}/${id}`).then(res => res.json())
            setData(response)
            setIsLoading(false)
        } catch (err) {
            setError(false)
        }
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
