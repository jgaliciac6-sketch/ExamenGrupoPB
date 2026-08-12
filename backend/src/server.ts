import chalk from "chalk";
import cors from "cors";
import express from "express";
import { pool } from "./config/db";
import logger from "./utilities/Logs";
import EmpleadoRouter from "./routes/EmpleadoRouter";
import UsuarioRouter from "./routes/UsuarioRouter";

async function testDBConnection() {
  try {
    await pool.query("Select 1");
    console.log(chalk.green("Base de datos conectada correctamente"));
  } catch (error) {
    console.log(chalk.red.bold(error));
    logger.error(error);
  }
}

testDBConnection();

const app = express();

app.use(express.json());

app.use("/api/Empleado", EmpleadoRouter);
app.use("/api/Usuario", UsuarioRouter);

export default app;
