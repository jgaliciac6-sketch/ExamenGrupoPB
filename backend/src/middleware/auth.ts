import jwt from "jsonwebtoken";
import logger from "../utilities/Logs";
import { Request, Response, NextFunction } from "express";
import { pool } from "../config/db";
import { IEmpleado } from "../models/Empleado";

declare global {
  namespace Express {
    interface Request {
      empleadoMiddleware?: IEmpleado;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bearer = req.headers.authorization;

    if (!bearer) {
      logger.error("No autorizado");

      return res.status(401).json({
        message: "No autorizado",
      });
    }

    const [, token] = bearer.split(" ");

    if (!token) {
      logger.error("Sin token");

      return res.status(401).json({
        message: "Sin token",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (
      typeof decoded !== "object" ||
      decoded === null ||
      !("EMPId" in decoded)
    ) {
      logger.error("Token no válido");

      return res.status(401).json({
        message: "Token no válido",
      });
    }

    const EMPId = decoded.EMPId;

    const query = 'SELECT * FROM "fn_gpb_get_empleado"($1)';

    const values = [EMPId];

    const result = await pool.query<IEmpleado>(query, values);

    if (result.rowCount !== 1) {
      logger.error("Empleado no encontrado");

      return res.status(401).json({
        message: "Empleado no encontrado",
      });
    }

    const empleado: IEmpleado = result.rows[0];

    req.empleadoMiddleware = empleado;

    next();
  } catch (error) {
    logger.error("Error al autenticar usuario", error);

    return res.status(401).json({
      message: "Token no válido o expirado",
    });
  }
};
