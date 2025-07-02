import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HotelCard from '../HotelCard/HotelCard';
import Title from '../Title/Title';
import { useNavigate } from 'react-router-dom';

const FeaturedDestination = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/rooms');
        setRooms(res.data);
      } catch (error) {
        console.error('Rooms fetch error:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
      <Title
        title='Featured Destination'
        subTitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences'
      />

      {loading ? (
        <p className="mt-10 text-gray-500">Loading rooms...</p>
      ) : (
        <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
          {rooms.slice(0, 4).map((room, index) => (
            <HotelCard key={room._id} room={room} index={index} />
          ))}
        </div>
      )}

      <button
        onClick={() => {
          navigate('/rooms');
          scrollTo(0, 0);
        }}
        className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer'
      >
        View All Destination
      </button>
    </div>
  );
};

export default FeaturedDestination;
