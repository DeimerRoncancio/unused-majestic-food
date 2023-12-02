import { useEffect,useState,useRef } from 'react'
import { TiDelete } from 'react-icons/ti'
import { FaEdit } from 'react-icons/fa'
import EditButton from './edit-button'

export default function InputText({show,ifShow,loading,name,clickEdit,submit,hidde,inputName,inputValue,putValues,
clickDelete}) {
    const [widthName,setWidthName] = useState('')
    const formRef = useRef(null)

    useEffect(()=> {
        if(name) {
            setWidthName(name.length - 4)
        }
    },[loading])

    useEffect(()=> {
        if(show) formRef.current.focus()
    },[show])
    
    return (
        <>
            <div className={`flex ${show ? 'hidden' : ''}`}>
                <h2 className={`text-2xl ${ifShow ? 'w-[calc(100%-16px)]' : 'mr-4'}`}>
                    {loading ? 'Loading...' : name}
                </h2>
                <EditButton onClick={clickEdit} textColor="green-800" hoverTextColor="green-900"/>
            </div>
            <form onSubmit={submit} className={`${show ? '' : 'hidden'} flex ${ifShow ? 'justify-between' : ''}`}
            onKeyDown={hidde}>
                <input ref={formRef} style={{maxWidth:'310px'}} className={`text-2xl 
                    ${ifShow ? 'w-[calc(100%-50px)]' : ''} `}
                    name={inputName} value={inputValue}
                    onChange={putValues}
                    placeholder={name}
                    size={inputValue.length || widthName}
                    maxLength={25}
                />
                <span className='text-3xl text-red-600 cursor-pointer' onClick={clickDelete}>
                    <TiDelete />
                </span>
            </form>
        </>
    )
}