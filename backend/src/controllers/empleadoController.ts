import { Request, Response } from "express";
import logger from "../utilities/Logs";
import { pool } from "../config/db";
import { IEmpleado } from "../models/Empleado";
import { generateJWT } from "../utilities/jwt";

export class EmpleadoController {
  static AuthEmploy = async (req: Request, res: Response) => {
    try {
      const { EMPId, EMPPassword }: { EMPId: number; EMPPassword: string } =
        req.body;

      if (!EMPId || !EMPPassword) {
        logger.error("Faltan credenciales");
        return res.status(400).json({ message: "Faltan credenciales" });
      }

      const query = 'SELECT * FROM "fn_gpb_get_empleado_login"($1, $2)';
      const values = [EMPId, EMPPassword];

      const ans = await pool.query<IEmpleado>(query, values);

      if (ans.rowCount === 0) {
        logger.error("Usuario o contraseña incorrectos");

        return res.status(401).json({
          message: "Usuario o contraseña incorrectos",
        });
      }

      const empleado: IEmpleado = ans.rows[0];
      const token = generateJWT({
        EMPId: empleado.EMPId,
        EMPNombre: empleado.EMPNombre,
        EMPDpi: empleado.EMPDPI,
        EMPEstado: empleado.EMPEstado,
      });

      return res.status(200).json({
        token,
        EMPId: empleado.EMPId,
        EMPNombre: empleado.EMPNombre,
      });
    } catch (error) {
      logger.error(error);
      return res
        .status(500)
        .json({ message: "Eror intentando hacer login: ", error });
    }
  };
}
