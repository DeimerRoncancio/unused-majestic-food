// Función asincrónica para realizar solicitudes PUT a una URL con un cuerpo (body) específico
const fetchPut = async (url, body) => {
    try {
        // Realizar una solicitud PUT a la URL con el cuerpo en formato JSON
        const data = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        if(data.status) {
            throw "Error";
        }

        // Devolver un objeto sin errores
        return {
            error: false
        };
    } catch (err) {
        // En caso de error, devolver un objeto con error en verdadero
        return {
            error: true
        };
    }
};

// Exportar la función fetchPut como módulo predeterminado
export default fetchPut;
