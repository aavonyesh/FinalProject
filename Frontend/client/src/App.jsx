import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/GuestNavbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import AllRooms from "./pages/AllRooms/AllRooms";
import Detail from "./pages/Detail/Detail";
import MyBookings from "./pages/MyBookings/MyBookings";
import OwnerPage from "./pages/HotelOwner/OwnerPage";
import About from "./pages/About/About";
import Experience from "./pages/Experience/Experience";

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div>
      {!isOwnerPath && <Navbar />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<Detail />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/experience" element={<Experience />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/owner/*" element={<OwnerPage />} />
        </Routes>
      </div>
      {!isOwnerPath && <Footer />}
    </div>
  );
};

export default App;
