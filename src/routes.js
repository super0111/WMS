import { 
  Routes,
  Route, 
} from "react-router-dom";
import PrivateRoutes from "./utils/privateRoute";
// layouts
import DashboardLayout from './layouts/dashboard';
// import LogoOnlyLayout from './layouts/LogoOnlyLayout';
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
  return(

    <Routes>
      <Route exact path='/' element={<PrivateRoutes/>}>
        <Route exact path="/" element={ <DashboardLayout /> }>
          <Route path='/' element={ <DashboardApp /> } />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route exact path='/' element={<PrivateRoutes/>}>
        <Route exact path="/dashboard" element={ <DashboardLayout />} >
          <Route path='app' element={ <DashboardApp /> } />
          <Route path='user' element={ <User /> } />
          <Route path='slot' element={ <Slot /> } />
          <Route path='pallet/:id' element={ <Pallet /> } />
          <Route path='products' element={ <Products /> } />
          <Route path='blog' element={ <Blog /> } />
          <Route path='addNewSlot' element={ <AddNewSlot /> } />
          <Route path='updateSlot/:id' element={ <UpdateSlot /> } />
          <Route path='addNewPallet/:id' element={ <AddNewPallet /> } />
          <Route path='updatePallet/:id' element={ <UpdatePallet /> } />
          <Route path='detectQRCode' element={ <DetectQRCode /> } />
        </Route>
      </Route>
    </Routes>
  )
}
