import Room from "../models/Room.js";

// Otaq yarat
export const createRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Bütün otaqları gətir - sort və filter dəstəyi ilə


export const getAllRooms = async (req, res) => {
  try {
    let filter = {};

    // Filter parametrləri yoxdursa filter boş qalacaq və bütün otaqları gətirəcək
    const { sort, roomTypes, minPrice, maxPrice, isAvailable } = req.query;

    if (roomTypes) {
      const types = roomTypes.split(",");
      filter.roomType = { $in: types };
    }

    if (minPrice && maxPrice) {
      filter.pricePerNight = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    } else if (minPrice) {
      filter.pricePerNight = { $gte: Number(minPrice) };
    } else if (maxPrice) {
      filter.pricePerNight = { $lte: Number(maxPrice) };
    }

    if (isAvailable !== undefined) {
      filter.isAvailable = isAvailable === "true";
    }

    // Burada populate("hotel")-i müvəqqəti söndür, test üçün:
    // let rooms = await Room.find(filter);
    let query = Room.find(filter).populate("hotel");

    if (sort === "price_asc") query = query.sort({ pricePerNight: 1 });
    else if (sort === "price_desc") query = query.sort({ pricePerNight: -1 });
    else if (sort === "newest") query = query.sort({ createdAt: -1 });

    const rooms = await query;

    // Test: Backenddən data var ya yox, bunu konsola yazdır:
    console.log("Rooms found:", rooms.length);

    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



// Bütün otaqları bir otelə görə gətir
export const getRoomsByHotel = async (req, res) => {
  try {
    const rooms = await Room.find({ hotel: req.params.hotelId });
    res.json(rooms);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Tək otaq gətir (ID ilə)
export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate("hotel");
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Otaq yenilə
export const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRoom) return res.status(404).json({ message: "Room not found" });
    res.json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Otağı sil
export const deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) return res.status(404).json({ message: "Room not found" });
    res.json({ message: "Room deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
