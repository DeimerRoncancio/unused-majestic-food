'use client'

import { v4 as uuid } from 'uuid'
import { useState, useEffect } from 'react'
import { useFetchId } from '@/components/hooks/useFetchId'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useFetch } from '@/components/hooks/useFetch'
import { useDataForm } from '@/components/hooks/useDataForm'
import { useUpdateInfo } from '@/components/hooks/useUpdateInfo'
import { useShowControl } from '@/components/hooks/useShowControl'
import { AiOutlinePlus } from 'react-icons/ai'

import getStorage from '@/components/helpers/getLocalStorage'
import fetchPost from '@/components/helpers/fetchPostData'
// import fetchDataId from '@/components/helpers/fetchDataId'
import fetchDelete from '@/components/helpers/fetchDeleteData'
// import fetchPut from '@/components/helpers/fetchPutData'

import DicamicInputText from '@/components/dinamic-input'
import DinamicTextArea from '@/components/dinamic-text-area'
import DinamicInputDate from '@/components/dinamic-input-date'
import PlatePresentation from '@/components/plate-presentation'
import Button from '@/components/button'
import Plate from '@/components/plate'
import Popup from '@/components/popup'
import CardButton from '@/components/card-button'

export default function Pedidos ({ params }) {
  const [showInfo, setShowInfo] = useState(true)
  const [showPopupCategories, setPopupCategories] = useState(false)
  const [allPlates, setAllPlates] = useState([])
  const [cantProducts, setCantProducts] = useState()
  const [price, setPrice] = useState()

  const { data: session } = useSession()

  const router = useRouter()

  const { dataId, isLoadingId, errorId } = useFetchId('http://localhost:5000/pedidos', params.id)
  const { data, isLoading, error } = useFetch('http://localhost:5000/platos')

  const { updateData } = useUpdateInfo({
    url: 'http://localhost:5000/pedidos',
    id: params.id,
    urlPut: `http://localhost:5000/pedi/${params.id}`
  })

  const { showName, showDescription, showDate, dataControl, showControl } = useShowControl({
    showName: false,
    showDescription: false,
    showDate: false
  })

  const { name, description, date, putDates, dataOrder, setDataOrder } = useDataForm({
    name: '',
    description: '',
    date: ''
  })

  const order = getStorage('Order')

  const closeOperation = () => {
    order.idOrder = ''
    localStorage.setItem('Order', JSON.stringify(order))
    setShowInfo(false)
  }

  const setPlate = async (evt, itemCategory) => {
    evt.preventDefault()

    order.categoria = itemCategory
    order.id = uuid()

    const { data, error } = await fetchPost('http://localhost:5000/platos', order)

    if (!error) {
      setAllPlates([...allPlates, data])
    } else {
      console.log('Hubo un error.')
    }

    setPopupCategories(false)
    closeOperation()
  }

  const getPlates = () => {
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

        return -1
      })
      setAllPlates(arrayElements)
    } else {
      console.log('No se pudieron resivir los platos.')
    }
  }

  const getValues = () => {
    let sum = 0
    let cantProds = 0
    allPlates.forEach((item) => {
      sum += parseInt(item.price)
      cantProds += 1
    })
    setPrice(sum)
    setCantProducts(cantProds)
  }

  const deleteOrder = () => {
    let thereIsPlates = false
    const killOrder = () => fetchDelete(`http://localhost:5000/pedidos/${params.id}`)
      .catch(err => console.log(err))

    allPlates.forEach(() => {
      thereIsPlates = true
    })

    if (thereIsPlates) {
      allPlates.map(async item => {
        fetchDelete(`http://localhost:5000/platos/${item.id}`)
          .then(() => killOrder())
          .catch(err => console.log(err))
      })
    } else {
      killOrder()
    }
  }

  const hideForm = (evt) => {
    if (evt.key === 'Escape') {
      Object.keys(dataControl).forEach((key) => {
        showControl(key, false)
      })

      setDataOrder({
        ...dataOrder,
        name: '',
        description: ''
      })
    }
  }

  const sendOrder = () => {
    alert('Tu pedido sera enviado, muchas gracias por comprar!')
    router.push('/')
    closeOperation()
    deleteOrder()
  }

  const trashOrder = () => {
    closeOperation()
    deleteOrder()
    // router.push("/user-pedidos")
  }

  useEffect(() => {
    if (errorId) {
      console.log('Ha ocurrido un error.')
    }
    getPlates()
  }, [data])

  useEffect(() => {
    getValues()
  }, [getValues])

  return (
    <>
      <div className="w-[110%] h-[550px] bg-[#76ed78] rounded-b-[50%] top-[-100px] left-[-5%] absolute z-0"></div>

      <div className="z-20 p-28 pt-14 relative">
        <div className='w-full flex flex-col items-center'>

          <div className={`${params.id === order.idOrder && showInfo ? 'w-[$610px]' : 'w-full'}`}>

            <DicamicInputText
              show={showName}
              ifShow={params.id === order.idOrder && showInfo}
              loading={isLoadingId}
              value={dataId.name}
              clickEdit={() => showControl('showName', true)}
              submit={updateData}
              hidde={hideForm}
              inputName="name"
              inputValue={name}
              putValues={putDates}
              clickDelete={() => { showControl('showName', false); setDataOrder({ ...dataOrder, name: '' }) }}
            />

            <h3>
              {session?.user.name === undefined
                ? 'Loading...'
                : session?.user.name + ' ' + session?.user.lastName}
            </h3>

            <div className={`flex w-full justify-center flex-col mt-10
            ${params.id === order.idOrder && showInfo ? '' : 'hidden'}`}>

              <PlatePresentation />

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
                  handleClick={() => setPopupCategories(true)}
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

          <div className="flex w-full pt-14 flex-col">
            <h2 className="text-xl">Detalles del pedido</h2>

            <div className='flex'>
              <div className='max-w-[50%] mr-14'>
                <DinamicTextArea
                  show={showDescription}
                  value={dataId.description}
                  clickEdit={() => showControl('showDescription', true)}
                  hidde={hideForm}
                  areaName="description"
                  areaValue={description}
                  putValues={putDates}
                  submit={updateData}
                  clickDelete={() => { showControl('showDescription', false); setDataOrder({ ...dataOrder, description: '' }) }}
                />
              </div>
              <div>
                <DinamicInputDate
                  show={showDate}
                  clickEdit={() => showControl('showDate', true)}
                  value={dataId.date?.day + '/' + dataId.date?.month + '/' + dataId.date?.year + ' - ' +
                    dataId.date?.hours + ':' + dataId.date?.minutes}
                  submit={updateData}
                  hidde={hideForm}
                  inputDateName="date"
                  inputDateValue={date}
                  putValues={putDates}
                  clickDelete={() => showControl('showDate', false)}
                />
              </div>
            </div>

            <h2 className='text-xl mt-4'>Platos del pedido</h2>

            <div className="grid grid-cols-3 gap-14 mt-9">

              {isLoading
                ? 'Loading...'
                : allPlates.map((item) => (
                  <Plate
                    key={item.id}
                    nombre={item.nombre}
                    precio={item.price}
                    categoria={item.categoria}
                    imagen={item.imagen}
                    id={item.id}
                  />
                ))}

              <button className="flex p-4 bg-white shadow-[0_0_10px_#a9a9a9] rounded-xl"
                onClick={() => {
                  router.push('/')
                }}>
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

        <div className='flex mt-14'>
          <div className='flex'>
            <h2>Cantidad de productos:</h2><h2 className='text-[#3da443] ml-2'>{cantProducts}</h2>
          </div>
          <div className='flex ml-14'>
            <h2>Valor del pedido:</h2><h2 className='text-[#3da443] ml-2'>${price}</h2>
          </div>
        </div>

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

      <Popup
        ifShow={showPopupCategories}
        bgColor="[#22222298]"
        onClickButton={() => setPopupCategories(false)}
        onClickBackground={() => setPopupCategories(false)}>
        <CardButton
          onClick={(evt) => setPlate(evt, 'Plato principal')}
          url="https://especiales.peru21.pe/como-preparar-pavo-horno-otros-platillos-cena-navidad-nndd-p21visual/img/recetas/pavo-al-horno.png?vbf"
          primaryText="Plato principal"
          secondaryText="Es el plato inicial de la carta."
        />

        <CardButton
          onClick={(evt) => setPlate(evt, 'Plato secundario')}
          url="https://deliciaskitchen.com/wp-content/uploads/2023/02/sopa-de-verduras-saludable-receta-detox.jpg"
          primaryText="Plato secundario"
          secondaryText="Es el plato que acompaña al plato inicial."
        />

        <CardButton
          onClick={(evt) => setPlate(evt, 'Bebida')}
          url="https://cdn.aarp.net/content/dam/aarp/food/recipes/2018/10/1140-limofresa-gas-drink-esp.jpg"
          primaryText="Bebida"
          secondaryText="Agua, gaseosa o jugo para acompañar la cena."
        />

        <CardButton
          onClick={(evt) => setPlate(evt, 'Postre')}
          url="https://cloudfront-us-east-1.images.arcpublishing.com/elespectador/QGE4K3AENJDJRBOCC5APKEG3DI.jpg"
          primaryText="Postre"
          secondaryText="Acompañamiento dulce para el final de la cena."
        />
      </Popup>
    </>
  )
}
