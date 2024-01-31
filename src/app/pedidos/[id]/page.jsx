"use client"

// Importación de módulos y paquetes externos
import { v4 as uuid } from 'uuid'
import { useState,useEffect } from 'react'
import { useFetchId } from '@/components/hooks/useFetchId'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useFetch } from '@/components/hooks/useFetch'
import { useDataForm } from '@/components/hooks/useDataForm'
import { useUpdateInfo } from '@/components/hooks/useUpdateInfo'
import { useShowControl } from '@/components/hooks/useShowControl'
import { AiOutlinePlus } from 'react-icons/ai'

// Importación de helpers
import getStorage from '@/components/helpers/getLocalStorage'
import fetchPost from '@/components/helpers/fetchPostData'
import fetchDelete from '@/components/helpers/fetchDeleteData'
import fetchPut from '@/components/helpers/fetchPutData'

// Importación de componentes
import DicamicInputText from '@/components/dinamic-input'
import DinamicTextArea from '@/components/dinamic-text-area'
import DinamicInputDate from '@/components/dinamic-input-date'
import PlatePresentation from '@/components/plate-presentation'
import Button from '@/components/button'
import Plate from '@/components/plate'
import Popup from '@/components/popup'
import CardButton from '@/components/card-button'

// Componente React para manejar y mostrar pedidos
export default function Pedidos({ params }) {
    // Información de sesión de autenticación
    const { data:session } = useSession()

    // Router de Next.js
    const router = useRouter()

    // Variables de estado
    const [showInfo,setShowInfo] = useState(true);
    const [showPopupCategories,setPopupCategories] = useState(false)
    const [allPlates,setAllPlates] = useState([])
    const [cantProducts,setCantProducts] = useState()
    const [price,setPrice] = useState()

    // Hooks personalizados para obtener datos por ID y obtención general de datos
    const { dataId,isLoadingId,errorId } = useFetchId("http://localhost:5000/pedidos",params.id)
    const { data,isLoading,error } = useFetch("http://localhost:5000/platos")

    // Hook personalizado para actualizar información
    const { updateData } = useUpdateInfo({
        url: "http://localhost:5000/pedidos",
        id: params.id,
        urlPut: `http://localhost:5000/pedidos/${params.id}`
    })

    // Hook personalizado para controlar la visibilidad de los campos del formulario
    const { showName,showDescription,showDate,dataControl,showControl } = useShowControl({
        showName: false,
        showDescription: false,
        showDate: false
    })

    // Hook personalizado para gestionar datos del formulario
    const {name,description,date,putDates,dataOrder,setDataOrder} = useDataForm({
        name:'',
        description: '',
        date: ''
    })

    // Obtener información del pedido desde el almacenamiento local
    const order = getStorage("Order");

    // Cerrar la operación y limpiar la información del pedido
    const closeOperation = ()=> {
        order.idOrder = ''
        localStorage.setItem("Order",JSON.stringify(order));
        setShowInfo(false)
    }

    // Establecer información del plato y realizar una solicitud POST
    const setPlate = async(evt,itemCategory)=> {
        evt.preventDefault()

        order.categoria = itemCategory
        order.id = uuid()

        const { data,error } = await fetchPost("http://localhost:5000/platos",order);

        if(!error) {
            setAllPlates([...allPlates,data]);
        } else {
            console.log("Hubo un error.")
        }

        setPopupCategories(false)
        closeOperation()
    }

    // Obtener platos asociados al pedido actual
    const getPlates = ()=> {
        if (!error) {
            const arrayElements = data.filter(item => item.idOrder === params.id)
            arrayElements.sort((a, b) => {
                if (a.categoria === 'Plato principal') {
                    return -1
                }
                if (b.categoria === 'Plato secundario') {
                    return 0
                }
                if (a.categoria === 'Postre') {
                    return 1
                }
            })
            setAllPlates(arrayElements)
        }
        else {
            console.log("No se pudieron resivir los platos.")
        }
    }

    // Calcular el precio total y el número de productos
    const getValues = ()=> {
        let sum = 0
        let cantProds = 0
        allPlates.forEach((item)=> {
            sum += parseInt(item.price)
            cantProds += 1
        })
        setPrice(sum)
        setCantProducts(cantProds)
    }

    // Eliminar el pedido actual y los platos asociados
    const deleteOrder = async()=> {
        allPlates.forEach(async(item)=> {
            const { error } = await fetchDelete(`http://localhost:5000/platos/${item.id}`)

            if(!error) {
                const { error } = await fetchDelete(`http://localhost:5000/pedidos/${params.id}`)
                if(error) return console.log("Hubo un error.")
            } else {
                return console.log(`Hubo un error en el item: ${item.id}`)
            }
        })
    }

    // Manejar el evento de pulsación de tecla para ocultar elementos del formulario
    const hideForm = (evt)=> {
        if(evt.key == "Escape") {
            Object.keys(dataControl).forEach((key)=> {
                showControl(key,false)
            })

            setDataOrder({...dataOrder,
                name:'',
                description: ''
            })
        }
    }

     // Confirmar el pedido y navegar a la página de inicio
    const sendOrder = () => {
        alert("Tu pedido sera enviado, muchas gracias por comprar!")
        router.push("/")
        closeOperation()
        deleteOrder()
    }

    // Eliminar el pedido y navegar a la página de pedidos del usuario
    const trashOrder = ()=> {
        closeOperation()
        deleteOrder()
        router.push("/user-pedidos")
    }

    // Efecto para obtener platos cuando cambian los datos
    useEffect(()=> {
        if(errorId) {
            console.log("Ha ocurrido un error.")
        }
        getPlates()
    },[data,dataId])

    // Efecto para recalcular valores cuando cambia la función getValues
    useEffect(()=> {
        getValues()
    },[getValues])

    // Devolver el contenido JSX para renderizar
    return (
        <>
            {/* Fondo decorativo */}
            <div className="w-[110%] h-[550px] bg-[#76ed78] rounded-b-[50%] top-[-100px] left-[-5%] absolute z-0"></div>

            {/* Contenedor principal */}
            <div className="z-20 p-28 pt-14 relative">
                <div className='w-full flex flex-col items-center'>
                    
                    {/* Sección de información personal */}
                    <div className={`${params.id === order.idOrder && showInfo ? 'w-[$610px]' : 'w-full'}`}>
                        
                        {/* Componente de entrada de texto dinámico para el nombre */}
                        <DicamicInputText
                            show={showName}
                            ifShow={params.id === order.idOrder && showInfo}
                            loading={isLoadingId}
                            value={dataId.name}
                            clickEdit={()=> showControl("showName",true)}
                            submit={updateData}
                            hidde={hideForm}
                            inputName="name"
                            inputValue={name}
                            putValues={putDates}
                            clickDelete={()=> {showControl("showName",false); setDataOrder({...dataOrder,name:''})}}
                        />

                        {/* Nombre del usuario */}
                        <h3>
                            {session?.user.name == undefined ?
                            'Loading...' :
                            session?.user.name + ' ' + session?.user.lastName}
                        </h3>

                        {/* Sección de platos y acciones */}
                        <div className={`flex w-full justify-center flex-col mt-10
                        ${params.id === order.idOrder && showInfo  ? '' : 'hidden' }`}>
                            
                            {/* Presentación de plato */}
                            <PlatePresentation />
                            
                            {/* Botones de acción */}
                            <div className='flex justify-between mt-14'>
                                <Button
                                    textContent="Añadir al pedido"
                                    bgColor="#3ea440"
                                    bgColorHover="#348935"
                                    padding="0.5rem"
                                    width='45%'
                                    textColor='white'
                                    textWidth="1.25rem"
                                    lineHeight="1.75rem"
                                    handleClick={()=> setPopupCategories(true)}
                                />

                                <Button
                                    textContent="Cancelar operación"
                                    bgColor="white"
                                    bgColorHover="rgb(252 165 165)"
                                    padding="0.5rem"
                                    width='45%'
                                    textColor='black'
                                    textWidth="1.25rem"
                                    lineHeight="1.75rem"
                                    handleClick={closeOperation}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Detalles del pedido */}
                    <div className="flex w-full pt-14 flex-col">
                        {/* Detalles adicionales del pedido (text area, input date) */}         
                        <h2 className="text-xl">Detalles del pedido</h2>
                        
                        <div className='flex'>
                            {/* Otros componentes de entrada dinámica (text area, input date) */}
                            <div className='max-w-[50%] mr-14'>
                                <DinamicTextArea
                                    show={showDescription}
                                    value={dataId.description}
                                    clickEdit={()=> showControl("showDescription",true)}
                                    hidde={hideForm}
                                    areaName="description"
                                    areaValue={description}
                                    putValues={putDates}
                                    submit={updateData}
                                    clickDelete={()=> {showControl("showDescription",false); setDataOrder({...dataOrder,description:''})}}
                                />
                            </div>
                            <div>
                                <DinamicInputDate
                                    show={showDate}
                                    clickEdit={()=> showControl("showDate",true)}
                                    value={dataId.date?.day + '/' + dataId.date?.month + '/' + dataId.date?.year + ' - ' +
                                    dataId.date?.hours + ':' + dataId.date?.minutes}
                                    submit={updateData}
                                    hidde={hideForm}
                                    inputDateName="date"
                                    inputDateValue={date}
                                    putValues={putDates}
                                    clickDelete={()=> showControl("showDate",false)}
                                />
                            </div>
                        </div>

                        {/*Platos del pedido actual*/}
                        <h2 className='text-xl mt-4'>Platos del pedido</h2>

                        {/* Grid de platos */}
                        <div className="grid grid-cols-3 gap-14 mt-9">

                            {/* Iteración sobre platos */}
                            {isLoading ?
                            'Loading...' :
                            allPlates.map((item) => (
                                <Plate
                                    key={item.id}
                                    nombre={item.nombre}
                                    precio={item.price}
                                    categoria={item.categoria}
                                    imagen={item.imagen}
                                    id={item.id}
                                />
                            ))}

                            {/* Botón para añadir artículo */}
                            <button className="flex p-4 bg-white shadow-[0_0_10px_#a9a9a9] rounded-xl"
                            onClick={()=> {
                                router.push('/')
                            }}>
                                {/* Contenido del botón */}
                                <div className="flex w-[40%] flex-col justify-between">
                                    <h3>Añadir Articulo</h3>
                                </div>

                                <div className='flex w-[60%] h-[120px] relative justify-center'>
                                    <AiOutlinePlus className='w-full h-full text-[#a3a3a3]' />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Información de cantidad de productos y valor del pedido */}
                <div className='flex mt-14'>
                    <div className='flex'>
                        <h2>Cantidad de productos:</h2><h2 className='text-[#3da443] ml-2'>{cantProducts}</h2>
                    </div>
                    <div className='flex ml-14'>
                        <h2>Valor del pedido:</h2><h2 className='text-[#3da443] ml-2'>${price}</h2>
                    </div>
                </div>

                {/* Botones de acción final */}
                <div className='flex'>
                    <div className='my-14 mr-4'>
                        <Button
                            textContent="Enviar pedido"
                            bgColor="#3ea440"
                            bgColorHover="#348935"
                            padding="0.25rem"
                            width='195.95px'
                            textColor='white'
                            textWidth="1.25rem"
                            lineHeight="1.75rem"
                            handleClick={sendOrder}
                        />
                    </div>

                    <div className='my-14 ml-4'>
                        <Button
                            textContent="Eliminar"
                            bgColor="white"
                            bgColorHover="rgb(252 165 165)"
                            padding="0.25rem"
                            width='141.61px'
                            textColor='black'
                            textWidth="1.125rem"
                            lineHeight="1.75rem"
                            handleClick={trashOrder}
                        />
                    </div>
                </div>
            </div>

            {/* Popup de Categorías de Platos */}
            <Popup 
            ifShow={showPopupCategories}
            bgColor="[#22222298]"
            onClickButton={() => setPopupCategories(false)}
            onClickBackground={()=> setPopupCategories(false)}>
                <CardButton
                    onClick={(evt)=> setPlate(evt,"Plato principal")}
                    url="https://especiales.peru21.pe/como-preparar-pavo-horno-otros-platillos-cena-navidad-nndd-p21visual/img/recetas/pavo-al-horno.png?vbf"
                    primaryText="Plato principal"
                    secondaryText="Es el plato inicial de la carta."
                />

                <CardButton
                    onClick={(evt)=> setPlate(evt,"Plato secundario")}
                    url="https://deliciaskitchen.com/wp-content/uploads/2023/02/sopa-de-verduras-saludable-receta-detox.jpg"
                    primaryText="Plato secundario"
                    secondaryText="Es el plato que acompaña al plato inicial."
                />

                <CardButton
                    onClick={(evt)=> setPlate(evt,"Bebida")}
                    url="https://cdn.aarp.net/content/dam/aarp/food/recipes/2018/10/1140-limofresa-gas-drink-esp.jpg"
                    primaryText="Bebida"
                    secondaryText="Agua, gaseosa o jugo para acompañar la cena."
                />

                <CardButton
                    onClick={(evt)=> setPlate(evt,"Postre")}
                    url="https://cloudfront-us-east-1.images.arcpublishing.com/elespectador/QGE4K3AENJDJRBOCC5APKEG3DI.jpg"
                    primaryText="Postre"
                    secondaryText="Acompañamiento dulce para el final de la cena."
                />
            </Popup>
        </>
    )
}
