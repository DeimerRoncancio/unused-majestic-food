// Función asincrónica para realizar solicitudes de eliminación a una URL
const fetchDelete = async (url) => {
  try {
    // Realizar una solicitud de eliminación a la URL
    const data = await fetch(url, {
      method: 'DELETE'
    })

    if (!data.ok) {
      throw new Error()
    }

    // Devolver un objeto sin errores
    return {
      error: false
    }
  } catch (err) {
    // En caso de error, devolver un objeto con error en verdadero
    return {
      error: true
    }
  }
}

// Exportar la función fetchDelete como módulo predeterminado
export default fetchDelete
