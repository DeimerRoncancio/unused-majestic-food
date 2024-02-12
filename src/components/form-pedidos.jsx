import { v4 as uuid } from 'uuid'
import { ApiError } from '@/errors'

import { useDataForm } from './hooks/useDataForm'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import fetchPost from '@/components/helpers/fetchPostData'
import getDataForm from './helpers/getFormData'
import getStorage from './helpers/getLocalStorage'
import getDate from './helpers/getDate'

export default function FormPedidos () {
  const { data: session } = useSession()

  const router = useRouter()

  const { name, description, date, putDates } = useDataForm({
    name: '',
    description: '',
    date: ''
  })

  const readForm = (evt) => {
    evt.preventDefault()

    const allData = getDataForm(evt.target)
    allData.id = uuid()
    allData.idUser = session?.user.id

    const dataStorage = getStorage('Order')
    dataStorage.idOrder = allData.id

    allData.date = getDate(allData.date)
    localStorage.setItem('Order', JSON.stringify(dataStorage))

    fetchPost({ url: 'http://localhost:5000/pedidos', body: allData })
      .then(res => res.json())
      .then(data => router.push(`/pedidos/${data.id}`))
      .catch(err => {
        if (err instanceof ApiError) console.log('Hubo un error, no se encontro el recurso.')
      })
  }

  return (
    <form className="flex flex-col h-[90%] justify-center items-center" onSubmit={readForm}>
      <div className='flex flex-col'>
        <h1 className='self-center font-mono text-xl'>CREAR PEDIDO</h1>

        <label className='m-2 ' htmlFor='nameOrder'>Nombre del pedido:</label>
        <input
          id="nameOrder" name="name" className="m-2 bg-zinc-100 p-2 rounded-md border-b-2
          focus:border-green-500 outline-none" type="text" placeholder="Nombre del pedido"
          value={name} onChange={putDates}
        />

        <label className='m-2' htmlFor='descriptionOrder'>Descripción</label>
        <textarea
          id='descriptionOrder' name='description' className='m-2 bg-zinc-100 p-2 rounded-md
          border-b-2 focus:border-green-500 outline-none' placeholder="Descripción"
          value={description} onChange={putDates}
        />

        <label className='m-2' htmlFor='dateOrder'>Fecha de entrega</label>
        <input
          id='dateOrder' name='date' className='m-2 bg-zinc-100 p-2 rounded-md border-b-2
          focus:border-green-500 outline-none' type="datetime-local" value={date} onChange={putDates}
        />

        <button className="m-2 p-2 bg-green-500 rounded-md">
          Crear
        </button>
      </div>
    </form>
  )
}
