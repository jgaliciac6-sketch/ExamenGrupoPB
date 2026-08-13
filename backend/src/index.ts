import chalk from "chalk";
import server from "./server";

const port = process.env.PORT || 4000;

server.listen(Number(port), "0.0.0.0", () => {
  console.log(chalk.cyan.bold(`Rest API en el puerto ${port}`));
});
