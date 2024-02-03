// Función asincrónica para realizar solicitudes de datos a una URL con un ID específico
const fetchDataId = async (url, id) => {
  try {
    // Realizar la solicitud de datos a la URL con el ID y parsear la respuesta como JSON
    const dataId = await fetch(`${url}/${id}`).then(res => res.json())

    // Devolver un objeto con los datos del ID, sin errores y con isLoadingId en falso
    return {
      dataId,
      isLoadingId: false,
      errorId: false
    }
  } catch (err) {
    // En caso de error, devolver un objeto con errorId en verdadero
    return {
      errorId: true
    }
  }
}

// Exportar la función fetchDataId como módulo predeterminado
export default fetchDataId
