// Importar el hook `useState` de React
import { useState } from 'react'

// Componente de botón reutilizable
export default function Button ({
  textContent, bgColor, bgColorHover, padding, width, textColor, textWidth, lineHeight,
  handleClick
}) {
  // Estado para controlar el estado de hover del botón
  const [hover, setHover] = useState(false)

  // Función para manejar los eventos de mouse y cambiar el estado de hover
  const handleMouse = () => {
    setHover(!hover)
  }

  // Determinar el color de fondo del botón en función del estado de hover
  const backgroundColor = !hover ? `${bgColor}` : `${bgColorHover}`

  // Renderizar el botón con estilos dinámicos y manejadores de eventos
  return (
    <button className="transition duration-[0.3s] p-2 rounded-full shadow-[0_2px_4px_#a9a9a9]"
      style={{
        width: `${width}`,
        backgroundColor,
        color: `${textColor}`,
        padding: `${padding}`,
        fontSize: `${textWidth}`,
        lineHeight: `${lineHeight}`
      }}
      onMouseEnter={handleMouse}
      onMouseLeave={handleMouse}
      onClick={handleClick}>
      {textContent}
    </button>
  )
}
