import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { limiter } from "../config/limiter";
import { authenticate } from "../middleware/auth";

const router = Router();
router.use(limiter);

router.get("/getUsuarios", authenticate, UserController.GetUsers);

export default router;
