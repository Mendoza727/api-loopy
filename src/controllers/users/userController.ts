import { userServices } from "../../services/user/userServices";
import { UserDTO } from "../../interfaces/user.interfaces";
import { uploadImage } from "@/utils/uploadFiles.utils";
import { Request, Response } from "express";

const userService = new userServices();
export class userController {
  async registerUser(req: Request, res: Response): Promise<Response> {
    try {
      const userData: UserDTO = req.body;

      const isEmailExit = userService.verifyEmail(userData.email);
      console.log(isEmailExit);

      if (!isEmailExit) {
        // register this not exits
        await uploadImage(req as any, res as any);
        const avatar = req.file ? req.file.filename : null;

        if (avatar) {
          userData.avatar = avatar; // Asignar el nombre del archivo como avatar
        }

        const newUser = userService.createUser(userData);

        return res.status(201).json({
          message: "Usuario registrado con éxito",
          user: (await newUser).avatar,
        });
      } else {
        return res.status(409).json({
          message: `this email has existing please review your data`,
        });
      }
    } catch (error) {
      console.error(error); // Asegúrate de ver el error en la consola
      return res.status(409).json({
        message: "Error al registrar el usuario",
        error: error.message,
      });
    }
  }

  async loginUser(req: Request, res: Response): Promise<Response> {
    try {
    } catch (error) {
      console.error(error); // Asegúrate de ver el error en la consola
      return res.status(500).json({
        message: "Error al registrar el usuario",
        error: error.message,
      });
    }
  }
}
