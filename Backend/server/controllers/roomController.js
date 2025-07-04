import Room from "../models/Room.js";

// Otaq yarat

export const createRoom = async (req, res) => {
  try {
    const {
      roomType,
      roomName,
      pricePerNight,
      isAvailable,
      amenities,
      images,
    } = req.body;

    const room = new Room({
      roomType,
      roomName,
      pricePerNight,
      isAvailable: isAvailable ?? true,
      amenities, // JSON.parse ETMƏ!
      images,    // JSON.parse ETMƏ!
    });

    await room.save();
    res.status(201).json(room);
  } catch (error) {
    console.error("Room creation failed:", error.message);
    res.status(400).json({ message: error.message });
  }
  console.log("Gelen body:", req.body);

};




// Bütün otaqları gətir (yalnız isDeleted: false olanları)
export const getAllRooms = async (req, res) => {
  try {
    const { sort, roomTypes, minPrice, maxPrice, isAvailable, withDeleted } = req.query;

    let filter = {};
    if (withDeleted !== "true") {
      filter.isDeleted = false; // default olaraq gizlədilmişləri göstərmə
    }

    if (roomTypes) {
      const types = roomTypes.split(",");
      filter.roomType = { $in: types };
    }

    if (minPrice && maxPrice) {
      filter.pricePerNight = {
        $gte: Number(minPrice),
        $lte: Number(maxPrice),
      };
    } else if (minPrice) {
      filter.pricePerNight = { $gte: Number(minPrice) };
    } else if (maxPrice) {
      filter.pricePerNight = { $lte: Number(maxPrice) };
    }

    if (isAvailable !== undefined) {
      filter.isAvailable = isAvailable === "true";
    }

    let query = Room.find(filter).populate("hotel");

    if (sort === "price_asc") query = query.sort({ pricePerNight: 1 });
    else if (sort === "price_desc") query = query.sort({ pricePerNight: -1 });
    else if (sort === "newest") query = query.sort({ createdAt: -1 });

    const rooms = await query;
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Tək otaq gətir
export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate("hotel");
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Otaq yenilə (gizlət/göstər daxil)
export const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updatedRoom) return res.status(404).json({ message: "Room not found" });
    res.json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Soft sil (isDeleted = true)
export const deleteRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!updatedRoom) return res.status(404).json({ message: "Room not found" });
    res.json({ message: "Room soft deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const toggleRoomVisibility = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    room.isDeleted = !room.isDeleted; // dəyiş
    await room.save();

    res.json({ message: `Room is now ${room.isDeleted ? "hidden" : "visible"}`, room });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

