import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate,useLocation } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'

import LandingPage from './components/common/LandingPage/LandingPage'
import Login from './components/common/Login/Login'
import Register from './components/common/Register/Register'
import Header from './components/common/Header/Header'
import Footer from './components/common/Footer/Footer'
import UserDashBoard from './components/user/UserDashBoard/UserDashBoard'
import AdminDashBoard from './components/Admin/AdminDashBaord/AdminDashBoard'
import CourseProviderDashBaord from './components/CourseProviders/CourseProviderDashBoard'
import AddCourseProviders from './components/Admin/AddCourseProviders/AddCourseProviders'
import ViewCourseProviders from './components/Admin/VIewUsers/ViewCourseProviders/ViewCourseProviders'
import ViewStudents from './components/Admin/VIewUsers/ViewStudents/ViewStudents'
import AddCourses from './components/Admin-CoureProvider-Common/AddCourses/AddCourses'
import ViewCourses from './components/common/Courses/ViewCourses'
import UpdateCourses from './components/Admin-CoureProvider-Common/UpdateCourses/UpdateCourses'
import CourseDetails from './components/common/Courses/CourseDetails'
import Profilepage from './components/user/ProfilePage/Profilepage'
import Updateprofile from './components/user/update/Updateprofile'
import Cart from './components/PaymentRelated/Cart/Cart'
import PaymentScucess from './components/PaymentRelated/Payment/PaymentScucess'
import MyCourses from './components/common/mycourses/MyCourses'

function App() {
  const { user } = useContext(AuthContext);
  
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/view-courses' element={<ViewCourses />} />
        <Route path='/CourseDetails/:id' element={<CourseDetails />} />
        <Route path='/profile' element={<Profilepage />} />
        <Route path='/Updateprofile/:id' element={<Updateprofile />} />
        <Route path='/payment-success' element={<PaymentScucess />} />

        {/* <Route path="/cart" element={<PrivateRoute><Cart/></PrivateRoute>} /> */}
        <Route path='/cart' element={<Cart/>}/>

        {user ? (
          <>
          <Route path='my-courses' element={<MyCourses/>}/>
            { 
              user.role === 'admin' && (
                <>

                  <Route path='/adminDashBoard' element={<AdminDashBoard />} />
                  <Route path='/add-CourseProviders' element={<AddCourseProviders />} />
                  <Route path='/ViewCourseProviders' element={<ViewCourseProviders />} />
                  <Route path='/ViewStudents' element={<ViewStudents />} />
                  <Route path='/add-courses' element={<AddCourses />} />
                  <Route path='/updateCourse/:id' element={<UpdateCourses />} />
                </>
              )
            }
            {
              user.role === "courseProvider" && (
                <>
                  <Route path='/CourseProviderDashBaord' element={<CourseProviderDashBaord />} />
                  <Route path='/updateCourse/:id' element={<UpdateCourses />} />
                </>
              )
            }
            {
              user.role === "student" && (
                <>
                  <Route path='/studentDashBoard' element={<UserDashBoard />} />
                </>
              )
            }
          </>
        ) : (
          <>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </>
        )

        }
      </Routes>
      <Footer />


    </>
  )
}

export default App
