"use client"

import { useState,useEffect } from 'react'

export const useFetch = (url) => {
    const [data,setData] = useState([])   
    const [isLoading,setIsLoading] = useState(true)
    const [error,setError] = useState(true)
    
    const getData = async()=> {
        try {
            const response = await fetch(`${url}`).then(res => res.json());
            setData(response)
            setIsLoading(false)
        } catch(err) {
            setError(false)
        }
    }

    useEffect(()=> {
        getData()
    },[url])

    return {
        data,
        isLoading,
        error
    }
}
