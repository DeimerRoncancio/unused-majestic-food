'use client'

// Importar React y los hooks necesarios
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Componente Space
export default function Space ({ height }) {
  // Estado para mostrar u ocultar el espacio
  const [showSpace, setSpace] = useState(false)

  // Obtener la ruta actual
  const currentPath = usePathname()

  // Función para determinar si se debe ocultar el espacio
  const hiddenSpace = () => {
    if (currentPath === '/register' || currentPath === '/login') setSpace(true)
    else setSpace(false)
  }

  // Efecto para ocultar el espacio cuando cambia la ruta
  useEffect(() => {
    hiddenSpace()
  }, [currentPath])

  // Renderizado del componente Space
  return (
    <div className={`space w-full h-[46px] ${showSpace ? 'hidden' : ''}`}></div>
  )
}
