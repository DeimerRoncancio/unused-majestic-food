'use client'

// Importar los hooks `useState` y `useEffect` de React
import { useState, useEffect } from 'react'

// Importar la función fetchDataId para realizar solicitudes de datos con un ID específico
import fetchDataId from '@/components/helpers/fetchDataId'

// Custom hook para realizar solicitudes de datos con un ID específico de forma reutilizable
export const useFetchId = (url, id) => {
  // Estados para almacenar los datos, el estado de carga y los errores
  const [dataId, setData] = useState({})
  const [isLoadingId, setIsLoading] = useState(true)
  const [errorId, setError] = useState(false)

  // Función asincrónica para obtener los datos utilizando la función fetchDataId
  const getData = async () => {
    try {
      // Realizar la solicitud de datos utilizando la función fetchDataId
      const { dataId, isLoadingId, errorId } = await fetchDataId(url, id)

      // Actualizar los estados con los datos obtenidos
      setData(dataId)
      setIsLoading(isLoadingId)
      setError(errorId)
    } catch (err) {
      // Manejar cualquier error que ocurra durante la solicitud
      setError(true)
    }
  }

  // Efecto para realizar la solicitud de datos cuando el ID cambia
  useEffect(() => {
    getData()
  }, [id])

  // Devolver los datos, el estado de carga y los errores
  return {
    dataId,
    isLoadingId,
    errorId
  }
}
