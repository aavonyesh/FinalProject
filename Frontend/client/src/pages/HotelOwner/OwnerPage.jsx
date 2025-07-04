import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Login";
import Dashboard from "./Dashboard";
import AddRoom from "./AddRoom";
import ListRoom from "./ListRoom";

const OwnerPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("adminLoggedIn") === "true"
  );

  const handleLogin = (email, password) => {
    if (email === "admin@demo.com" && password === "123456") {
      localStorage.setItem("adminLoggedIn", "true");
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) return <Login onLogin={handleLogin} />;

  return (
    <Layout onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-room" element={<AddRoom />} />
        <Route path="/list-room" element={<ListRoom />} />
      </Routes>
    </Layout>
  );
};

export default OwnerPage;
