import { useState } from 'react'

export default function FetchPedidos() {
    const [nameOrder,setOrder] = useState('');
    const [id,setId] = useState('')
    
    const putName = ({target}) => {
        setOrder(target.value);
    }

    const putId = ({target})=> {
        setId(target.value);
    }

    const readFile = async(evt)=> {
        evt.preventDefault();

        const data = new FormData(evt.currentTarget);
        const allData = Object.fromEntries(data);

        try {
            const peticion = await fetch("http://localhost:5000/pedidos",{
                method: 'POST',
                headers: {'content-type':'application/json'},
                body: JSON.stringify(allData)
            });
            console.log(peticion);
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <form
        className="flex flex-col"
        onSubmit={readFile}>
            <label className='m-2 ' htmlFor='id'>Id del pedido:</label>
            <input 
                id="id" name="id" className="m-2 bg-zinc-100 p-2" type="text" 
                placeholder="Nombre del pedido" value={id} onChange={putId} 
            />
            <label className='m-2 ' htmlFor='nameOrder'>Nombre del pedido:</label>
            <input 
                id="nameOrder" name="nameOrder" className="m-2 bg-zinc-100 p-2" type="text" 
                placeholder="Nombre del pedido" value={nameOrder} onChange={putName} 
            />
            <button className="m-2 p-2 bg-teal-500" type="submit">
                Crear
            </button>
        </form>
    )
}
