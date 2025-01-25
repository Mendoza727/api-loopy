import { DataSource } from "typeorm";
import { CommentVideo, User, Video } from "./src/models";

const appDataSourceProduction = new DataSource({
  type: "postgres",
  host: "db", // db => docker container
  username: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false, // loggin false in production
  entities: [User, Video, CommentVideo],
  migrations: ["src/migrations/*.ts"],
});

const appDataSourceDevelopment = new DataSource({
    type: "postgres",
    host: "localhost",
    username: "loopy",
    port: 5433,
    password: "your_pasword",
    database: "db_loopy",
    synchronize: true,
    logging: true,
    entities: [User, Video, CommentVideo],
    migrations: ["src/migrations/*.ts"],
});

export const appDataSourceSelected = appDataSourceDevelopment;