'use client'

import { Toaster } from "react-hot-toast"

export const ToasterContext = () => {
  return (
    <Toaster toastOptions={{
      className: 'dark:bg-gray-800 dark:text-white',
      position: 'top-right',
    }}/>
  ) 
}