import React, { useState, useEffect } from "react";
import axios from "axios";
import Title from "../../components/section/Title/Title";

const ListRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/rooms?withDeleted=true");
      setRooms(res.data);
    } catch (error) {
      console.error("Room fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const toggleDelete = async (roomId, currentStatus) => {
    try {
      await axios.put(`http://localhost:3000/api/rooms/${roomId}`, {
        isDeleted: !currentStatus,
      });
      fetchRooms();
    } catch (error) {
      console.error("Room update error:", error);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Title
        align="left"
        font="Outfit"
        title="Room Listings"
        subTitle="View, edit or manage all listed rooms. Keep the information up-to-date to provide the best experience for users."
      />

      <p className="text-gray-600 text-sm mt-8">All Rooms</p>

      <div className="w-full max-w-5xl text-left border border-gray-200 rounded-lg shadow-sm max-h-[450px] overflow-y-scroll mt-3">
        {loading ? (
          <p className="text-center py-10 text-gray-400">Loading rooms...</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100 text-sm text-gray-800 font-semibold">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left max-sm:hidden">Facility</th>
                <th className="py-3 px-4 text-left">Price / Night</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700 bg-white">
              {rooms.map((item, index) => (
                <tr key={item._id || index} className="border-t">
                  <td className="py-3 px-4">{item.roomType}</td>
                  <td className="py-3 px-4 max-sm:hidden">
                    {item.amenities.join(", ") || "—"}
                  </td>
                  <td className="py-3 px-4">${item.pricePerNight}</td>
                  <td className="py-3 px-4 text-center">
                    {item.isDeleted ? (
                      <span className="text-red-500 font-medium">Hidden</span>
                    ) : (
                      <span className="text-green-600 font-medium">Visible</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => toggleDelete(item._id, item.isDeleted)}
                      className={`px-4 py-1 rounded text-sm font-semibold shadow-sm transition ${
                        item.isDeleted
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                    >
                      {item.isDeleted ? "Show" : "Hide"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ListRoom;
