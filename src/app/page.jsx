import Image from 'next/image'
import CardOrder from '../components/card-order'

import { BsSearch } from "react-icons/bs"

import './styles/main-page.css'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className='m-28'>
        <h1 className='text-3xl'>¡Bienvenido de nuevo!</h1>
        <h2>Señor Alejandro Guarin</h2>
      </div>
      <div className="input-container px-6 py-2 mx-60 flex items-center rounded-full ">
        <span className="search-icon"><BsSearch /></span>
        <input className="w-full ml-6 outline-none bg-transparent" placeholder="Buscar"></input>
      </div>
      <section className="order-section m-28 flex flex-wrap">
        <CardOrder />
        <CardOrder />
      </section>
    </main>
  )
}
