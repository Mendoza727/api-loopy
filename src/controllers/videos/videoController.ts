import { Request, Response } from "express";
import { uploadVideo } from "../../utils/uploadFiles.utils";
import { VideoDTO } from "../../interfaces/video.interface";
import { videoServices } from "../../services";

const videoService = new videoServices();

export class videoController {
  async createVideo(req: Request, res: Response): Promise<Response<VideoDTO>> {
    try {
      // Procesar video y campos del formulario
      const video = await uploadVideo(req, res);
  
      if (!video) {
        return res.status(400).json({
          message: "No video uploaded",
        });
      }
  
      // Los demás datos del formulario estarán en `req.body`
      const { user, title, description, tags } = req.body;
      
  
      if (!title) {
        return res.status(400).json({
          message: "Title is required",
        });
      }

      const userId = await videoService.getUserById(user);

      if (!userId) {
        return res.status(400).json({
          message: "User not found",
        });
      }

      const videoData: VideoDTO = {
        user: userId, // Usuario autenticado
        title: title,
        description: description,
        tags: tags,
        url: video.path,
        likes: '0',
        comments: 0
      };
  
      // Aquí podrías guardar los datos en la base de datos si es necesario
      const newVideo = await videoService.createVideo(videoData);
  
      return res.status(201).json({
        message: "Video created successfully",
        video: newVideo.dataValues,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error to create video",
        error: error.message,
      });
    }
  }
  

  async getVideos(req: Request, res: Response): Promise<Response<VideoDTO[]>> {
    try {
      const videos = await videoService.getVideos();

      return res.status(200).json({
        message: "Videos found",
        videos,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error to get videos",
        error: error.message,
      });
    }
  }

  async getVideoById(req: Request, res: Response): Promise<Response<VideoDTO>> {
    try {
      const { id } = req.params;

      const video = await videoService.getVideoById(Number(id));

      return res.status(200).json({
        message: "Video found",
        video,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error to get video",
        error: error.message,
      });
    }
  }

  async updateVideo(req: Request, res: Response): Promise<Response<VideoDTO>> {
    try {
      const { idVideo } = req.params;
      const videoData: VideoDTO = req.body;

      const video = await videoService.updateVideo(Number(idVideo), videoData);

      return res.status(200).json({
        message: "Video updated successfully",
        video,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error to update video",
        error: error.message,
      });
    }
  }
}
