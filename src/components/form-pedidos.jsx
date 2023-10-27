import { useState } from 'react'
import { useDataForm } from './hooks/useDataForm'

export default function FormPedidos() {
    const {id,name,putDates} = useDataForm({
        id: '',
        name: ''
    });
    
    const readFile = async(evt)=> {
        evt.preventDefault();

        const data = new FormData(evt.currentTarget);
        const allData = Object.fromEntries(data);

        try {
            await fetch("http://localhost:5000/pedidos",{
                method: 'POST',
                headers: {'content-type':'application/json'},
                body: JSON.stringify(allData)
            });
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
                placeholder="Nombre del pedido" value={id} onChange={putDates} 
            />
            <label className='m-2 ' htmlFor='nameOrder'>Nombre del pedido:</label>
            <input 
                id="nameOrder" name="name" className="m-2 bg-zinc-100 p-2" type="text" 
                placeholder="Nombre del pedido" value={name} onChange={putDates} 
            />
            <button className="m-2 p-2 bg-teal-500">
                Crear
            </button>
        </form>
    )
}
