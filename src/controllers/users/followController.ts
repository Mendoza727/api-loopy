import { Request, Response } from "express";
import { FollowServices } from "../../services";

export class FollowController {
    private followServices = new FollowServices();

    // Función para seguir a un usuario
    async followUser(req: Request, res: Response): Promise<Response> {
        try {
            const { followerId, userId } = req.params;

            console.log(followerId, userId);

            // Llamamos al servicio para seguir al usuario
            const result = await this.followServices.followUser(Number(followerId), Number(userId));

            // Si se puede seguir al usuario, respondemos con un mensaje
            return res.status(200).json({
                message: "Siguiendo al usuario",
                result,
            });
        } catch (error) {
            console.error(error); // Mostrar error en consola
            return res.status(500).json({
                message: "Error al seguir al usuario",
                error: error.message,
            });
        }
    }

    // Función para dejar de seguir a un usuario
    async unFollowUser(req: Request, res: Response): Promise<Response> {
        try {
            const { id: userId } = req.params; // ID del usuario a dejar de seguir
            const { id: followerId } = req.params; // ID del usuario que deja de seguir (tomado del JWT o contexto)

            // Llamamos al servicio para dejar de seguir al usuario
            const result = await this.followServices.unfollowUser(Number(followerId), Number(userId));

            // Si se deja de seguir al usuario, respondemos con un mensaje
            return res.status(200).json({
                message: "Dejaste de seguir al usuario",
                result,
            });
        } catch (error) {
            console.error(error); // Mostrar error en consola
            return res.status(500).json({
                message: "Error al dejar de seguir al usuario",
                error: error.message,
            });
        }
    }

    // Función para obtener los seguidores de un usuario
    async getFollowers(req: Request, res: Response): Promise<Response> {
        try {
            const { id: userId } = req.params; // ID del usuario al que queremos ver los seguidores
            const followers = await this.followServices.getFollowers(Number(userId));

            return res.status(200).json(followers);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Error al obtener los seguidores",
                error: error.message,
            });
        }
    }

    // Función para obtener los usuarios a los que un usuario sigue
    async getFollowing(req: Request, res: Response): Promise<Response> {
        try {
            const { id: userId } = req.params; // ID del usuario al que queremos ver a quién sigue
            const following = await this.followServices.getFollowing(Number(userId));

            return res.status(200).json(following);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Error al obtener los usuarios que sigues",
                error: error.message,
            });
        }
    }
}
