
import express, { Request, Response } from "express";
import { videoController } from "../../controllers/videos/videoController";
import e from "express";

const router = express.Router();
const useController = new videoController();

export const videoRoutes = () => {
    router.post("/create", useController.createVideo.bind(useController));
    router.get("/get-videos", useController.getVideos.bind(useController));
    router.get("/:id", useController.getVideoById.bind(useController));
    
    return router;
};