import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Slot from './pages/Slot';
import Pallet from './pages/Pallet';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import AddNewSlot from './pages/addNewSlot';
import UpdateSlot from './pages/updateSlot';
import AddNewPallet from './pages/addNewPallet';
import UpdatePallet from './pages/updatePallet';
import DetectQRCode from './pages/DetectQRCode';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'slot', element: <Slot /> },
        { path: 'pallet/:id', element: <Pallet /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'addNewSlot', element: <AddNewSlot /> },
        { path: 'updateSlot/:id', element: <UpdateSlot /> },
        { path: 'addNewPallet/:id', element: <AddNewPallet /> },
        { path: 'updatePallet/:id', element: <UpdatePallet /> },
        { path: 'detectQRCode', element: <DetectQRCode /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
