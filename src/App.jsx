
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import AddUser from './components/AddUser'

function App() {
const router = createBrowserRouter([
  {
    path:"/",
    element: <LoginPage />
  },
])




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

  )
}

export default App
