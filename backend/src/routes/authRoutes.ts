import { Router } from "express";
import { register, login } from "../controllers/authController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Acesso autorizado!",
    user: (req as any).user
  });
});

export default router;