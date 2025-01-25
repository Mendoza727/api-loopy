import express, { Request, Response } from "express";
import { userController } from "../../controllers/users/userController";

const router = express.Router();
const useController = new userController();

// Rutas de usuarios
export const userRoutes = () => {
  router.post("/register", useController.registerUser.bind(useController));
  router.post('/login', useController.authLogin.bind(useController));

  
  return router;
};

export default userRoutes;
