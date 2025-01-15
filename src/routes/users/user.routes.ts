import express, { Request, Response } from "express";
import { userController } from "@/controllers/users/userController";

const router = express.Router();
const useController = new userController();

// Rutas de usuarios
export const userRoutes = () => {
  router.post("/register", (req: Request, res: Response) => {
    useController.registerUser(req, res).catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error al registrar el usuario", error: error.message });
    });
  });
  return router;
};

export default userRoutes;
