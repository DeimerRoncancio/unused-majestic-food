// Componente de Popup
export default function Popup ({ children, ifShow, bgColor, onClickButton, onClickBackground }) {
  return (
    // Estructura del componente Popup
    <div className={`fixed flex top-0 left-0 w-full h-full ${ifShow ? '' : 'hidden'} 
            backdrop-blur-[2px] justify-center items-center z-50 bg-${bgColor}`}>
      {/* Botón de cierre del Popup */}
      <button
        className="absolute top-0 right-0 m-10 z-50 p-4 bg-red-600 text-white rounded-xl"
        onClick={onClickButton}>
        X
      </button>
      {/* Contenido del Popup */}
      {children}

      {/* Fondo oscuro para el Popup */}
      <div className="w-full h-full absolute z-0" onClick={onClickBackground}></div>
    </div>
  )
}
