'use client'

// Importar los hooks `useEffect` y `useState` de React para manejar el ciclo de vida y el estado del componente
import { useEffect, useState } from 'react'

// Importar el hook `useRouter` de Next.js para manejar la navegación
import { useRouter } from 'next/navigation'

// Importar el hook `useSession` de NextAuth para gestionar la sesión del usuario
import { useSession } from 'next-auth/react'

// Componente para mostrar los pedidos del usuario
export default function UserOrders () {
  // Obtener la información de la sesión del usuario
  const { data: session } = useSession()

  // Estado para almacenar los pedidos del usuario
  const [res, setRes] = useState([])

  // Obtener el router de Next.js para gestionar la navegación
  const router = useRouter()

  // Función asincrónica para obtener los pedidos del usuario desde el servidor
  const getData = async () => {
    try {
      // Realizar una solicitud al servidor para obtener la lista completa de pedidos
      const response = await fetch('http://localhost:5000/pedidos').then(res => res.json())

      // Filtrar los pedidos para obtener solo los del usuario actual
      const orders = response.filter(item => item.idUser === session?.user.id)

      // Actualizar el estado con los pedidos filtrados
      setRes(orders)
    } catch (err) {
      console.error(err)
    }
  }

  // Efecto para cargar los pedidos del usuario cuando la sesión cambia
  useEffect(() => {
    getData()
  }, [session])

  // Renderizar la lista de pedidos del usuario
  return (
    <div className="mt-14 m-28">
      <h1 className="text-3xl">Estos son tus pedidos</h1>
      <div className="my-14 grid gap-14 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
        {res.map(item => (
          <div className="p-5 bg-white shadow-[0_0_12px_#9b9b9b] rounded-2xl" key={item.id}>
            <h2 className='text-lg'>{item.name}</h2>
            <p className="text-sm text-green-500 mb-4">
              {`${item.date.day}/${item.date.month}/${item.date.year} - ${item.date.hours}:${item.date.minutes}`}
            </p>
            <p className="text-xs">{item.description}</p>
            <button
              className="p-2 w-full mt-6 bg-green-500 rounded-md text-white hover:bg-green-600 transition duration-300"
              onClick={() => {
                // Redirigir al usuario a la página específica del pedido
                router.push(`http://localhost:3000/pedidos/${item.id}`)
              }}
            >
              Ir al pedido
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
