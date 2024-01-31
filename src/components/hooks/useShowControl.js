// Importar el hook `useState` de React
import { useState } from 'react'

// Función de hook personalizado para controlar la visibilidad de elementos
export function useShowControl(data = {}) {
    // Estado para almacenar el control de visibilidad de elementos
    const [dataControl, setDataControl] = useState(data);

    // Función para ocultar todos los elementos
    const showNothing = () => {
        Object.keys(dataControl).forEach((key) => {
            dataControl[key] = false;
        });
    }

    // Función para mostrar un elemento específico y ocultar el resto
    const showControl = (name, value) => {
        showNothing();
        setDataControl({ ...dataControl, [name]: value });
    }

    // Devolver el estado actualizado y las funciones para controlar la visibilidad
    return {
        ...dataControl,
        dataControl,
        showControl
    }
}
