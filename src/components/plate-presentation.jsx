"use client"

import { OrderContext } from '@/context/order-context'
import { useContext } from 'react'

export default function PlatePresentation() {
    const order = useContext(OrderContext);
    
    return(
        <h1>Hola {order}</h1>
    )
}
