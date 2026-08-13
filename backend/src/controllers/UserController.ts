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

  static CreateUser = async (req: Request, res: Response) => {
    const client = await pool.connect();

    try {
      const objUsuario = req.body as IUsuario;

      await client.query("BEGIN");

      const createAns = await client.query(
        `SELECT "fn_gpb_set_user_create"(
        $1, $2, $3, $4, $5, $6
      ) AS success`,
        [
          objUsuario.USRNombre,
          objUsuario.USRCorreo,
          objUsuario.USRTelefono,
          objUsuario.USRGeneroFavorito,
          objUsuario.USRPlataformaFavorita,
          objUsuario.USRComentario ?? null,
        ],
      );

      const usrId = createAns.rows[0].success;

      if (usrId === -1) {
        await client.query("ROLLBACK");

        return res.status(400).json({
          message: "El correo ya se encuentra registrado",
        });
      }

      if (!usrId || usrId === 0) {
        await client.query("ROLLBACK");

        return res.status(400).json({
          message: "Error al crear usuario",
        });
      }

      await client.query("COMMIT");

      return res.status(201).json({
        message: "Usuario creado correctamente",
        data: {
          usrId,
        },
      });
    } catch (error: any) {
      await client.query("ROLLBACK");

      logger.error("Error al crear usuario: ", error);

      return res.status(500).json({
        message: "Error interno del servidor",
        error: error.message,
      });
    } finally {
      client.release();
    }
  };
}
