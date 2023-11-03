"use client"

import { createContext } from 'react'

export const OrderContext = createContext();

export const OrderProvider = ({children})=> {
    const order = {
        name: "Hamburguesa clasica",
        image: "empanadas.webp",
        qualification: 4.2,
        price: "4.200"
    }
    
    return (
        <OrderContext.Provider value={order}>
            {children}
        </OrderContext.Provider>
    )
}
