// MyBookings.jsx
import React, { useEffect, useState } from "react";
import Title from "../../components/section/Title/Title";
import { assets } from "../../assets/assets";
import axios from "axios";
import PayPalButton from "../../components/PayPalButton";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [payingBookingId, setPayingBookingId] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/rooms"); // Sənin room API
        const fakeBookings = res.data.slice(0, 2).map((room, index) => ({
          _id: room._id,
          room: {
            roomName: room.roomName,
            roomType: room.roomType,
            images: room.images,
          },
          guests: 2,
          totalPrice: room.pricePerNight * 2,
          checkInDate: new Date(),
          checkOutDate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
          isPaid: false,
        }));
        setBookings(fakeBookings);
      } catch (err) {
        console.error("Error loading rooms:", err);
      }
    };
    fetchRooms();
  }, []);

  const handlePaymentSuccess = (details, bookingId) => {
    setBookings((prev) =>
      prev.map((b) =>
        b._id === bookingId ? { ...b, isPaid: true } : b
      )
    );
    setPayingBookingId(null);
    alert("Payment successful via PayPal!");
  };

  return (
    <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
      <Title
        title="My Bookings"
        subTitle="Easily manage your test bookings and simulate PayPal payments."
        align="left"
      />

      <div className="max-w-6xl mt-8 w-full text-gray-800">
        <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3">
          <div>Rooms</div>
          <div>Date & Timings</div>
          <div>Payment</div>
        </div>

        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t"
          >
            {/* Room Info */}
            <div className="flex flex-col md:flex-row gap-3">
              <img
                src={booking.room.images[0]}
                alt="room"
                className="w-36 h-28 object-cover rounded shadow"
              />
              <div className="flex flex-col gap-1">
                <p className="font-playfair text-xl">
                  {booking.room.roomName}{" "}
                  <span className="font-inter text-sm">
                    ({booking.room.roomType})
                  </span>
                </p>
                <div className="flex gap-2 text-sm text-gray-500">
                  <img src={assets.guestsIcon} alt="guests" className="w-4" />
                  <span>Guests: {booking.guests}</span>
                </div>
                <p className="text-base">Total: ${booking.totalPrice}</p>
              </div>
            </div>

            {/* Dates */}
            <div className="flex flex-row md:items-center gap-8 mt-3">
              <div>
                <p>Check in:</p>
                <p className="text-gray-500 text-sm">
                  {new Date(booking.checkInDate).toDateString()}
                </p>
              </div>
              <div>
                <p>Check out:</p>
                <p className="text-gray-500 text-sm">
                  {new Date(booking.checkOutDate).toDateString()}
                </p>
              </div>
            </div>

            {/* Payment */}
            <div className="flex flex-col items-start justify-center pt-3">
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${
                    booking.isPaid ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <p
                  className={`text-sm ${
                    booking.isPaid ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {booking.isPaid ? "Paid" : "Unpaid"}
                </p>
              </div>

              {!booking.isPaid && (
                <div className="mt-4">
                  {payingBookingId === booking._id ? (
                    <PayPalButton
                      amount={booking.totalPrice}
                      onSuccess={(details) =>
                        handlePaymentSuccess(details, booking._id)
                      }
                    />
                  ) : (
                    <button
                      className="px-4 py-1.5 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer"
                      onClick={() => setPayingBookingId(booking._id)}
                    >
                      Pay Now
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
