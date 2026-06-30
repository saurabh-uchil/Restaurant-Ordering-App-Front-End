import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddToMenu from './pages/AddToMenu.tsx';
import ViewMenu from './pages/ViewMenu.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/addToMenu" element={<AddToMenu />} />
        <Route path="/viewMenu" element={<ViewMenu />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
