"use client"

import {useDataForm} from '@/components/hooks/useDataForm'
import '@/app/styles/register.css'

export default function Register() {
    const { email,password,name,lastName,putDates } = useDataForm({
        email: '',
        password: '',
        name: '',
        lastName: ''
    })
    
    const sendUser = async(evt)=> {
        evt.preventDefault()

        const dataForm = new FormData(evt.target)
        const data = Object.fromEntries(dataForm)
        

        try {
            await fetch('http://localhost:5000/usuarios',{
                method: 'POST',
                headers: {'content-type':'application/json'},
                body: JSON.stringify(data)
            });
        } catch(err) {
            console.error(err)
        }
    }
    
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <form className="grid grid-cols-2 gap-6" onSubmit={sendUser}>
                <div className='col-span-2 flex flex-col'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" onChange={putDates} value={email}></input>
                </div>
                <div className='col-span-2 flex flex-col'>
                    <label  htmlFor="password">Contraseña</label>
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
                <button className="col-span-2">Crear cuenta</button>
            </form>
        </div>
    )
}
