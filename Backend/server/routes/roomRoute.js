import express from "express";
import {
  createRoom,
  getAllRooms,
  getRoomsByHotel,
  getRoomById,
  updateRoom,
  deleteRoom
} from "../controllers/roomController.js";

const router = express.Router();
router.get("/", getAllRooms); 
router.post("/", createRoom);
router.get("/hotel/:hotelId", getRoomsByHotel);
router.get("/:id", getRoomById);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);

export default router;
