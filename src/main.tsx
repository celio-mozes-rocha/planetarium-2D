import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Planetarium from './components/Planetarium.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Planetarium />
  </StrictMode>,
)
