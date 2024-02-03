// Función para formatear una fecha dada en un objeto con propiedades específicas
const getDate = (date) => {
  // Crear un objeto de fecha a partir de la cadena de fecha proporcionada
  const dateTarget = new Date(date)

  // Crear un objeto con propiedades específicas de la fecha
  const dateOrder = {
    year: dateTarget.getFullYear(), // Obtener el año
    month: dateTarget.getMonth() + 1, // Obtener el mes (0-11) y sumar 1 para obtener el mes real (1-12)
    day: dateTarget.getDate(), // Obtener el día del mes
    hours: dateTarget.getHours(), // Obtener las horas del día
    minutes: dateTarget.getMinutes() // Obtener los minutos de la hora
  }

  // Devolver el objeto de fecha formateado
  return dateOrder
}

// Exportar la función getDate como módulo predeterminado
export default getDate
