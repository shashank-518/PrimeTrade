import express from "express";
import {
  registerUser,
  loginUser,
} from "../Controllers/Users.controllers.js";
import { authMiddleware } from "../Middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

export default router;
