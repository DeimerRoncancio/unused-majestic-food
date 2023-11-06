"use client"

import { useState,useEffect } from 'react'
import { useFetchId } from '@/components/hooks/useFetchId'
import PlatePresentation from '@/components/plate-presentation'

export default function Pedidos({ params }) {
    const [showInfo,setShowInfo] = useState(true);
    const { data } = useFetchId(params.id)

    const item = localStorage.getItem("Order");
    const order = JSON.parse(item)

    const closeOperation = ()=> {
        const newItem = JSON.parse(item);
        newItem.idOrder = ''
        localStorage.setItem("Order",JSON.stringify(newItem));
        setShowInfo(false)
    }
    
    return (
        <>
            <div className="w-[110%] h-[90%] bg-[#76ed78] rounded-b-[50%] top-[-100px] left-[-5%] absolute z-0"></div>
            <div className="z-20 p-28 pt-14">
                <div className='w-full flex justify-center'>
                    <div className='w-[610px]'>
                        <h2 className="text-2xl w-[610px]">{data.name}</h2>
                        <h3>Deimer Steven Roncancio</h3>
                        <div className={`flex w-full justify-center ${params.id === order.idOrder && showInfo  ? '' : 'hidden' } 
                        flex-col mt-10 `}>
                            <PlatePresentation />
                            <div className='flex justify-between mt-14'>
                                <button className="bg-[#3ea440] transition duration-[0.2s] hover:bg-[#1f9222] 
                                w-[45%] p-2 text-xl rounded-full shadow-[0_2px_4px_#a9a9a9] text-white">
                                    Añadir al pedido
                                </button>
                                <button className="bg-white transition duration-[0.3s] hover:bg-red-500 w-[45%] 
                                p-2 text-xl rounded-full shadow-[0_3px_4px_#a9a9a9]" onClick={closeOperation}>
                                    Cancelar operación
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
