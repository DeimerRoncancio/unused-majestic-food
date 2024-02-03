// Importar íconos y componentes necesarios
import { useRef, useEffect } from 'react'
import { TiDelete } from 'react-icons/ti'
import { FaCheckCircle } from 'react-icons/fa'
import EditButton from '@/components/edit-button'

export default function DinamicInputDate ({
  show, clickEdit, value, submit, hidde, inputDateName, inputDateValue, putValues, clickDelete
}) {
  // Referencia al input para enfocarlo automáticamente al mostrar el componente
  const refer = useRef()

  // Efecto para enfocar el input al mostrar el componente
  useEffect(() => {
    refer.current.focus()
  }, [show])

  return (
    <>
      {/* Sección para mostrar la fecha y el botón de edición */}
      <div className='flex'>
        <h3 className='mr-2 text-green-800'>Fecha de entrega</h3>
        {/* Componente de botón de edición */}
        <EditButton onClick={clickEdit} textColor="green-800" hoverTextColor="green-900" />
      </div>
      {/* Sección para mostrar la fecha (oculta cuando está en modo de edición) */}
      <h3 className={`text-sm ${show ? 'hidden' : ''}`}>
        {value}
      </h3>
      {/* Formulario para editar la fecha (visible cuando está en modo de edición) */}
      <form onSubmit={submit} className={`flex ${show ? '' : 'hidden'}`} onKeyDown={hidde}>
        {/* Input de tipo 'datetime-local' para editar la fecha */}
        <input ref={refer} type="datetime-local" name={inputDateName} value={inputDateValue} onChange={putValues} />
        {/* Icono para eliminar la fecha */}
        <span className='text-3xl text-red-600 hover:text-red-500 cursor-pointer' onClick={clickDelete}>
          <TiDelete />
        </span>
        {/* Botón de confirmación de la nueva fecha */}
        <button className='text-[20px] ml-[5px] text-green-600 hover:text-green-500'>
          <FaCheckCircle />
        </button>
      </form>
    </>
  )
}
