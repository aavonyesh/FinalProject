import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets, facilityIcons } from "../../assets/assets";
import StarRating from "../../components/section/StarRating/StarRating";
import axios from "axios";

// Checkbox komponenti
const CheckBox = ({ label, selected = false, onChange = () => {} }) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
    <input
      type="checkbox"
      checked={selected}
      onChange={(e) => onChange(e.target.checked, label)}
    />
    <span className="font-light select-none">{label}</span>
  </label>
);

// Radio button komponenti
const RadioButton = ({ label, selected = false, onChange = () => {} }) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
    <input
      type="radio"
      name="sortOption"
      checked={selected}
      onChange={() => onChange(label)}
    />
    <span className="font-light select-none">{label}</span>
  </label>
);

const AllRooms = () => {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [roomTypesFilter, setRoomTypesFilter] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [openFilters, setOpenFilters] = useState(false);
  const [isAvailableFilter, setIsAvailableFilter] = useState(null); // Yeni filter əlavə etdik

  const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];
  const priceRanges = [
    "0 to 500",
    "500 to 1000",
    "1000 to 2000",
    "2000 to 3000",
  ];
  const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Newest First",
  ];

  // API-dən otaqları çək
  useEffect(() => {
    const fetchRooms = async () => {
  try {
    const params = new URLSearchParams();

    if (roomTypesFilter.length > 0) {
      params.append("roomTypes", roomTypesFilter.join(","));
    }

    if (selectedPriceRange) {
  const parts = selectedPriceRange.split(" to ");
  if (parts.length === 2) {
    const [min, max] = parts;
    params.append("minPrice", min);
    params.append("maxPrice", max);
  }
}


    if (sortOption) {
      if (sortOption === "Price Low to High") params.append("sort", "price_asc");
      else if (sortOption === "Price High to Low") params.append("sort", "price_desc");
      else if (sortOption === "Newest First") params.append("sort", "newest");
    }

    console.log("Query params:", params.toString());

    const res = await axios.get(`http://localhost:3000/api/rooms?${params.toString()}`);

    setRooms(res.data);
  } catch (err) {
    console.error("Filterli otaqları çəkməkdə xəta:", err);
  }
};

    fetchRooms();
  }, [roomTypesFilter, selectedPriceRange, sortOption, isAvailableFilter]);

  // Filter funksiyaları
  const handleRoomTypeChange = (checked, label) => {
    setRoomTypesFilter((prev) =>
      checked ? [...prev, label] : prev.filter((item) => item !== label)
    );
  };

 const handlePriceRangeChange = (label) => {
  setSelectedPriceRange(label);
};


  const handleSortChange = (label) => {
    setSortOption(label);
  };

  const handleAvailabilityChange = (checked) => {
    setIsAvailableFilter(checked ? "true" : null);
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24">
      {/* Sol blok - Otaqlar */}
      <div>
        <div className="flex flex-col items-start text-left">
          <h1 className="font-playfair text-4xl md:text-[40px]">Hotel Rooms</h1>
          <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
            Take advantage of our limited-time offers and special packages to
            enhance your stay and create unforgettable memories.
          </p>
        </div>

        {Array.isArray(rooms) && rooms.length > 0 ? (
          rooms.map((room) => (
            <div
              key={room._id}
              className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0"
            >
              <img
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  scrollTo(0, 0);
                }}
                src={room.images[0]}
                alt="hotel-img"
                title="View Room Details"
                className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
              />
              <div className="md:w-1/2 flex flex-col gap-2">
                <p className="text-gray-500">{room.hotel.city}</p>
                <p
                  onClick={() => {
                    navigate(`/rooms/${room._id}`);
                    scrollTo(0, 0);
                  }}
                  className="text-gray-800 text-3xl font-playfair cursor-pointer"
                >
                  {room.roomName}
                </p>
                <div className="flex item-center">
                  <StarRating />
                  <p className="ml-2">200+ reviews</p>
                </div>
                <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                  <img src={assets.locationIcon} alt="location-icon" />
                  <span>{room.hotel.address}</span>
                </div>

                {/* Otaq xüsusiyyətləri */}
                <div className="flex flex-wrap items-center mt-3 mb-6 gap-[5px]">
                  {room.amenities.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-1 py-2 rounded-lg bg-[#f5f5ff]/70"
                    >
                      <img
                        src={facilityIcons[item]}
                        alt={item}
                        className="w-5 h-5"
                      />
                      <p className="text-xs">{item}</p>
                    </div>
                  ))}
                </div>

                <p className="text-xl font-medium text-gray-700">
                  ${room.pricePerNight} /night
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="mt-10 text-gray-600">No rooms found matching filters.</p>
        )}
      </div>

      {/* Sağ blok - Filterlər */}
      <div className="bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16">
        <div
          className={`flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300 ${
            openFilters && "border-b"
          }`}
        >
          <p className="text-base font-medium text-gray-800">Filters</p>
          <div className="text-xs cursor-pointer">
            <span
              onClick={() => setOpenFilters(!openFilters)}
              className="lg:hidden"
            >
              {openFilters ? "Hide" : "Show"}
            </span>
            <span 
              className="hidden lg:block cursor-pointer"
              onClick={() => {
                setRoomTypesFilter([]);
                setSelectedPriceRange(null);
                setSortOption("");
                setIsAvailableFilter(null);
              }}
            >
              Clear
            </span>
          </div>
        </div>

        <div
          className={`${
            openFilters ? "h-auto" : "h-0 lg:h-auto"
          } overflow-hidden transition-all duration-700`}
        >
          {/* Room type */}
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Popular filters</p>
            {roomTypes.map((room, index) => (
              <CheckBox
                key={index}
                label={room}
                selected={roomTypesFilter.includes(room)}
                onChange={handleRoomTypeChange}
              />
            ))}
          </div>

          {/* Price Range */}
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Price Range</p>
            {priceRanges.map((range, index) => (
              <RadioButton
                key={index}
                label={range}
                selected={selectedPriceRange === range}
                onChange={handlePriceRangeChange}
              />
            ))}
          </div>

          {/* Availability */}
          <div className="px-5 pt-5">
            <CheckBox
              label="Only Available"
              selected={isAvailableFilter === "true"}
              onChange={handleAvailabilityChange}
            />
          </div>

          {/* Sort */}
          <div className="px-5 pt-5 pb-7">
            <p className="font-medium text-gray-800 pb-2">Sort By</p>
            {sortOptions.map((option, index) => (
              <RadioButton
                key={index}
                label={option}
                selected={sortOption === option}
                onChange={handleSortChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
