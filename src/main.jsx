import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Bootstrap 5.3 çekirdek stilleri (dahili koyu/açık tema desteği buradan gelir)
import 'bootstrap/dist/css/bootstrap.min.css'
// Tür rozetlerinde emoji yerine kullandığımız vektör ikonlar
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
