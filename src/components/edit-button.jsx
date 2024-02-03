import { FaEdit } from 'react-icons/fa'

// Componente de botón de edición
export default function EditButton ({ onClick, textColor, hoverTextColor }) {
  return (
    <button onClick={onClick}>
      {/* Icono de edición */}
      <span className={`text-${textColor} hover:text-${hoverTextColor}`}>
        <FaEdit />
      </span>
    </button>
  )
}
