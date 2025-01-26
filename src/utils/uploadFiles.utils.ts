import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid"; // Para generar UID
import { Request, Response } from "express";

export const uploadVideo = (req: Request, res: Response): Promise<{ path: string }> => {
  return new Promise((resolve, reject) => {
    const uploadPath = path.join(__dirname, "..", "assets", "videos");

    // Crear la carpeta `videos` si no existe
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const storage = multer.diskStorage({
      destination: (req, file, cb) => cb(null, uploadPath), // Guardar archivo
      filename: (req, file, cb) => {
        const fileExtension = ".mp4"; // Extensión fija
        const fileName = `${uuidv4()}${fileExtension}`; // Nombre único con UID
        cb(null, fileName);
      },
    });

    const upload = multer({
      storage,
      fileFilter: (req, file, cb) => {
        const allowedType = "video/mp4";
        const isValid = file.mimetype === allowedType; // Validar que sea tipo MP4
        if (!isValid) {
          cb(new Error("Only .mp4 videos are allowed!")); // Rechazar si no es válido
        } else {
          cb(null, true); // Aceptar archivo
        }
      },
    }).single("url"); // Campo del formulario

    upload(req as any, res as any, (err: any) => {
      if (err) {
        reject(err); // Rechazar si hay error
      } else {
        if (!req.file) {
          reject(new Error("No file uploaded"));
          return;
        }

        const relativePath = `videos/${req.file.filename}`; // Ruta relativa
        resolve({ path: relativePath }); // Resolver con ruta relativa
      }
    });
  });
};
