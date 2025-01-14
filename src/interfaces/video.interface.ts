import { UserDTO } from "./user.interfaces";

export interface VideoDTO {
    id: number;
    user: UserDTO;
    title: string;
    description: string;
    url: string;
    likes: number;
    comments: number;
}