"use client"

import { useEffect,useState } from 'react'
import { useSession } from 'next-auth/react'

export default function UserOrders() {
    const [res,setRes] = useState([])
    const { data:session,status } = useSession()

    const getData = async () => {
        try {
            const response = await fetch('http://localhost:5000/pedidos').then(res => res.json())
            const orders = response.filter(item => item.idUser === session?.user.id)
            setRes(orders)
        } catch (err) {
            console.error(err)
        }
    }
    
    useEffect(()=> {
        getData()
    },[session])

    return (
        <>
            {
                res.map(item => <h2>{item.name}</h2>)
            }
        </>
    )
}