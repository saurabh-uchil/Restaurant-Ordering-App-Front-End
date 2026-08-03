import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddToMenu from './pages/AddToMenu.tsx';
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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Test from './pages/Test.tsx';
import ProtectedRoute from './pages/ProtectedRoute.tsx';
import Error401 from './pages/UnauthorizedPage.tsx';
import NotFound from './pages/NotFound.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/error" element={<Error401 />} />
          <Route path="/addToMenu" element={<AddToMenu />} />
          {/* <Route path="/addFoodItem" element={<AddFoodItem />} />
          <Route path="/viewMenu" element={<ViewMenu />} />
          <Route path="/editMenuItem/:id" element={<EditMenuItem />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/getStarted" element={<Register />} />
          <Route path="/notFound" element={<NotFound />} />
          <Route element={<ProtectedRoute />} >
            <Route path ="/dashboard" element={<Dashboard />} >
              <Route index element={<Stats />} />
              <Route path="menu" element={<Menu />} />
              <Route path="staff" element={<Staff />} />
              <Route path="orders" element={<Orders />} />
              <Route path="settings" element={<Settings />} />
              <Route path="addItem" element={<AddFoodItem />} />
              <Route path="editItem/:id" element={<EditMenuItem />} />
            </Route>
          </Route>
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
