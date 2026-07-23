import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddToMenu from './pages/AddToMenu.tsx';
import ViewMenu from './pages/ViewMenu.tsx';
import EditMenuItem from './pages/EditMenuItem.tsx';
import AddFoodItem from './pages/AddFoodItem.tsx';
import Register from './pages/Register.tsx';
import Login from './pages/Login.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Stats from './components/DashboardComponents/Stats.tsx';
import Menu from './components/DashboardComponents/Menu.tsx';
import Staff from './components/DashboardComponents/Staff.tsx';
import Orders from './components/DashboardComponents/Orders.tsx';
import Settings from './components/DashboardComponents/Settings.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/addToMenu" element={<AddToMenu />} />
        <Route path="/addFoodItem" element={<AddFoodItem />} />
        <Route path="/viewMenu" element={<ViewMenu />} />
        <Route path="/editMenuItem/:id" element={<EditMenuItem />} />
        <Route path="/login" element={<Login />} />
        <Route path="/getStarted" element={<Register />} />
        <Route path ="/dashboard" element={<Dashboard />} >
            <Route index element={<Stats />} />
            <Route path="menu" element={<Menu />} />
            <Route path="staff" element={<Staff />} />
            <Route path="orders" element={<Orders />} />
            <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
