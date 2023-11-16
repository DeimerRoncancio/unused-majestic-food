"use client"

import { IoExit } from "react-icons/io5"
import { useSession,signOut } from 'next-auth/react'
import Link from 'next/link'
import profile from '@/../public/assets/images/profile-image.webp'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import './styles/navbar.css'

export default function NavBar() {
    const { data:session,status } = useSession();
    const router = useRouter()

    return (
        <nav className='w-screen fixed bg-transparent z-30'>
            <div className="nav-styles flex p-2 mx-10 rounded-b-[15px] shadow-lg">
                <h2 className='nav-brand m-auto ml-1 mr-[120px]'>Majestic Food</h2>
                <ul className='flex'>
                    <li className='m-auto'>
                        <Link href='/' className='nav-item mr-5'>
                            <span></span>
                            <span>Inicio</span>
                        </Link>
                    </li>
                    <li className='m-auto'>
                        <Link href='/tienda' className='nav-item mr-5'>
                            <span></span>
                            <span>Tienda</span>
                        </Link>
                    </li>
                </ul>
                <div className='ml-auto flex w-[100px] relative'>
                    <div className="img-profile w-[55px] h-[55px] absolute rounded-full shadow-lg object-cover">
                        <Image src={`/assets/images/${session?.user.profileImage}`} className="rounded-full" layout="fill" alt="profile"/>
                    </div>
                    <button className='ml-auto' onClick={()=> {
                        signOut()
                        router.push("/login")
                    }}>
                        <span className="icon-setting text-3xl"><IoExit /></span>
                    </button>
                </div>
            </div>
        </nav>
    )
}
