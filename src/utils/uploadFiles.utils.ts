import multer from 'multer';
import path from 'path';
import fs from 'fs';

export const uploadImage = (req: Request, res: Response): Promise<void> => {
  return new Promise((resolve, reject) => {
    const uploadPath = path.join(__dirname, '..', 'assets'); // Ruta de la carpeta 'assets'

    // Crear el directorio 'assets' si no existe
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const storage = multer.diskStorage({
      destination: (req, file, cb) => cb(null, uploadPath), // Ruta de destino
      filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname); // Obtener extensión
        const fileName = `${Date.now()}${fileExtension}`; // Nombre único para el archivo
        cb(null, fileName); // Asignar nombre al archivo
      }
    });

    const upload = multer({
      storage,
      fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase()) && allowedTypes.test(file.mimetype);
        cb(null, isValid); // Validar tipo de archivo
      }
    }).single('avatar'); // Campo del formulario

    upload(req as any, res as any, (err: any) => {
      if (err) {
        reject(err); // Rechazar promesa si hay error
      } else {
        resolve(); // Resolver promesa si todo es exitoso
      }
    });
  });
};
