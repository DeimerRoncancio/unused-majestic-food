export default function FormPedidos() {
    const getData = async ()=> {
        try {
            let peticion = await fetch("http://localhost:5000/pedidos",{
                method: 'POST',
                headers: {'content-type':'application/json'},
                body: JSON.stringify({
                    nombre:"Deimer",
                    id:4
                })
            });
            console.log(peticion);
        } catch(err) {
            console.error(err);
        }
    }
    
    const readFile = (evt)=> {
        evt.preventDefault();
        getData();
    }

    return (
        <form
        className="flex flex-col"
        onSubmit={readFile}>
            <label className='m-2 '>Nombre del pedido:</label>
            <input className="m-2 bg-zinc-100 p-2" type="text" placeholder="Nombre del pedido" />
            <button
            className="m-2 p-2 bg-teal-500">
                Crear
            </button>
        </form>
    )
}
