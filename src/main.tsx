import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './homePage'
import ResPage from './resPage'
import LoginPage from './loginPage';
import LogoutPage from './logoutPage';

const router = createBrowserRouter([
  {
    path:'/login',
    element: <LoginPage />
  },
  {
    path:'/logout',
    element: <LogoutPage />
  },
  {
    path: '/resources',
    element: <HomePage />
  },
  {
    path: '/resources/:title',
    element: <ResPage />
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)