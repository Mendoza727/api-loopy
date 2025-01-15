import "reflect-metadata";
import { DataSource } from "typeorm";

import { CommentVideo, User, Video } from "../models";

// Configuración de la base de datos con TypeORM
export const appDataSource = new DataSource({
  type: "postgres",
  host: 'db', // db => docker container
  username: "loopy",
  port: 5433,
  password: "RbhF6M0eu9r",
  database: "db_loopy",
  synchronize: false,
  logging: true,
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
