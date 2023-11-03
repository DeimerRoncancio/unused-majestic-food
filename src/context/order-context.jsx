"use client"

import { createContext } from 'react'

export const OrderContext = createContext();

export const OrderProvider = ({children})=> {
    const Deimer = "Deimer"
    
    return (
        <OrderContext.Provider value={Deimer}>
            {children}
        </OrderContext.Provider>
    )
}
