import { useState } from 'react'

export function useShowControl(data = {}) {
    const [dataControl,setDataControl] = useState(data)

    const showControl = (name,value)=> {
        setDataControl({...dataControl,[name]:value})
    }
    
    return {
        ...dataControl,
        showControl
    }
}