'use client'

import { useDataForm } from '@/components/hooks/useDataForm'

import { signIn } from 'next-auth/react'

import { useRouter } from 'next/navigation'

import Link from 'next/link'

export default function Login () {
  const router = useRouter()

  const { email, password, putDates } = useDataForm({
    email: '',
    password: ''
  })

  const sendUser = async (evt) => {
    evt.preventDefault()

    const dataForm = new FormData(evt.target)

    const signin = await signIn('credentials', {
      email: dataForm.get('email'),
      password: dataForm.get('password'),
      redirect: false
    })

    if (signin.ok) return router.push('/')
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <form className="grid grid-cols-2 gap-6" onSubmit={sendUser}>
        <div className='col-span-2 flex flex-col'>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" onChange={putDates} value={email}></input>
        </div>

        <div className='col-span-2 flex flex-col'>
          <label htmlFor="password">Contraseña</label>
          <input type="password" name="password" onChange={putDates} value={password}></input>
        </div>

        <button className="col-span-2">Iniciar sesión</button>
      </form>

      <div className='flex'>
        <h4 className='mr-2'>¿Aun no tienes cuenta?</h4>
        <Link href='/register'>
            <h4 className='text-green-700'>¡Registrate!</h4>
        </Link>
      </div>
    </div>
  )
}
