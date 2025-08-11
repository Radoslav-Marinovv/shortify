import { createBrowserRouter, RouterProvider } from 'react-router'

import Index from './Pages/Index/Index'

import './App.css'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Index />,
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
