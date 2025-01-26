
import { Request, Response } from "express";
import { UserDTO, userLoginDTO } from "../../interfaces/user.interfaces";
import { userServices,  FollowServices, videoServices} from "../../services";
import generateAvatar from "../../utils/generateAvatars.utils";

const userService = new userServices();
const followService = new FollowServices();
const videos = new videoServices();
export class userController {
  async registerUser(req: Request, res: Response): Promise<Response<UserDTO>> {
    try {
      const userData: UserDTO = req.body;

      const existEmail = await userService.verifyEmail(userData.email);

      if (!existEmail) {
        // Generamos el avatar
        const avatar = await generateAvatar(userData.username);

        if (avatar) {
          userData.avatar = avatar;
        }

        // Crear el usuario y esperar a que la promesa se resuelva
        const newUser = await userService.createUser(userData);

        return res.status(201).json({
          message: "Usuario registrado con éxito",
          user: newUser, // Retorna el usuario recién creado
        });
      } else {
        return res.status(400).json({
          message: "El correo ya está en uso, por favor verifica los datos",
        });
      }
    } catch (error) {
      console.error(error); // Asegúrate de ver el error en la consola
      return res.status(500).json({
        message: "Error al registrar el usuario",
        error: error.message,
      });
    }
  }

  async authLogin(req: Request, res: Response): Promise<Response<UserDTO>> {
    try {
      const userData: userLoginDTO = req.body;

      const login = await userService.loginUser(userData);
      const ownVideos = await videos.getVideosByUser(login.user);
      const getInfoFollow = await followService.getFollowers(login.user.id);
      const getInfoFollowing = await followService.getFollowing(login.user.id);

      console.log(getInfoFollow);

      if (login) {
        return res.status(200).json({
          message: "Credenciales Validas, Bienvenido",
          user: {
            ...login.user,
            followers: getInfoFollow,
            following: getInfoFollowing,
          }, // Retorna el usuario recién creado
          videos: ownVideos,
          token: login.token
        });
      }
    } catch (error) {
      console.error(error); // Asegúrate de ver el error en la consola
      return res.status(500).json({
        message: "Error al autentificar el usuario",
        error: error.message,
      });
    }
  }
}
