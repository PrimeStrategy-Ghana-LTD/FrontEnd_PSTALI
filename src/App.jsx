
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import SearchPage from './pages/SearchPage'

function App() {
const router = createBrowserRouter([
  {
    path:"/",
    element: <LoginPage />
  },
  {
    path:"/search",
    element: <SearchPage />
  },
])


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
    <>
    <RouterProvider router={router} />
    </>

  <RouterProvider router={router}/>

  )
}

export default App
