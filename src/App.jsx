import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'

function App() {
const router = createBrowserRouter([
  {
    path:"/",
    element: <LoginPage />
  },
])

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
