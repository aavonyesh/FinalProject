import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../../assets/assets';

const HotelCard = ({ room, index }) => {
  const hotelName = room.hotel?.name || 'Unknown Hotel';
  const hotelAddress = room.hotel?.address || 'Unknown Address';
  const roomName = room.roomName || 'Room';
  const roomType = room.roomType || '';
  const price = room.pricePerNight || 0;
  const image = room.images?.[0] || assets.defaultRoomImage;

  return (
    <Link
      to={`/rooms/${room._id}`}
      onClick={() => scrollTo(0, 0)}
      className='relative max-w-70 w-full rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)] transition-transform hover:scale-[1.01]'
    >
      <img src={image} alt="room" className="h-52 w-full object-cover" />

      {index % 2 === 0 && (
        <p className='px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full'>
          BestSeller
        </p>
      )}

      <div className='p-4 pt-5'>
        <div className='flex items-center justify-between'>
          <p className='font-playfair text-xl font-medium text-gray-800'>{roomName}</p>
          <div className='flex items-center gap-1'>
            <img src={assets.starIconFilled} alt="star-icon" className='w-4 h-4' />
            4.5
          </div>
        </div>

        <p className='text-sm text-gray-500 mt-1'>{hotelName} — {roomType}</p>

        <div className='flex items-center gap-1 text-sm mt-1'>
          <img src={assets.locationIcon} alt="location-icon" className='w-4 h-4' />
          <span>{hotelAddress}</span>
        </div>

        <div className='flex items-center justify-between mt-4'>
          <p>
            <span className='text-xl text-gray-800'>${price}</span>/night
          </p>
          <button className='px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer'>
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
