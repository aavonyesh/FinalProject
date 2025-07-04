import React, { useEffect, useState } from "react";
import axios from "axios";
import Title from "../../components/section/Title/Title";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRoom, setEditingRoom] = useState(null);
  const [newRoomName, setNewRoomName] = useState("");
  const [newPrice, setNewPrice] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/rooms");
      setRooms(res.data);
    } catch (err) {
      console.error("Failed to fetch rooms:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const totalBookings = rooms.length;
  const totalRevenue = rooms.reduce((sum, room) => sum + room.pricePerNight, 0);
  const availableRooms = rooms.filter(room => room.isAvailable).length;
  const bestsellerRooms = rooms.filter((_, index) => index % 2 !== 0); // Tək indeksli otaqlar

  const filteredRooms = rooms.filter((room) =>
    room.roomName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (room) => {
    setEditingRoom(room);
    setNewRoomName(room.roomName);
    setNewPrice(room.pricePerNight);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/api/rooms/${editingRoom._id}`, {
        roomName: newRoomName,
        pricePerNight: newPrice,
      });
      setEditingRoom(null);
      fetchRooms();
    } catch (error) {
      console.error("Failed to update room:", error.message);
    }
  };

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subTitle="Monitor your room listings, track bookings and analyze revenue—all in one place."
      />

      {/* Statistika bölməsi */}
      <div className="flex flex-wrap gap-4 my-8 ">
        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
          <img src={assets.totalBookingIcon} alt="totalBooking-icon" className="max-sm:hidden h-10" />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Bookings</p>
            <p className="text-neutral-400 text-base">{totalBookings}</p>
          </div>
        </div>
        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
          <img src={assets.totalRevenueIcon} alt="totalRevenue-icon" className="max-sm:hidden h-10" />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Revenue</p>
            <p className="text-neutral-400 text-base">${totalRevenue}</p>
          </div>
        </div>
        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
          <div className="flex flex-col sm:ml-2 font-medium">
            <p className="text-blue-500 text-lg">Available Rooms</p>
            <p className="text-neutral-400 text-base">{availableRooms}</p>
          </div>
        </div>
        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
          <div className="flex flex-col sm:ml-2 font-medium">
            <p className="text-blue-500 text-lg">Bestseller Rooms</p>
            <p className="text-neutral-400 text-base">{bestsellerRooms.length}</p>
          </div>
        </div>
      </div>

      {/* Axtarış */}
      <input
        type="text"
        placeholder="Search room by name..."
        className="border px-4 py-2 rounded-md mb-5 w-full max-w-xs text-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Bestseller listəsi */}
      {bestsellerRooms.length > 0 && (
        <div className="mb-6">
          <h2 className="text-md font-semibold text-blue-600 mb-2">🔥 Bestseller Rooms</h2>
          <ul className="list-disc ml-6 text-sm text-blue-900">
            {bestsellerRooms.map((room) => (
              <li key={room._id}>
                {room.roomName || "Unnamed"} <span className="text-gray-400">({room.roomType})</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Room Table */}
      <h2 className="text-xl text-blue-950/70 font-medium mb-5">Room Summary</h2>

      <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">Room Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">Room Type</th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">Price</th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">Availability</th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">Edit</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredRooms.map((room) => (
              <tr key={room._id}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">{room.roomName}</td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">{room.roomType}</td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">${room.pricePerNight}</td>
                <td className="py-3 px-4 text-center border-t border-gray-300">
                  <span
                    className={`text-xs py-1 px-2 rounded-full ${
                      room.isAvailable
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-700"
                    }`}
                  >
                    {room.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className="py-3 px-4 text-center border-t border-gray-300">
                  <button
                    onClick={() => handleEdit(room)}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {filteredRooms.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-5 text-gray-400">
                  No rooms match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingRoom && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-[90%] max-w-md shadow-lg">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Edit Room</h3>

            <label className="block text-sm mb-2">Room Name</label>
            <input
              type="text"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              className="border rounded w-full px-3 py-2 mb-4"
            />

            <label className="block text-sm mb-2">Price Per Night ($)</label>
            <input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="border rounded w-full px-3 py-2 mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingRoom(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
