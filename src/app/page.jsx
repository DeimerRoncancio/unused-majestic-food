"use client";

import { useState,useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BsSearch } from "react-icons/bs"
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import CardOrder from '@/components/card-order'
import FormPedidos from '@/components/form-pedidos'
import FetchTesting from '../components/fetch-testing'

import './styles/main-page.css'

export default function Home() {
    const [showPopup, setShowPopup] = useState(false);
    const [showNewOrder,setShowNewOrder] = useState(false);
    const [showAllOrders,setAllOrders] = useState(false);
    const [allOrders,setOrders] = useState([])

    const { data:session,status } = useSession();
    // console.log(session)

    const ifShowPopup = (validation) => {
        setShowPopup(validation);
    }

    const getOrders = async ()=> {
        try {
            const response = await fetch('http://localhost:5000/pedidos').then(res => res.json())
            setOrders(response)
        } catch(err) {
            console.error(err)
        }
    }

    const sendInOrder = (id)=> {
        const item = localStorage.getItem("Order")
        const data = JSON.parse(item)
        data.idOrder = id
        localStorage.setItem('Order',JSON.stringify(data))
    }
    
    useEffect(()=> {
        getOrders()
    },[])

    return (
        <>
            <div className='m-28'>
                <h1 className='text-3xl'>¡Bienvenido de nuevo!</h1>
                <h2>Señor {session?.user.name} {session?.user.lastName}</h2>
            </div>

            <div className="input-container px-6 py-2 mx-60 flex items-center rounded-full ">
                <span className="search-icon"><BsSearch /></span>
                <input className="w-full ml-6 outline-none bg-transparent" placeholder="Buscar"></input>
            </div>

            <section className="order-section m-28 flex flex-wrap">
                <CardOrder 
                    name="Hamburguesa clasica" 
                    image={"burguer.png"}
                    qualification={4.2} 
                    validate={ifShowPopup} 
                    price={"40.000"}
                    />
                <CardOrder 
                    name="Empanada" 
                    image={"empanadas.webp"}
                    qualification={3.2} 
                    validate={ifShowPopup} 
                    price={"39.000"}
                />
            </section>

            <div className={`fixed top-0 lef-0 w-full h-full ${showPopup ? '' : 'hidden'} flex justify-center 
            items-center backdrop-blur-[2px] transition z-50`}>
                <button
                className="z-50 absolute top-0 right-0 m-10 p-4 bg-red-600 text-white rounded-xl"
                onClick={() => setShowPopup(false)}>
                    X
                </button>

                <button className="z-50 w-52 h-52 p-2 m-10 bg-white shadow-[0_0_20px_#a9a9a9] rounded-2xl 
                hover:scale-105 transition" 
                onClick={()=> {
                    setShowPopup(false)
                    setShowNewOrder(true)
                }}>
                    Añadir en nuevo pedido
                </button>

                <button className="z-50 w-52 h-52 p-2 m-10 bg-white shadow-[0_0_20px_#a9a9a9] rounded-2xl 
                hover:scale-105 transition" 
                onClick={()=> {
                    setShowPopup(false)
                    setAllOrders(true)
                }}>
                    Añadir a pedido existente
                </button>

                <div className="w-full h-full absolute z-0" onClick={()=> setShowPopup(false)}></div>
            </div>

            <div className={`fixed flex top-0 left-0 w-full h-full ${showNewOrder ? '' : 'hidden'} 
            backdrop-blur-[2px] justify-center items-center z-50`}>
                <div className="z-50 bg-white shadow-[0_0_20px_#a9a9a9] w-[650px] h-[500px] rounded-2xl flex 
                flex-col justify-center items-center">
                    <button
                    className="absolute top-0 right-0 m-10 p-4 bg-red-600 text-white rounded-xl"
                    onClick={() => setShowNewOrder(false)}>
                        X
                    </button>
                    <FormPedidos />
                </div>

                <div className="w-full h-full absolute z-0" onClick={()=> setShowNewOrder(false)}></div>
            </div>

            <div className={`fixed flex top-0 left-0 w-full h-full ${showAllOrders ? '' : 'hidden'} 
            backdrop-blur-[2px] justify-center items-center z-50`}>
                <div className="z-50 bg-white shadow-[0_0_20px_#a9a9a9] w-[650px] h-[500px] rounded-2xl flex 
                flex-col justify-center items-center">
                    <button
                    className="absolute top-0 right-0 m-10 p-4 bg-red-600 text-white rounded-xl"
                    onClick={() => setAllOrders(false)}>
                        X
                    </button>
                    <ul>
                        {
                            allOrders.map((item)=> (
                                <li>
                                    <button onClick={()=>sendInOrder(item.id)}>
                                        <Link href={`pedidos/${item.id}`}>
                                            {item.name}
                                        </Link>
                                    </button>
                                </li> 
                            ))
                        }
                    </ul>
                </div>

                <div className="w-full h-full absolute z-0" onClick={()=> setAllOrders(false)}></div>
            </div>
        </>
    );
}
