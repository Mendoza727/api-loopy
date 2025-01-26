import "reflect-metadata";
import { DataSource } from "typeorm";
import { CommentVideo, Follow, User, Video } from "../models";

const appDataSource = new DataSource({
  type: "postgres",
  host: (process.env.DB_HOST || "localhost"),
  username: (process.env.DB_USER || "loopy"),
  port: Number(process.env.DB_PORT || 5433),
  password: (process.env.DB_PASSWORD || "RbhF6M0eu9r"),
  database: (process.env.DB_NAME || "db_loopy"),
  synchronize: true,
  logging: true,
  entities: [User, Video, CommentVideo, Follow],
  migrations: ["src/migrations/*.ts"],
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

export default appDataSource;