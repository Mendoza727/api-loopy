import "reflect-metadata";
import { appDataSourceSelected } from '../../config';


// Inicializamos la conexión de la base de datos
export const connectDatabase = async () => {
  try {
    await appDataSourceSelected
      .initialize()
      .then(() => console.log("Database initialized"))
      .catch((err) => console.error("Error initializing database:", err));
  } catch (error) {
    console.error(`Error al conectar con la base de datos: ${error}`);
    throw new Error(`Error to connecting the database ${error}`);
  }
};
