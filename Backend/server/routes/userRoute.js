import express from "express";
import { createOrGetUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/", createOrGetUser); // POST /api/users

export default router;
