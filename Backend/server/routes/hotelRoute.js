import express from "express";
import {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
} from "../controllers/hotelController.js";

const router = express.Router();

// POST /hotels - yeni hotel yarat
router.post("/", createHotel);

// GET /hotels - bütün hotelləri getir
router.get("/", getAllHotels);

// GET /hotels/:id - id ilə hotel getir
router.get("/:id", getHotelById);

// PUT /hotels/:id - hotel güncelle
router.put("/:id", updateHotel);

// DELETE /hotels/:id - hotel sil
router.delete("/:id", deleteHotel);

export default router;
