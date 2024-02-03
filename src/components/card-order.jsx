// Importar íconos y paquetes necesarios
import { AiFillStar, AiOutlinePlus } from 'react-icons/ai'
import Image from 'next/image'

// Estilos específicos del componente (estilo modular)
import './styles/card-order.css'

// Componente de tarjeta de producto
export default function CardOrder ({ name, image, qualification, price, validate, category }) {
  // Función para manejar el clic en la tarjeta
  const handleClick = () => {
    // Al hacer clic, se guarda la información del producto en el almacenamiento local
    localStorage.setItem('Order', JSON.stringify({
      nombre: name,
      imagen: image,
      calificacion: qualification,
      price: price,
      category: category
    }))

    // Se ejecuta la función de validación pasada como prop
    validate(true)
  }

  return (
    <div className="card-container min-w-[280px] rounded-2xl shadow-[0_0_15px_#a9a9a9]
        hover:shadow-[0_0_25px_#9b9b9b] transition-all duration-300">
      <div className="px-4 pt-4">
        <h2>{name}</h2>
        <div className="w-full flex justify-center">
          <div className="w-[200px] h-[160px] my-6 relative">
            {/* Componente de imagen de Next.js */}
            <Image className="object-contain" src={`/assets/images/products/${image}`} layout="fill" alt="food-image" />
          </div>
        </div>
      </div>
      <div className='flex justify-between'>
        <div className="p-4 relative">
          <div className="flex items-center absolute top-[-15%]">
            {/* Icono de calificación */}
            <span className="qualification-star-icon text-lg mr-1"><AiFillStar /></span>
            {/* Texto de calificación */}
            <p className="qualification-text text-xs">{qualification}</p>
          </div>
          {/* Precio del producto */}
          <p className="text-xl font-medium">$ {price}</p>
        </div>
        {/* Botón de agregar producto al pedido */}
        <button
          className="button-add-order flex justify-center items-center rounded-br-2xl w-[60px]"
          onClick={handleClick}>
          {/* Icono de añadir */}
          <span className="text-5xl text-white"><AiOutlinePlus /></span>
        </button>
      </div>
    </div>
  )
}
