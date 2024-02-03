// Importar hooks y componentes necesarios
import { useRef, useEffect } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { TiDelete } from 'react-icons/ti'
import EditButton from '@/components/edit-button'

export default function DinamicTextArea ({
  show, value, clickEdit, hidde, areaName, areaValue, putValues, submit, clickDelete
}) {
  // Referencia al textarea para enfocarlo automáticamente al mostrar el componente
  const refer = useRef(null)

  // Efecto para enfocar el textarea al mostrar el componente
  useEffect(() => {
    refer.current.focus()
  }, [show])

  return (
    <>
      {/* Sección para mostrar la etiqueta y el botón de edición */}
      <div className='flex'>
        <h3 className='text-green-800 mr-2'>Descripción</h3>
        {/* Componente de botón de edición */}
        <EditButton onClick={clickEdit} textColor="green-800" hoverTextColor="green-900" />
      </div>
      {/* Párrafo para mostrar el texto (oculto cuando está en modo de edición) */}
      <p className={`text-sm ${show ? 'hidden' : ''}`}>{value}</p>
      {/* Formulario para editar el texto (visible cuando está en modo de edición) */}
      <form onSubmit={submit} className={`flex ${show ? '' : 'hidden'}`} onKeyDown={hidde}>
        {/* Textarea para editar la descripción */}
        <textarea ref={refer} name={areaName} value={areaValue}
          onChange={putValues} placeholder={value}></textarea>
        <div>
          {/* Icono para eliminar la descripción */}
          <span className='text-3xl text-red-600 hover:text-red-500 cursor-pointer' onClick={clickDelete}>
            <TiDelete />
          </span>
          {/* Botón de confirmación de la nueva descripción */}
          <button className='text-[20px] ml-[5px] text-green-600 hover:text-green-500'>
            <FaCheckCircle />
          </button>
        </div>
      </form>
    </>
  )
}
