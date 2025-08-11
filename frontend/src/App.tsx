import { createBrowserRouter, RouterProvider } from 'react-router'

import Index from './Pages/Index/Index'
import ErrorNotFound from './Pages/Error/ErrorNotFound'

import './App.css'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Index />,
      errorElement: <ErrorNotFound />
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
