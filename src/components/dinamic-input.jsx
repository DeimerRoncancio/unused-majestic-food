import { useEffect,useState } from 'react'
import { TiDelete } from 'react-icons/ti'
import { FaEdit } from 'react-icons/fa'

export default function InputText({show,ifShow,loading,name,clickEdit,submit,hidde,refer,inputName,inputValue,
putValues,clickDelete}) {
    const [widthName,setWidthName] = useState('')

    useEffect(()=> {
        if(name) {
            setWidthName(name.length - 4)
        }
    },[!loading])
    
    return (
        <>
            <div className={`flex ${show ? 'hidden' : ''}`}>
                <h2 className={`text-2xl ${ifShow ? 'w-[calc(100%-16px)]' : 'mr-4'}`}>
                    {loading ? 'Loading...' : name}
                </h2>
                <button onClick={clickEdit}>
                    <span className=' text-green-800'>
                        <FaEdit />
                    </span>
                </button>
            </div>
            <form onSubmit={submit} className={`${show ? '' : 'hidden'} flex 
            ${ifShow ? 'justify-between' : ''}`}
            onKeyDown={hidde}>
                <input ref={refer} style={{maxWidth:'90%'}} className={`text-2xl 
                    ${ifShow ? 'w-[calc(100%-50px)]' : ''} `}
                    name={inputName} value={inputValue}
                    onChange={putValues}
                    placeholder={name}
                    size={inputValue.length || widthName}
                />
                <span className='text-3xl text-red-600 cursor-pointer' onClick={clickDelete}>
                    <TiDelete />
                </span>
            </form>
        </>
    )
}