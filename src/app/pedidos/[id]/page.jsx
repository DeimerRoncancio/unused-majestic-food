"use client"

import { useState,useEffect } from 'react'
import { useFetchId } from '@/components/hooks/useFetchId'
import { AiOutlinePlus } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import PlatePresentation from '@/components/plate-presentation'
import Plate from '@/components/plate'

export default function Pedidos({ params }) {
    const [showInfo,setShowInfo] = useState(true);
    const [showPopupCategories,setPopupCategories] = useState(false)
    const [allPlates,setAllPlates] = useState([])
    const { data } = useFetchId(params.id)

    const router = useRouter()

    const item = localStorage.getItem("Order");
    const order = JSON.parse(item)
    const newItem = order;
    
    // console.log(newItem.category[0])

    const closeOperation = ()=> {
        newItem.idOrder = ''
        localStorage.setItem("Order",JSON.stringify(newItem));
        setShowInfo(false)
    }

    const setPlate = async(evt,itemCategory)=> {
        evt.preventDefault()

        newItem.categoria = itemCategory

        try {
            const response = await fetch("http://localhost:5000/platos", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(newItem)
            }).then(res => res.json());
            console.log(response)
            setAllPlates([...allPlates,response]);
        } catch(err) {
            console.error(err);
        }

        setPopupCategories(false)
        closeOperation()
    }

    const getPlates = async()=> {
        try {
            const response = await fetch('http://localhost:5000/platos').then(res => res.json());
            const arrayElements = response.filter(item => item.idOrder === params.id)
            arrayElements.sort((a,b)=>{
                if(a.categoria === 'Plato principal') {
                    return -1
                }
                if(b.categoria === 'Plato secundario') {
                    return 0
                }
                if(a.categoria === 'Postre') {
                    return 1
                }
            })
            setAllPlates(arrayElements)
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(()=> {
        getPlates()
    },[])

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
                    <div className="flex w-full pt-14 flex-col">
                        <h2 className="text-xl">Detalles del pedido</h2>
                        <div className="grid grid-cols-3 gap-14 mt-9">
                            {
                                allPlates.map((item) => (
                                    <Plate 
                                        nombre={item.nombre} 
                                        precio={item.price} 
                                        categoria={item.categoria}
                                        imagen={item.imagen}
                                    />
                                ))
                            }
                            <button className="flex p-4 bg-white shadow-[0_0_10px_#a9a9a9] rounded-xl"
                            onClick={()=> {
                                router.push('/tienda')
                            }}>
                                <div className="flex w-[40%] flex-col justify-between">
                                    <h3>Añadir Articulo</h3>
                                </div>
                                <div className='flex w-[60%] h-[120px] relative justify-center'>
                                    <AiOutlinePlus className='w-full h-full text-[#a3a3a3]' />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`fixed top-0 lef-0 w-full h-full ${showPopupCategories ? '' : 'hidden'} flex
            justify-center items-center backdrop-blur-[2px] transition z-50`}>
                <button className="z-50 absolute top-0 right-0 m-10 p-4 bg-red-600 text-white rounded-xl"
                onClick={() => setPopupCategories(false)}>
                    X
                </button>

                <button className={`z-50 w-52 h-52 p-2 m-10 bg-white shadow-[0_0_20px_#a9a9a9] rounded-2xl hover:scale-105
                transition`} onClick={(evt)=> setPlate(evt,"Plato principal")}>
                    Plato principal
                </button>

                <button className={`z-50 w-52 h-52 p-2 m-10 bg-white shadow-[0_0_20px_#a9a9a9] rounded-2xl hover:scale-105
                transition`} onClick={(evt)=> setPlate(evt,"Plato secundario")}>
                    Plato secundario
                </button>

                <button className={`z-50 w-52 h-52 p-2 m-10 bg-white shadow-[0_0_20px_#a9a9a9] rounded-2xl hover:scale-105
                transition`} onClick={(evt)=> setPlate(evt,"Bebida")}>
                    Bebida
                </button>

                <button className={`z-50 w-52 h-52 p-2 m-10 bg-white shadow-[0_0_20px_#a9a9a9] rounded-2xl hover:scale-105
                transition`} onClick={(evt)=> setPlate(evt,"Postre")}>
                    Postre
                </button>

                <div className="w-full h-full absolute z-0" onClick={()=> setPopupCategories(false)}></div>
            </div>
        </>
    )
}
