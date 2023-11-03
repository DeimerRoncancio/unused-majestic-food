import Image from 'next/image'

import { AiFillStar,AiOutlinePlus } from "react-icons/ai"

import { plato } from './helpers/plato'

import './styles/card-order.css'

export default function CardOrder({name,image,qualification,price,validate}) {
    const handleClick = ()=> {
        const data = plato(0,{
            nombre: name,
            imagen: image,
            calificacion: qualification,
            price: price
        });

        validate(true);
    }

    return (
        <div className="card-container min-w-[280px] rounded-2xl mr-28 shadow-[0_0_15px_#a9a9a9] 
        hover:shadow-[0_0_25px_#9b9b9b] transition-all duration-300">
            <div className="px-4 pt-4">
                <h2>{name}</h2>
                <div className="w-full flex justify-center">
                    <Image className="w-[200px] h-[160px] my-6 object-cover" src={image} alt="food-image" />
                </div>
            </div>
            <div className='flex justify-between'>
                <div className="p-4 relative">
                    <div className="flex items-center absolute top-[-15%]">
                        <span className="qualification-star-icon text-lg mr-1"><AiFillStar /></span>
                        <p className="qualification-text text-xs">{qualification}</p>
                    </div>
                    <p className="text-xl font-medium">$ {price}</p>
                </div>
                <button 
                className="button-add-order flex justify-center items-center rounded-br-2xl w-[60px]"
                onClick={handleClick}>
                    <span className="text-5xl text-white"><AiOutlinePlus /></span>
                </button>
            </div>
        </div>
    )
}
