// Importar íconos y componentes necesarios
import { useEffect, useRef } from 'react'
import { TiDelete } from 'react-icons/ti'
import { FaCheckCircle } from 'react-icons/fa'
import EditButton from './edit-button'

export default function DinamicInputText ({
  show, ifShow, loading, value, clickEdit, submit, hidde, inputName, inputValue, putValues, clickDelete
}) {
  // Referencia al input para enfocarlo automáticamente al mostrar el componente
  const refer = useRef(null)

  // Efecto para enfocar el input al mostrar el componente
  useEffect(() => {
    if (show) refer.current.focus()
  }, [show])

  return (
    <>
      {/* Sección para mostrar el texto y el botón de edición */}
      <div className={`flex ${show ? 'hidden' : ''}`}>
        <h2 className={`text-2xl ${ifShow ? 'w-[calc(100%-16px)]' : 'mr-4'}`}>
          {/* Mensaje de carga o valor actual */}
          {loading ? 'Loading...' : value}
        </h2>
        {/* Componente de botón de edición */}
        <EditButton onClick={clickEdit} textColor="green-800" hoverTextColor="green-900" />
      </div>
      {/* Formulario para editar el texto (visible cuando está en modo de edición) */}
      <form onSubmit={submit} className={`${show ? '' : 'hidden'} flex ${ifShow ? 'justify-between' : ''}`}
        onKeyDown={hidde}>
        {/* Input de texto para editar el valor */}
        <input ref={refer} className={`text-2xl ${ifShow ? 'w-[calc(100%-50px)]' : ''}`} name={inputName} value={inputValue}
          onChange={putValues} placeholder={value} maxLength={25}
        />
        {/* Icono para eliminar el texto */}
        <span className='text-3xl text-red-600 hover:text-red-500 cursor-pointer' onClick={clickDelete}>
          <TiDelete />
        </span>
        {/* Botón de confirmación del nuevo texto */}
        <button className='text-[20px] text-green-600 hover:text-green-500'>
          <FaCheckCircle />
        </button>
      </form>
    </>
  )
}
