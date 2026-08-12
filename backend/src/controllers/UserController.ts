import { Request, Response } from "express";
import logger from "../utilities/Logs";
import { pool } from "../config/db";
import { IEmpleado } from "../models/Empleado";
import { generateJWT } from "../utilities/jwt";
import { IUsuario } from "../models/Usuarios";

export class UserController {
  static GetUsers = async (req: Request, res: Response) => {
    try {
      const query = 'SELECT * FROM "fn_gpb_get_users"()';

      const ans = await pool.query<IUsuario>(query);

      if (ans.rowCount === 0) {
        logger.error("No se encontraron usuarios");

        return res.status(401).json({
          message: "No se encontraron usuarios",
        });
      }

      const usuarios: IUsuario[] = ans.rows;

      return res.status(200).json({
        usuarios,
      });
    } catch (error) {
      logger.error(error);
      return res
        .status(500)
        .json({ message: "Eror intentando traer usuarios: ", error });
    }
  };
}
