import Image from 'next/image'

export default function Plate({nombre,precio,categoria,imagen}) {
    return (
        <div className={`flex p-4 bg-white shadow-[0_0_10px_#a9a9a9] rounded-xl`}>
            <div className="flex w-[40%] flex-col justify-between">
                <div>
                    <h3>{categoria}</h3>
                    <h4 className="text-xs text-[#1f1f1f]">{nombre}</h4>
                </div>
                <h3 className='text-sm text-[#3ea440]'>$ {precio}</h3>
            </div>
            <div className='flex w-[60%] h-[120px] relative justify-center'>
                <Image src={`/assets/images/${imagen}`} className="object-cover" layout="fill" alt="plate-image" />
            </div>
        </div>
    )
}