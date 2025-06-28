import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import { attachRole } from "../middleware/attachRoles.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/admin/login", attachRole("admin"), loginUser);
router.post("/login", attachRole("user"), loginUser);

export default router;
