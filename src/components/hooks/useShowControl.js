import { useState } from 'react'

export function useShowControl (data = {}) {
  const [dataControl, setDataControl] = useState(data)

  const showNothing = () => {
    Object.keys(dataControl).forEach((key) => {
      dataControl[key] = false
    })
  }

  const showControl = (name, value) => {
    showNothing()
    setDataControl({ ...dataControl, [name]: value })
  }

  return {
    ...dataControl,
    dataControl,
    showControl
  }
}
