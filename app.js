import express from "express";
import bodyParser from "body-parser";

import categoriasRouter from "./routes/categoriasRoutes.js";

export const app = express();

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }))

app.use("/categorias", categoriasRouter)

app.listen(3000, () => {
  console.log("HOLA");
});