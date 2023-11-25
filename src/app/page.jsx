"use client";

import { useState,useEffect,useContext } from 'react'
import { useFetch } from '@/components/hooks/useFetch'
import { useRouter } from 'next/navigation'
import { BsSearch } from "react-icons/bs"
import { useSession } from 'next-auth/react'
import { OrdersContext } from '@/context/OrdersContext'
import Link from 'next/link'
import CardOrder from '@/components/card-order'
import FormPedidos from '@/components/form-pedidos'
import FetchTesting from '../components/fetch-testing'
import { FaWpforms } from "react-icons/fa6";

import './styles/main-page.css'

export default function Home() {
    const [showPopup, setShowPopup] = useState(false);
    const [showNewOrder,setShowNewOrder] = useState(false);
    const [showAllOrders,setAllOrders] = useState(false);
    const [allOrders,setOrders] = useState([])
    const { data,isLoading,error } = useFetch("http://localhost:5000/pedidos")
    const platos = useContext(OrdersContext)

    const { data:session,status } = useSession();

    const ifShowPopup = (validation) => {
        setShowPopup(validation);
    }

    const getOrders = ()=> {
        if(error){
            const orders = data.filter(item => item.idUser === session?.user.id)
            setOrders(orders)
        } else {
            console.log("Hubo un error.")
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
    },[session])

    return (
        <>
            <div className='m-28'>
                <h1 className='text-3xl'>¡Bienvenido de nuevo!</h1>
                <h2>Señor@ {session?.user.name} {session?.user.lastName}</h2>
            </div>

            <div className="input-container px-6 py-2 mx-60 flex items-center rounded-full ">
                <span className="search-icon"><BsSearch /></span>
                <input className="w-full ml-6 outline-none bg-transparent" placeholder="Buscar"></input>
            </div>

            <section className="order-section m-28 grid gap-24">
                {
                    platos.map((item)=> (
                        <CardOrder
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            image={item.image}
                            qualification={item.qualification}
                            validate={ifShowPopup}
                            price={item.price}
                            category={item.category}
                        />
                    ))
                }
            </section>

            <div className={`fixed top-0 lef-0 w-full h-full ${showPopup ? '' : 'hidden'} flex justify-center 
            items-center bg-[#22222298] backdrop-blur-[2px] transition z-50`}>
                <button
                className="z-50 absolute top-0 right-0 m-10 p-4 bg-red-600 text-white rounded-xl"
                onClick={() => setShowPopup(false)}>
                    X
                </button>

                <button className="z-50 w-56 h-56 m-10 shadow-[0_0_20px_#222222b4]  rounded-2xl
                hover:scale-105 transition"
                onClick={()=> {
                    setShowPopup(false)
                    setShowNewOrder(true)
                }}>
                    <div className='w-full h-full bg-[url("https://gerente.com/co/wp-content/uploads/sites/16/2018/10/COMIDAS-RÁPIDAS-Y-RESTAURANTES.jpg")] 
                    bg-cover rounded-2xl'>
                        <div className='w-full h-full p-4 rounded-2xl bg-gradient-to-b from-transparent to-[#131313d0] flex flex-col items-start justify-end'>
                            <h2 className='text-[#5bcc60] text-md font-medium'>Añadir a nuevo pedido</h2>
                            <p className='text-xs text-white font-extralight'>Crea un pedido nuevo</p> 
                        </div>
                    </div>
                </button>

                <button className="z-50 w-56 h-56 m-10 bg-white shadow-[0_0_20px_#222222b4] rounded-2xl 
                hover:scale-105 transition" 
                onClick={()=> {
                    setShowPopup(false)
                    setAllOrders(true)
                }}>
                    <div className='w-full h-full bg-[url("https://cloudfront-us-east-1.images.arcpublishing.com/infobae/42Q6QIMLB5F3JPEXQWI6VV7PQ4.jpg")] 
                    bg-cover rounded-2xl'>
                        <div className='w-full h-full p-4 rounded-2xl bg-gradient-to-b from-transparent to-[#131313d0] flex flex-col items-start justify-end'>
                            <h2 className='text-[#5bcc60] text-md font-medium'>Añadir a un pedido tuyo</h2>
                            <p className='text-xs text-white font-extralight'>Incluyelo en un pedido existente</p> 
                        </div>
                    </div>
                </button>

                <div className="w-full h-full absolute z-0" onClick={()=> setShowPopup(false)}></div>
            </div>

            <div className={`fixed flex top-0 left-0 w-full h-full ${showNewOrder ? '' : 'hidden'} 
            backdrop-blur-[2px] justify-center items-center z-50`}>
                <div className="z-50 shadow-[0_0_20px_#a9a9a9] w-[650px] h-[500px] flex 
                flex-col justify-center items-center bg-[#f4ece6] font-mono rounded-md over">
                    <button
                    className="absolute top-0 right-0 m-10 p-4 bg-red-600 text-white rounded-xl"
                    onClick={() => setShowNewOrder(false)}>
                        X
                    </button>
                    <FormPedidos />
                    <div className='w-full h-[10%] bg-white self-baseline flex justify-center items-center'>
                            <FaWpforms size={30}/>
                    </div>
                </div>

                <div className="w-full h-full absolute z-0" onClick={()=> setShowNewOrder(false)}></div>
            </div>

            <div className={`fixed flex top-0 left-0 w-full h-full ${showAllOrders ? '' : 'hidden'} 
            backdrop-blur-[2px] justify-center items-center z-50`}>
                <div className="z-50 shadow-[0_0_20px_#a9a9a9] w-[650px] h-[500px] flex 
                flex-col justify-center items-center bg-[#f4ece6] rounded-md">
                    <button
                    className="absolute top-0 right-0 m-10 p-4 bg-red-600 text-white rounded-xl"
                    onClick={() => setAllOrders(false)}>
                        X
                    </button>
                    <div className='w-full h-[10%] flex justify-center items-center'>
                        <h1 className=''>PEDIDOS</h1>
                    </div>

                    <div className='w-full h-[90%] flex justify-center items-center'>
                      <ul>
                        {
                            isLoading ?
                            <h2>Loading...</h2> :
                            allOrders.map((item)=> (
                                <li key={item.id}>
                                    <button className='bg-slate-50 p-3 rounded-2xl border-2 hover:border-green-400 w-[150px] mb-2' 
                                            onClick={()=>sendInOrder(item.id)}>
                                        <Link className='font-mono' href={`pedidos/${item.id}`}>
                                            {item.name}
                                        </Link>
                                    </button>
                                </li> 
                            ))
                        }
                    </ul>  
                    </div>
                    
                </div>

                <div className="w-full h-full absolute z-0" onClick={()=> setAllOrders(false)}></div>
            </div>
        </>
    );
}
