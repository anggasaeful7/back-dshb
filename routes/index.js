import express from "express";
import {
  Login,
  Logout,
  Register,
  getUsers,
} from "../controllers/UserController.js";
import { verifyToken } from "../middleware/index.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {
  createLaporan,
  deleteLaporan,
  getLaporan,
  getLaporanById,
  updateLaporan,
} from "../controllers/LaporanController.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/register", Register);
router.post("/login", Login);
router.get("/refresh", refreshToken);
router.get("/logout", Logout);

// Laporan
router.get("/laporan", verifyToken, getLaporan);
router.post("/laporan", verifyToken, createLaporan);
router.put("/laporan/:id", verifyToken, updateLaporan);
router.delete("/laporan/:id", verifyToken, deleteLaporan);
router.get("/laporan/:id", verifyToken, getLaporanById);

export default router;
