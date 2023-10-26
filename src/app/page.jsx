"use client"

import CardOrder from '@/components/card-order'
import FetchPedidos from '@/components/form-pedidos'

import { useState } from 'react'

import { BsSearch } from "react-icons/bs"

import './styles/main-page.css'
import FetchTesting from '@/components/fetch-testing'

export default function Home() {
    const [showPopup, setShowPopup] = useState(false);
    const [showNewOrder,setShowNewOrder] = useState(false);

    const ifShowPopup = (validation) => {
        setShowPopup(validation);
    }

    return (
        <main className="flex min-h-screen flex-col">
            <div className='m-28'>
                <h1 className='text-3xl'>¡Bienvenido de nuevo!</h1>
                <h2>Señor Deimer Roncancio</h2>
            </div>

            <div className="input-container px-6 py-2 mx-60 flex items-center rounded-full ">
                <span className="search-icon"><BsSearch /></span>
                <input className="w-full ml-6 outline-none bg-transparent" placeholder="Buscar"></input>
            </div>

            <section className="order-section m-28 flex flex-wrap">
                <CardOrder validate={ifShowPopup} />
                <CardOrder validate={ifShowPopup} />
            </section>

            <div
            className={`
            fixed top-0 lef-0 w-full h-full
            ${showPopup ? '' : 'hidden'} 
            flex justify-center items-center backdrop-blur-[2px] transition`}>
                <button
                className="absolute top-0 right-0 m-10 p-4 bg-red-600 text-white rounded-xl"
                onClick={() => setShowPopup(false)}>
                    X
                </button>

                <button
                className="w-52 h-52 p-2 m-10 bg-white shadow-[0_0_20px_#a9a9a9] rounded-2xl hover:scale-105 transition"
                onClick={()=> {
                    setShowPopup(false)
                    setShowNewOrder(true)
                }}>
                    Añadir en nuevo pedido
                </button>

                <button
                className="w-52 h-52 p-2 m-10 bg-white shadow-[0_0_20px_#a9a9a9] rounded-2xl hover:scale-105 transition">
                    Añadir a pedido existente
                </button>
            </div>

            <div
            className={`
            fixed flex top-0 left-0 w-full h-full 
            ${showNewOrder ? '' : 'hidden'} backdrop-blur-[2px] justify-center items-center`}>
                <div className="bg-white shadow-[0_0_20px_#a9a9a9] w-[650px] h-[500px] rounded-2xl flex flex-col justify-center items-center">
                    <button
                    className="absolute top-0 right-0 m-10 p-4 bg-red-600 text-white rounded-xl"
                    onClick={() => setShowNewOrder(false)}>
                        X
                    </button>
                    <FetchPedidos />
                </div>
            </div>
        </main>
    )
}
