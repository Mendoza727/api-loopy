import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { userRoutes } from "./routes/users/user.routes";
import { connectDatabase } from "./config/database";

// Cargar variables de entorno
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8081;

connectDatabase()
  .then(() => {
    console.log("Conexión a la base de datos exitosa");
  })
  .catch((error) => {
    console.error("Error al conectar con la base de datos", error);
  });

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
app.use("/api/v1/users", userRoutes());

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

export default app;
