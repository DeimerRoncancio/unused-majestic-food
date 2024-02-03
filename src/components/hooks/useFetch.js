'use client'

// Importar los hooks `useState` y `useEffect` de React
import { useState, useEffect } from 'react'

// Importar la función fetchData para realizar solicitudes de datos
import fetchData from '@/components/helpers/fetchData'

// Custom hook para realizar solicitudes de datos de forma reutilizable
export const useFetch = (url) => {
  // Estados para almacenar los datos, el estado de carga y los errores
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  // Función asincrónica para obtener los datos utilizando la función fetchData
  const getData = async () => {
    try {
      // Realizar la solicitud de datos utilizando la función fetchData
      const { data, isLoading, error } = await fetchData(url)

      // Actualizar los estados con los datos obtenidos
      setData(data)
      setIsLoading(isLoading)
      setError(error)
    } catch (err) {
      // Manejar cualquier error que ocurra durante la solicitud
      setError(true)
    }
  }

  // Efecto para realizar la solicitud de datos cuando la URL cambia
  useEffect(() => {
    getData()
  }, [url])

  // Devolver los datos, el estado de carga y los errores
  return {
    data,
    isLoading,
    error
  }
}
