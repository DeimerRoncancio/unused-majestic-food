// Función para obtener datos de un almacenamiento local (localStorage) basado en una clave
const getStorage = (storage) => {
  // Obtener el elemento correspondiente a la clave proporcionada del almacenamiento local
  const item = localStorage.getItem(storage)

  // Parsear el valor del elemento como JSON para obtener los datos
  const data = JSON.parse(item)

  // Devolver los datos obtenidos del almacenamiento local
  return data
}

// Exportar la función getStorage como módulo predeterminado
export default getStorage
