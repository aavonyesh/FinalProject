import express from "express";
import multer from "multer";
import {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  toggleRoomVisibility,
} from "../controllers/roomController.js";

const router = express.Router();

// Multer konfiqurasiyası
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ROUTES
router.get("/", getAllRooms);
router.post("/", upload.array("images", 4), createRoom); // şəkilli otaq əlavə
router.get("/:id", getRoomById);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);
router.patch("/:id/toggle-visibility", toggleRoomVisibility);

export default router;
