import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Layout = ({ onLogout, children }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
const navigate = useNavigate(); 
  const confirmLogout = () => {
    setShowLogoutModal(false);
    onLogout(); // Əsas logout funksiyası
    navigate("/");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 min-h-screen bg-gray-100 p-4 shadow-md">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-3">
          <li>
            <Link to="/owner" className="text-blue-600 hover:underline">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/owner/add-room" className="text-blue-600 hover:underline">
              Add Room
            </Link>
          </li>
          <li>
            <Link to="/owner/list-room" className="text-blue-600 hover:underline">
              List Rooms
            </Link>
          </li>
          <li>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="text-red-500 hover:underline mt-4"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">{children}</div>

      {/* Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
