"use client"

import { useState,useEffect } from 'react'

export const useFetchId = (id) => {
    const [data,setData] = useState({})   
    
    const getData = async()=> {
        try {
            const response = await fetch(`http://localhost:5000/pedidos/${id}`).then(res => res.json())
            setData(response);
        } catch (err) {
            console.error(err);
        }
    }
    
    useEffect(()=> {
        getData()
    },[id])

    return {
        data
    }
}
