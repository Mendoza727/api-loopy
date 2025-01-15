import "reflect-metadata";
import { DataSource } from "typeorm";

import { CommentVideo, User, Video } from "../models";

// Configuración de la base de datos con TypeORM
export const appDataSource = new DataSource({
  type: "postgres",
  host: 'db', // db => docker container
  username: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true, // loggin false in production
  entities: [
    User,
    Video,
    CommentVideo
  ],
  migrations: ["src/migrations/*.ts"]
});

// Inicializamos la conexión de la base de datos
export const connectDatabase = async () => {
  try {
    await appDataSource
      .initialize()
      .then(() => console.log("Database initialized"))
      .catch((err) => console.error("Error initializing database:", err));
  } catch (error) {
    console.error(`Error al conectar con la base de datos: ${error}`);
    throw new Error(`Error to connecting the database ${error}`);
  }
};
