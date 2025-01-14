import { Comment } from '../models/comments.model';
import { User } from '../models/user.model';
import { Video } from '../models/videos.model';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

// Configuración de la base de datos con TypeORM
export const appDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'loopy',
    port: 5433,
    password: 'RbhF6M0eu9r',
    database: 'db_loopy',
    synchronize: false,
    logging: true,
    entities: [
        User,
        Video,
        Comment
    ],
    migrations: ['src/migrations/**/*.ts'],
});

// Inicializamos la conexión de la base de datos
export const connectDatabase = async () => {
    try {
        await appDataSource.initialize();
        console.log(`
            /* *********************************** */
                Conexión a la base de datos exitosa
            /* *********************************** */
        `);
    } catch (error) {
        console.error(`Error al conectar con la base de datos: ${error}`);
        throw new Error(`Error to connecting the database ${error}`);
    }
};

