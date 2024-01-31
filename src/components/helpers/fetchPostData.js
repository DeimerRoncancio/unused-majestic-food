// Función asincrónica para realizar solicitudes POST a una URL con un cuerpo (body) específico
const fetchPost = async (url, body) => {
    try {
        // Realizar una solicitud POST a la URL con el cuerpo en formato JSON
        const data = await fetch(url, {
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(body)
        }).then(res => res.json());

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

// Exportar la función fetchPost como módulo predeterminado
export default fetchPost;
