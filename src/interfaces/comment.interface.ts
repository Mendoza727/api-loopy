import { UserDTO } from "./user.interfaces";
import { VideoDTO } from "./video.interface";

export interface CommentDTO {
    id: number;
    user_id: UserDTO;
    video_id: VideoDTO;
    comment: string;
    created_at: Date;
    updated_at: Date;
}