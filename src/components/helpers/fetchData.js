// Función asincrónica para realizar solicitudes de datos a una URL
const fetchData = async (url) => {
    try {
        // Realizar la solicitud de datos a la URL y parsear la respuesta como JSON
        const data = await fetch(url).then(res => res.json());

        // Devolver un objeto con los datos, sin errores y con isLoading en falso
        return {
            data,
            isLoading: false,
            error: false
        };
    } catch (err) {
        // En caso de error, devolver un objeto con error en verdadero
        return {
            error: true
        };
    }
};

// Exportar la función fetchData como módulo predeterminado
export default fetchData;