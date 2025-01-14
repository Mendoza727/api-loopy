import express from 'express';
import { userController } from '@/controllers/users/userController';

const router = express.Router();
const useController = new userController();

// Rutas de usuarios
export const userRoutes = () => {
  router.post('/register', useController.registerUser);
  return router; // Asegúrate de devolver el router configurado
}

export default router;
