import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import Sky from './components/Sky.tsx'
import Planetarium from './components/Planetarium.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Planetarium />
  </StrictMode>,
)
