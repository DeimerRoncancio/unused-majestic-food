import { v4 as uuid } from 'uuid'
import { useDataForm } from './hooks/useDataForm'
import { useRouter } from 'next/navigation'

export default function FormPedidos() {
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
        
        const item = localStorage.getItem("Order");
        const dataStorage = JSON.parse(item);
        dataStorage.idOrder = allData.id;

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
        <form
        className="flex flex-col"
        onSubmit={readFile}>
            <label className='m-2 ' htmlFor='nameOrder'>Nombre del pedido:</label>
            <input 
                id="nameOrder" name="name" className="m-2 bg-zinc-100 p-2" type="text" 
                placeholder="Nombre del pedido" value={name} onChange={putDates} 
            />

            <label className='m-2' htmlFor='descriptionOrder'>Descripción</label>
            <textarea 
                id='descriptionOrder' name='description' className='m-2 bg-zinc-100 p-2' 
                placeholder="Descripción" value={description} onChange={putDates}
            />

            <label className='m-2' htmlFor='dateOrder'>Fecha de entrega</label>
            <input id='dateOrder' name='date' className='m-2 bg-zinc-100 p-2' type="datetime-local" 
                value={date} onChange={putDates}
            />

            <button className="m-2 p-2 bg-teal-500">
                Crear
            </button>
        </form>
    )
}
