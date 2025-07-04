import React, { useState } from "react";
import Title from "../../components/section/Title/Title";
import { assets } from "../../assets/assets";
import axios from "axios";

const AddRoom = () => {
  const [images, setImages] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
  });

    const [inputs, setInputs] = useState({
    roomName: "",
    roomType: "",
    priceNight: "",
    isAvailable: true,
    amenities: {
      "Free WiFi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageLinks = Object.values(images).filter(link => link.trim() !== "");

    const selectedAmenities = Object.entries(inputs.amenities)
      .filter(([key, value]) => value)
      .map(([key]) => key);

 try {
      const res = await axios.post("http://localhost:3000/api/rooms", {
        roomName: inputs.roomName,
        roomType: inputs.roomType,
        pricePerNight: Number(inputs.priceNight),
        isAvailable: inputs.isAvailable,
        amenities: selectedAmenities,
        images: imageLinks,
      });

      alert("Room successfully added!");
      // Reset
      setImages({ 1: "", 2: "", 3: "", 4: "" });
      setInputs({
        roomName: "",
        roomType: "",
        priceNight: "",
        isAvailable: true,
        amenities: {
          "Free Wifi": false,
          "Free Breakfast": false,
          "Room Service": false,
          "Mountain View": false,
          "Pool Access": false,
        },
      });
    } catch (err) {
      console.error("Error adding room:", err);
      alert("Something went wrong while adding the room.");
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <Title
        align="left"
        font="Outfit"
        title="Add Room"
        subTitle="Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience."
      />

      {/* Image URL input with preview */}
      <p className="text-gray-800 mt-10">Images (paste image URLs)</p>
<div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
  {Object.keys(images).map((key) => (
    <div key={key} className="flex flex-col items-center gap-2 w-36">
      <div className="w-full h-24 border border-gray-300 rounded overflow-hidden">
        <img
          src={images[key] || assets.uploadArea}
          alt="preview"
          className="w-full h-full object-cover"
        />
      </div>
      <input
        type="text"
        placeholder="Paste image URL"
        value={images[key] || ""}
        onChange={(e) =>
          setImages({ ...images, [key]: e.target.value })
        }
        className="border border-gray-300 text-xs p-2 rounded w-full"
      />
    </div>
  ))}
</div>



       {/* Room Name & Price side by side */}
      <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
        <div className="flex-1">
          <p className="text-gray-800 mt-4">Room Name</p>
          <input
            type="text"
            placeholder="e.g. Deluxe Suite"
            className="border border-gray-300 mt-1 rounded p-2 w-full"
            value={inputs.roomName}
            onChange={(e) =>
              setInputs({ ...inputs, roomName: e.target.value })
            }
          />
        </div>
        <div>
          <p className="mt-4 text-gray-800">
            Price <span className="text-xs">/night</span>
          </p>
          <input
            type="number"
            placeholder="0"
            className="border border-gray-300 mt-1 rounded p-2 w-24"
            value={inputs.priceNight}
            onChange={(e) =>
              setInputs({ ...inputs, priceNight: e.target.value })
            }
          />
        </div>
      </div>
 {/* Room Type */}
      <div className="flex-1 max-w-48">
        <p className="text-gray-800 mt-4">Room Type</p>
        <select
          value={inputs.roomType}
          onChange={(e) => setInputs({ ...inputs, roomType: e.target.value })}
          className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
        >
          <option value="">Select Room Type</option>
          <option value="Single Bed">Single Bed</option>
          <option value="Double Bed">Double Bed</option>
          <option value="Luxury Room">Luxury Room</option>
          <option value="Family Suite">Family Suite</option>
        </select>
      </div>
       {/* Amenities */}
      <p className="text-gray-800 mt-4">Amenities</p>
      <div className="flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm">
        {Object.keys(inputs.amenities).map((amenity, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`amenities${index + 1}`}
              checked={inputs.amenities[amenity]}
              onChange={() =>
                setInputs({
                  ...inputs,
                  amenities: {
                    ...inputs.amenities,
                    [amenity]: !inputs.amenities[amenity],
                  },
                })
              }
            />
            <label htmlFor={`amenities${index + 1}`} className="ml-2">
              {amenity}
            </label>
          </div>
        ))}
      </div>

      {/* Submit Button */}
     <button
        type="submit"
        className="bg-primary text-white px-8 py-2 rounded mt-8 cursor-pointer"
      >
        Add Room
      </button>

    </form>
  );
};

export default AddRoom;
