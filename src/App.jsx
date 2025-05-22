import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AddUser from './components/AddUser'






  const router = createBrowserRouter([
   {
    path: "/",
  element: <AddUser/>
   
    
   }
  ])
function App() {
  return (
  <RouterProvider router={router}/>
  )
}

export default App
