import Image from 'next/image'
import burguerImage from '../assets/images/burguer.png'

import { AiFillStar,AiOutlinePlus } from "react-icons/ai";

import './styles/card-order.css'

export default function CardOrder() {
    return (
        <div className="card-container min-w-[280px] rounded-2xl mr-28">
            <div className="px-4 pt-4">
                <h2>Hamburguesa clasica</h2>
                <div className="w-full flex justify-center">
                    <Image className="w-[200px] h-[160px] my-6 object-cover" src={burguerImage} />
                </div>
            </div>
            <div className='flex justify-between'>
                <div className="p-4 relative">
                    <div className="flex items-center absolute top-[-15%]">
                        <span className="qualification-star-icon text-lg mr-1"><AiFillStar /></span>
                        <p className="qualification-text text-xs">4.5</p>
                    </div>
                    <p className="text-xl font-medium">$30.000</p>
                </div>
                <button className="button-add-order flex justify-center items-center rounded-br-2xl w-[60px]">
                    <span className="text-5xl text-white"><AiOutlinePlus /></span>
                </button>
            </div>
        </div>
    )
}