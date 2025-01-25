import "reflect-metadata";

import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { userRoutes } from "./routes/users/user.routes";
import { connectDatabase } from "./config/database";
import path from "path";
import tokenMiddleware from "../src/middleware/token.middleware";
import { videoRoutes } from "./routes/videos/videos.routes";

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 8081;

// Middlewares
app.use(cors({
  origin: (origin, callback) => {
    const allowList = ["http://localhost:3000", "http://localhost:8081"];
    if (!origin || allowList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


// apis user, video, comments
app.use("/api/v1/auth", userRoutes());
app.use('/api/v1/video', tokenMiddleware, videoRoutes());


// directory image
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);

  try {
    connectDatabase()
    .then(async () => {
      console.log("Conexión con PostgreSQL establecida.");
    })
  } catch (error) {
    console.error('Error connecting database');
  }
});

export default app;
