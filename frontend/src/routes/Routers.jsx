import Home from '../pages/Home'
import Contact from '../pages/Contact'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Services from '../pages/Services'
import Doctors from '../pages/Doctors/Doctors'
import DoctorDetails from '../pages/Doctors/DoctorDetails'
import MyAccount from '../Dashboard/User-account/MyAccount'
import Dashboard from '../Dashboard/Doctor-account/Dashboard'
import ProtectedRoutes from './ProtectedRoutes'

import { Routes, Route } from 'react-router-dom'
import CheckoutSuccess from '../pages/Doctors/CheckoutSuccess'

const Routers = () => {
    return <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:id' element={<DoctorDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/services' element={<Services />} />
        <Route path='/checkout-success' element={<CheckoutSuccess />} />
        <Route path='/users/profile/me' element={<ProtectedRoutes allowedRoles={['patient']}><MyAccount /></ProtectedRoutes>} />
        <Route path='/doctors/profile/me' element={<ProtectedRoutes allowedRoles={['doctor']}><Dashboard /></ProtectedRoutes>} />
    </Routes>
}

export default Routers