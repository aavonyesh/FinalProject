import React from 'react'
import Navbar from './components/Navbar/GuestNavbar/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import AllRooms from './pages/AllRooms/AllRooms'
import Detail from './pages/Detail/Detail'
import MyBookings from './pages/MyBookings/MyBookings'
import HotelReg from './components/HotelReg/HotelReg'

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner")
  return (
    <div>
      {!isOwnerPath && <Navbar/>}
      {false && <HotelReg/>}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/rooms' element={<AllRooms/>}/>
          <Route path='/rooms/:id' element={<Detail/>}/>
          <Route path='/my-bookings' element={<MyBookings/>}/>
        </Routes>
        <Footer/>
      </div> 
    </div>
  )
}

export default App