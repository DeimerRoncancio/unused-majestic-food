import { v4 as uuid } from 'uuid'
import { useDataForm } from './hooks/useDataForm'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function FormPedidos({category}) {
    const { data:session,status } = useSession()
    const router = useRouter();

    const {name,description,date,putDates} = useDataForm({
        name: '',
        description: '',
        date: ''
    });

    const readFile = async(evt)=> {
        evt.preventDefault();
        
        const data = new FormData(evt.currentTarget);
        const allData = Object.fromEntries(data);
        allData.id = uuid();
        allData.idUser = session?.user.id
        
        const item = localStorage.getItem("Order");
        const dataStorage = JSON.parse(item);
        dataStorage.idOrder = allData.id;

        const dateTarget = new Date(allData.date)
        const dateOrder = {
            year: dateTarget.getFullYear(),
            month: dateTarget.getMonth() + 1,
            day: dateTarget.getDate(),
            hours: dateTarget.getHours(),
            minutes: dateTarget.getMinutes()
        }
        
        allData.date = dateOrder

        localStorage.setItem("Order",JSON.stringify(dataStorage));

        try {
            const response = await fetch("http://localhost:5000/pedidos",{
                method: 'POST',
                headers: {'content-type':'application/json'},
                body: JSON.stringify(allData)
            }).then(res => res.json());
            router.push(`pedidos/${response.id}`)
        } catch(err) {
            console.error(err);
        }

    }

    return (
        <form className="flex flex-col h-[90%] justify-center items-center" onSubmit={readFile}>
            <div className='flex flex-col'>
                <h1 className='self-center font-mono text-xl'>CREAR PEDIDO</h1>
                <label className='m-2 ' htmlFor='nameOrder'>Nombre del pedido:</label>
                <input 
                    id="nameOrder" name="name" className="m-2 bg-zinc-100 p-2 rounded-md border-b-2 focus:border-green-500 outline-none" type="text" 
                    placeholder="Nombre del pedido" value={name} onChange={putDates} 
                />

                <label className='m-2' htmlFor='descriptionOrder'>Descripción</label>
                <textarea 
                    id='descriptionOrder' name='description' className='m-2 bg-zinc-100 p-2 rounded-md border-b-2 focus:border-green-500 outline-none' 
                    placeholder="Descripción" value={description} onChange={putDates}
                />

                <label className='m-2' htmlFor='dateOrder'>Fecha de entrega</label>
                <input id='dateOrder' name='date' className='m-2 bg-zinc-100 p-2 rounded-md border-b-2 focus:border-green-500 outline-none' type="datetime-local" 
                    value={date} onChange={putDates}
                />

                <button className="m-2 p-2 bg-green-500 rounded-md">
                    Crear
                </button>
            </div>
                
        </form>
    )
}
