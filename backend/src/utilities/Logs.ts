import fs from "fs";
import wiston, { level } from "winston";
import path, { dirname } from "path";

//Funcion para generar ruta por año/mes/día
function getLogDirectory() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const dir = path.join("logs", "spc", "errors", year.toString(), month, day);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

//Configurar el tranporte de logs
const transport = new wiston.transports.File({
  dirname: getLogDirectory(),
  filename: "error.txt",
  level: "error",
});

//Crear el logger
const logger = wiston.createLogger({
  level: "error",
  format: wiston.format.combine(
    wiston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    wiston.format.printf(
      (info) =>
        `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`,
    ),
  ),
  transports: [transport, new wiston.transports.Console({ level: "error" })],
});

export default logger;
