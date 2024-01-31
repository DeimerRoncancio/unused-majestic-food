// Función para obtener datos de un formulario a partir de su elemento target
const getDataForm = (target) => {
    // Crear un objeto FormData a partir del elemento target del formulario
    const dataForm = new FormData(target);

    // Convertir el objeto FormData en un objeto convencional
    const data = Object.fromEntries(dataForm);

    // Devolver el objeto de datos del formulario
    return data;
};

// Exportar la función getDataForm como módulo predeterminado
export default getDataForm;