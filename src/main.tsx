import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddToMenu from './pages/AddToMenu.tsx';
import ViewMenu from './pages/ViewMenu.tsx';
import EditMenuItem from './pages/EditMenuItem.tsx';
import AddFoodItem from './pages/AddFoodItem.tsx';
import TestPage from './pages/TestPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/addToMenu" element={<AddToMenu />} />
        <Route path="/addFoodItem" element={<AddFoodItem />} />
        <Route path="/viewMenu" element={<ViewMenu />} />
        <Route path="/editMenuItem/:id" element={<EditMenuItem />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
