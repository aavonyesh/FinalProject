import express from "express";
import {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  toggleRoomVisibility,
} from "../controllers/roomController.js";

const router = express.Router();

router.get("/", getAllRooms);
router.post("/", createRoom);
router.get("/:id", getRoomById);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);
router.patch("/:id/toggle-visibility", toggleRoomVisibility);

export default router;
