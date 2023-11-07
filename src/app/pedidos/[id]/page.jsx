"use client"

import { useState,useEffect } from 'react'
import { useFetchId } from '@/components/hooks/useFetchId'
import PlatePresentation from '@/components/plate-presentation'
import Button from '@/components/button'

export default function Pedidos({ params }) {
    const [showInfo,setShowInfo] = useState(true);
    const [showPopupCategories,setPopupCategories] = useState(false)
    const { data } = useFetchId(params.id)

    const item = localStorage.getItem("Order");
    const order = JSON.parse(item)
    const newItem = order;

    const closeOperation = ()=> {
        newItem.idOrder = ''
        localStorage.setItem("Order",JSON.stringify(newItem));
        setShowInfo(false)
    }

    const setPlate = async(evt,itemCategorie)=> {
        evt.preventDefault()

        newItem.categoria = itemCategorie
        
        try {
            await fetch("http://localhost:5000/platos", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(newItem)
            });
        } catch(err) {
            console.error(err);
        }

        setPopupCategories(false)
    }

    return (
        <>
            <div className="w-[110%] h-[550px] bg-[#76ed78] rounded-b-[50%] top-[-100px] left-[-5%] absolute z-0"></div>
            <div className="z-20 p-28 pt-14 relative">
                <div className='w-full flex flex-col items-center'>
                    <div className={`w-[$610px]`}>
                        <h2 className="text-2xl w-[610px]">{data.name}</h2>
                        <h3>Deimer Steven Roncancio</h3>
                        <div className={`flex w-full justify-center ${params.id === order.idOrder && showInfo  ? '' 
                        : 'hidden' } 
                        flex-col mt-10 `}>
                            <PlatePresentation />
                            <div className='flex justify-between mt-14'>
                                <button className="bg-[#3ea440] transition duration-[0.3s] hover:bg-[#348935] 
                                w-[45%] p-2 text-xl rounded-full shadow-[0_2px_4px_#a9a9a9] text-white"
                                onClick={()=> setPopupCategories(true)}>
                                    Añadir al pedido
                                </button>
                                <button className="bg-white transition duration-[0.3s] hover:bg-red-300 
                                w-[45%] p-2 text-xl rounded-full shadow-[0_2px_4px_#a9a9a9] text-black"
                                onClick={closeOperation}>
                                    Cancelar operación
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full pt-14">
                        <h2 className="text-xl">Detalles del pedido</h2>
                        
                    </div>
                </div>
            </div>
            <div className={`fixed top-0 lef-0 w-full h-full ${showPopupCategories ? '' : 'hidden'} flex 
            justify-center items-center backdrop-blur-[2px] transition z-50`}>
                <button
                className="z-50 absolute top-0 right-0 m-10 p-4 bg-red-600 text-white rounded-xl"
                onClick={() => setPopupCategories(false)}>
                    X
                </button>

                <button
                className="z-50 w-52 h-52 p-2 m-10 bg-white shadow-[0_0_20px_#a9a9a9] rounded-2xl hover:scale-105 
                transition" onClick={(evt)=> setPlate(evt,"Plato principal")}>
                    Plato principal
                </button>

                <button
                className="z-50 w-52 h-52 p-2 m-10 bg-white shadow-[0_0_20px_#a9a9a9] rounded-2xl hover:scale-105 
                transition" onClick={(evt)=> setPlate(evt,"Plato secundario")}>
                    Plato secundario
                </button>

                <button
                className="z-50 w-52 h-52 p-2 m-10 bg-white shadow-[0_0_20px_#a9a9a9] rounded-2xl hover:scale-105 
                transition" onClick={(evt)=> setPlate(evt,"Bebida")}>
                    Bebida
                </button>

                <button
                className="z-50 w-52 h-52 p-2 m-10 bg-white shadow-[0_0_20px_#a9a9a9] rounded-2xl hover:scale-105 
                transition" onClick={(evt)=> setPlate(evt,"Postre")}>
                    Postre
                </button>

                <div className="w-full h-full absolute z-0" onClick={()=> setPopupCategories(false)}></div>
            </div>
        </>
    )
}
