import Hotel from "../models/Hotel.js";

// Yeni hotel yarat
export const createHotel = async (req, res) => {
  try {
    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Bütün hotelləri getir
export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Bir hotel getir
export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel tapılmadı" });
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Hotel güncelle
export const updateHotel = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedHotel) return res.status(404).json({ message: "Hotel tapılmadı" });
    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Hotel sil
export const deleteHotel = async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!deletedHotel) return res.status(404).json({ message: "Hotel tapılmadı" });
    res.status(200).json({ message: "Hotel silindi" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
