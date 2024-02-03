'use client'

// Importar el hook `useSession` y la función `signOut` de NextAuth para gestionar la sesión del usuario
import { useSession, signOut } from 'next-auth/react'
// Importar el hook `useRouter` de Next.js para manejar la navegación
import { useRouter } from 'next/navigation'
// Importar el componente `Image` de Next.js para la optimización de imágenes
import Image from 'next/image'

// Componente de la página de perfil del usuario
export default function Profile () {
  // Obtener la información de la sesión del usuario y su estado mediante el hook `useSession`
  const { data: session } = useSession()

  // Obtener el router de Next.js para gestionar la navegación
  const router = useRouter()

  // Devolver el contenido JSX para renderizar
  return (
    <div className="w-full h-[calc(100vh-46px)] flex flex-col justify-center items-center">

      {/* Mostrar la imagen de perfil del usuario */}
      <div className='w-[200px] h-[200px] m-4 relative'>
        <Image src={`/assets/images/${session?.user.profileImage}`} className="rounded-full object-cover" layout="fill" alt="profile" />
      </div>

      {/* Mostrar el nombre y apellido del usuario */}
      <h1 className='text-4xl'>{session?.user.name} {session?.user.lastName}</h1>

      {/* Mostrar el correo electrónico del usuario */}
      <h2 className='text-xl'>{session?.user.email}</h2>

      {/* Botón para cerrar sesión */}
      <button className="bg-red-400 hover:bg-red-500 transition duration-300 p-1 px-14 m-5 text-white rounded-sm"
      onClick={() => {
        // Redirigir al usuario a la página de inicio de sesión al hacer clic en "Salir"
        router.push('/login')

        // Cerrar la sesión del usuario sin redirección
        signOut({
          redirect: false
        })
      }}>Salir</button>
    </div>
  )
}
