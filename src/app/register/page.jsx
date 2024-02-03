'use client'

// Importar el hook `useDataForm` para gestionar el estado del formulario
import { useDataForm } from '@/components/hooks/useDataForm'

// Importar el hook `useRouter` de Next.js para manejar la navegación
import { useRouter } from 'next/navigation'

// Importar la función `signIn` de NextAuth para realizar la autenticación
import { signIn } from 'next-auth/react'

// Importar el hook `useState` de React para gestionar el estado de la imagen de perfil
import { useState } from 'react'

// Importar la función `uuid` de la librería `uuid` para generar identificadores únicos
import { v4 as uuid } from 'uuid'

// Componente de la página de registro de usuario
export default function Register () {
  // Obtener el router de Next.js para gestionar la navegación
  const router = useRouter()

  // Estado para gestionar la imagen de perfil del usuario
  const [profileImage, setProfileImage] = useState({})

  // Utilizar el hook `useDataForm` para gestionar el estado del formulario
  const { email, password, name, lastName, putDates } = useDataForm({
    email: '',
    password: '',
    name: '',
    lastName: ''
  })

  // Función para manejar el envío del formulario de registro
  const sendUser = async (evt) => {
    // Evitar el comportamiento predeterminado del formulario
    evt.preventDefault()

    // Crear un objeto FormData para enviar la imagen de perfil al servidor
    const form = new FormData()
    form.set('profileImage', profileImage)

    try {
      // Enviar la imagen de perfil al servidor a través de una API de carga
      await fetch('/api/upload', {
        method: 'POST',
        body: form
      })
    } catch (err) {
      console.error(err)
    }

    // Crear un objeto FormData para obtener los datos del formulario
    const dataForm = new FormData(evt.target)
    const data = Object.fromEntries(dataForm)

    // Obtener el nombre del archivo de la imagen de perfil
    const image = Object.fromEntries(form)
    data.profileImage = image.profileImage.name

    // Generar un identificador único para el usuario
    data.id = uuid()

    try {
      // Enviar los datos del usuario al servidor simulado para el registro
      const dataUser = await fetch('http://localhost:5000/usuarios', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      }).then(res => res.json())

      // Iniciar sesión automáticamente después del registro
      const signin = await signIn('credentials', {
        email: dataUser.email,
        password: dataUser.password,
        redirect: false
      })

      // Redirigir al usuario a la página principal si la autenticación es exitosa
      if (signin?.ok) router.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  // Renderizar el formulario de registro de usuario
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form className="grid grid-cols-2 gap-6" onSubmit={sendUser}>
        {/* Campo de entrada para la imagen de perfil */}
        <div className='col-span-2 flex flex-col'>
          <label>Imagen de perfil</label>
          <input
            type='file'
            onChange={(evt) => {
              setProfileImage(evt.target.files[0])
            }}></input>
        </div>
        {/* Campos de entrada para el email, contraseña, nombre y apellidos */}
        <div className='col-span-2 flex flex-col'>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" onChange={putDates} value={email}></input>
        </div>
        <div className='col-span-2 flex flex-col'>
          <label htmlFor="password">Contraseña</label>
          <input type="password" name="password" onChange={putDates} value={password}></input>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="name">Nombre</label>
          <input type="text" name="name" onChange={putDates} value={name}></input>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="lastName">Apellidos</label>
          <input type="text" name="lastName" onChange={putDates} value={lastName}></input>
        </div>
        {/* Botón para crear la cuenta del usuario */}
        <button className="col-span-2">Crear cuenta</button>
      </form>
    </div>
  )
}
