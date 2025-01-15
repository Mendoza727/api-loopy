import "reflect-metadata";

import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { userRoutes } from "./routes/users/user.routes";
import { appDataSource, connectDatabase } from "./config/database";
import path from "path";

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 8081;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Rutas
app.use("/api/v1/hello-word", (req, res) => {
  res.send("Hello Word");
});

// apis user
app.use("/api/v1/auth", userRoutes());

// directory image
app.use("/assets", express.static(path.join(__dirname, "assets")));


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);

  try {
    appDataSource.initialize()
    .then(async () => {
      console.log("Conexión con PostgreSQL establecida.");
    })
  } catch (error) {
    console.error('Error connecting database');
  }
});

export default app;
