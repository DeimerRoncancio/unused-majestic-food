import '@/app/styles/register.css'

export default function Register() {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <form className="grid grid-cols-2 gap-6">
                <div className='col-span-2 flex flex-col'>
                    <label>Email</label>
                    <input type="email"></input>
                </div>
                <div className='col-span-2 flex flex-col'>
                    <label>Contraseña</label>
                    <input type="password"></input>
                </div>
                <div className='flex flex-col'>
                    <label>Nombre</label>
                    <input></input>
                </div>
                <div className='flex flex-col'>
                    <label>Apellidos</label>
                    <input></input>
                </div>
            </form>
        </div>
    )
}
