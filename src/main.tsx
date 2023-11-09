import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './homePage'
import ResPage from './resPage'

const router = createBrowserRouter([
  {
    path: '/home',
    element: <HomePage />
  },
  {
    path: '/home/:title',
    element: <ResPage />
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)