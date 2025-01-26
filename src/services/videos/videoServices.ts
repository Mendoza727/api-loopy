import { Video } from "../../models/videos.model";
import { VideoDTO } from "../../interfaces/video.interface";
import { userServices } from "../../services/user/userServices";
import { UserDTO } from "../../interfaces/user.interfaces";
import appDataSource from "../../config/database";

export class videoServices extends userServices {
  private videoRepository = appDataSource.getRepository(Video);

  async getVideos() {
    const videos = await this.videoRepository.find({
      relations: ["user"],
      select: {
        id: true,
        title: true,
        description: true,
        url: true,
        likes: true,
        comments: true,
        hashtags: true,
        created_at: true,
        updated_at: true,
        user: {
          id: true,
          username: true,
          avatar: true,
          followers: true,
          following: true,
        },
      },
      order: { created_at: "DESC" },
    });

    return videos;
  }

  async getVideoById(id: number) {
    return await this.videoRepository.findOne({
      where: { id },
    });
  }

  async createVideo(videoData: VideoDTO): Promise<Video | any> {
    const { title, description, url, likes, comments, user } = videoData;

    if (!url || typeof url !== "string" || url.trim() === "") {
      throw new Error("url is not valid");
    }

    //obtemenos el usuario
    const tags = videoData.tags || [];
    const formattedTags = Array.isArray(tags) ? tags.join(",") : ""; // Verifica si es un array

    console.log("formattedTags", tags, formattedTags);

    const video = this.videoRepository.create({
      title,
      description,
      url,
      comments,
      likes,
      hashtags: tags,
      created_at: new Date(),
      updated_at: new Date(),
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        followers: user.followers,
        following: user.following,
      },
    });

    // guardamos el video
    const savedVideo = await this.videoRepository.save(video);
    return savedVideo;
  }

  async updateVideo(id: number, videoData: VideoDTO): Promise<Video | any> {
    const { title, description, url, likes, comments, tags } = videoData;

    if (!title || typeof title !== "string" || title.trim() === "") {
      throw new Error("title is not valid");
    }

    if (
      !description ||
      typeof description !== "string" ||
      description.trim() === ""
    ) {
      throw new Error("description is not valid");
    }

    if (!url || typeof url !== "string" || url.trim() === "") {
      throw new Error("url is not valid");
    }

    if (!tags || !Array.isArray(tags)) {
      throw new Error("tags is not valid");
    }

    const video = await this.getVideoById(id);

    if (!video) {
      throw new Error("Video not found");
    }

    video.title = title;
    video.description = description;
    video.url = url;
    video.likes = likes;
    video.comments = comments;
    video.hashtags = tags.join(",");
    video.updated_at = new Date();

    const updatedVideo = await this.videoRepository.save(video);
    return updatedVideo;
  }

  async getVideosByUser(user: UserDTO) {
    const videos = await this.videoRepository.find({
      where: {
        user: { id: user.id },  // Compara el id del usuario con el id de la relación 'user' en el video
      },
      relations: ["user"],
      select: {
        id: true,
        title: true,
        description: true,
        url: true,
        likes: true,
        comments: true,
        hashtags: true,
        created_at: true,
        updated_at: true,
        user: {
          id: true,
          username: true,
          avatar: true,
          followers: true,
          following: true,
        },
      },
      order: { created_at: "DESC" },
    });
  
    return videos;
  }  
}
