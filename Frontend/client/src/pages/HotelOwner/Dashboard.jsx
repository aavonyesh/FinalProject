import React, { useEffect, useState } from "react";
import axios from "axios";
import Title from "../../components/section/Title/Title";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchRooms();
  }, []);

  const totalBookings = rooms.length;
  const totalRevenue = rooms.reduce((sum, room) => sum + room.pricePerNight, 0);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subTitle="Monitor your room listings, track bookings and analyze revenue—all in one place."
      />

      <div className="flex gap-4 my-8">
        {/* Total Bookings */}
        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
          <img
            src={assets.totalBookingIcon}
            alt="totalBooking-icon"
            className="max-sm:hidden h-10"
          />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Bookings</p>
            <p className="text-neutral-400 text-base">{totalBookings}</p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
          <img
            src={assets.totalRevenueIcon}
            alt="totalRevenue-icon"
            className="max-sm:hidden h-10"
          />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Revenue</p>
            <p className="text-neutral-400 text-base">${totalRevenue}</p>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <h2 className="text-xl text-blue-950/70 font-medium mb-5">
        Room Summary
      </h2>

      <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">Room Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Room Type
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Price
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Availability
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rooms.map((room, index) => (
              <tr key={index}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {room.roomName || "Unnamed Hotel"}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                  {room.roomType}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                  ${room.pricePerNight}
                </td>
                <td className="py-3 px-4 border-t border-gray-300 flex">
                  <button
                    className={`py-1 px-3 text-xs rounded-full mx-auto ${
                      room.isAvailable
                        ? "bg-amber-200 text-yellow-600"
                        : "bg-green-200 text-green-600"
                    }`}
                  >
                    {room.isAvailable ? "Pending" : "Completed"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
