// Importar las funciones de ayuda para realizar solicitudes PUT y GET con un ID específico, y para formatear fechas
import fetchPut from '@/components/helpers/fetchPutData'
import fetchDataId from '@/components/helpers/fetchDataId'
import getDate from '@/components/helpers/getDate'

// Hook personalizado para actualizar información
export function useUpdateInfo ({ url, id, urlPut }) {
  // Función para actualizar datos en base al evento del formulario
  const updateData = async (evt) => {
    evt.preventDefault()

    try {
      // Obtener los datos actuales utilizando la función fetchDataId
      const { dataId } = await fetchDataId(url, id)

      // Determinar el tipo de campo de entrada y actualizar los datos correspondientes
      if (evt.target[0].type === 'text' || evt.target[0].type === 'textarea') {
        const newData = evt.target[0].value
        dataId[evt.target[0].name] = newData
      } else if (evt.target[0].type === 'datetime-local') {
        const newData = getDate(evt.target[0].value)
        dataId[evt.target[0].name] = newData
      }

      // Realizar una solicitud PUT para actualizar los datos
      const { error } = await fetchPut(urlPut, dataId)

      // Manejar errores, si los hay
      if (error) {
        console.log('Hubo un error al actualizar la información.')
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Devolver la función para actualizar datos
  return {
    updateData
  }
}
