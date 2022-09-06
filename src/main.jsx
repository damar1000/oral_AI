import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer, Slide } from "react-toastify"
import { BrowserRouter } from "react-router-dom"
import App from './App'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer theme="dark" transition={Slide} />
    </BrowserRouter>
  </React.StrictMode>
)
