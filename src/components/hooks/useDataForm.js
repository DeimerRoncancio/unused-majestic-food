import { useState,useEffect } from 'react'

export function useDataForm(order = {}) {
    const [dataOrder,setDataOrder] = useState(order);

    
    const putDates = ({target})=> {
        const {name,value} = target;
        setDataOrder({
            ...dataOrder,
            [name]: value
        });
    }
    
    return {
        ...dataOrder,
        putDates
    };
}
