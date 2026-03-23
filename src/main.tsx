import React from 'react'
import ReactDOM from 'react-dom/client'
import { StoreProvider } from './TaskContext'
import MainAdda from './MainLayout'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <MainAdda />
    </StoreProvider>
  </React.StrictMode>,
)