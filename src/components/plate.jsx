'use client'

// Importar librerías y componentes necesarios
import Image from 'next/image'
import { TiDelete } from 'react-icons/ti'

// Componente de plato individual
export default function Plate ({ nombre, precio, categoria, imagen, id }) {
  // Función para eliminar un plato
  const deletePlate = async (evt) => {
    evt.preventDefault()
    try {
      // Realizar la petición de eliminación e imprimir el código de estado de la respuesta en la consola
      await fetch(`http://localhost:5000/platos/${id}`, {
        method: 'DELETE'
      }).then(res => console.log(res.status))
    } catch (err) {
      // Manejar errores de la petición
      console.error(err)
    }
  }

  return (
    // Estructura del componente de plato
    <div className={'group flex p-4 bg-white shadow-[0_0_10px_#a9a9a9] rounded-xl relative'}>
      {/* Sección de información del plato */}
      <div className="flex w-[40%] flex-col justify-between">
        <div>
          <h3>{categoria}</h3>
          <h4 className="text-xs text-[#1f1f1f]">{nombre}</h4>
        </div>
        <h3 className='text-sm text-[#3ea440]'>$ {precio}</h3>
      </div>
      {/* Sección de imagen del plato */}
      <div className='flex w-[60%] h-[120px] relative justify-center'>
        <Image src={`/assets/images/products/${imagen}`} className="object-contain" layout="fill" alt="plate-image" />
      </div>
      {/* Icono de eliminación del plato */}
      <span className="absolute top-0 right-0 m-2 text-2xl text-transparent group-hover:text-red-700 transition
            duration-200 hover:cursor-pointer" onClick={deletePlate}>
        <TiDelete />
      </span>
    </div>
  )
}
