'use client'

// Importar hooks
import { useEffect, useState } from 'react'

// Componente para probar la funcionalidad de fetch
export default function FetchTesting () {
  // Estado para almacenar los datos de la respuesta
  const [data, setData] = useState({})

  // Función para realizar la solicitud fetch
  const fetching = async () => {
    // evt.preventDefault()

    try {
      const response = await fetch('http://localhost:5000/pedidos', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          nombre: 'Deimer'
        })
      }).then(res => res.json())

      // Actualizar el estado con los datos de la respuesta
      setData(response)
    } catch (err) {
      console.log(err)
    }
  }

  // Efecto que se ejecuta al montar el componente
  useEffect(() => {
    // Llamar a la función fetching para realizar la solicitud
    fetching()
  }, [])

  // Renderizar el nombre obtenido de la respuesta
  return (
    <>
      <h2>{data.nombre}</h2>
    </>
  )
}
