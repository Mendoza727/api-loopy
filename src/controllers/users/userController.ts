import { userServices } from '../../services/user/userServices';
import { UserDTO } from "../../interfaces/user.interfaces";
import { Request, Response } from "express";
import uploadFile from '@/utils/uploadFiles.utils';

export class userController {
  private user = new userServices();

  async registerUser(req: Request, res: Response): Promise<Response | any> {
    // Primero, subimos el archivo usando el helper
    uploadFile(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Error al subir el avatar', error: err.message });
      }

      // Si la subida es exitosa, obtener el nombre del archivo (avatar)
      const avatar = req.file ? req.file.filename : null;

      // Recoger los datos del usuario
      const userData: UserDTO = req.body;
      if (avatar) {
        // Si hay un avatar, añadirlo a los datos del usuario
        userData.avatar = avatar;
      }

      try {
        // Llamar al servicio para crear el usuario
        const newUser = await this.user.createUser(userData);

        // Devolver respuesta con el usuario creado
        return res.status(201).json({
          message: 'Usuario registrado con éxito',
          user: newUser
        });
      } catch (error) {
        return res.status(500).json({
          message: 'Error al registrar el usuario',
          error: error.message
        });
      }
    });
  }
}
