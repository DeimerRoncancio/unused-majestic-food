"use client"

import { OrderContext } from '@/context/order-context'
import { useContext } from 'react'
import { AiFillStar } from 'react-icons/ai'
import Image from 'next/image'

import '@/components/styles/plate-presentation.css'

export default function PlatePresentation() {
    const value = useContext(OrderContext);

    return (
        <div className="plate-presentation w-[610px] p-5 rounded-xl shadow-[0_0_15px_#a9a9a9]">
            <h1 className="text-lg pl-5">{value.name}</h1>
            <div className="w-full flex justify-center">
                <div className='w-[350px] h-[250px] relative'>
                    <Image src={`/${value.image}`} className='object-cover' alt="image" layout="fill" />
                </div>
            </div>
            <div className="w-full flex items-center justify-center">
                <AiFillStar className="qualification-icon text-4xl" />
                <p className="qualification-text">{value.qualification}</p>
            </div>
            <div className="flex w-full justify-center mt-3 mb-3">
                <h2>$ {value.price}</h2>
            </div>
        </div>
    )
}
