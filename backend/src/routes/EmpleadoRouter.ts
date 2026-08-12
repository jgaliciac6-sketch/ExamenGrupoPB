import { Router } from "express";
import { EmpleadoController } from "../controllers/empleadoController";
import { limiter } from "../config/limiter";

const router = Router();
router.use(limiter);

router.post("/getEmpleado", EmpleadoController.AuthEmploy);

export default router;
