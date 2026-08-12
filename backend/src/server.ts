import chalk from "chalk";
import cors from "cors";
import express from "express";
import { pool } from "./config/db";
import logger from "./utilities/Logs";

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

export default app;
