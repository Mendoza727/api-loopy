    import { UserDTO } from "./user.interfaces";

    export interface VideoDTO {
        id?: number;
        user: UserDTO;
        title: string;
        description: string;
        tags: any;
        url: string;
        likes: string;
        comments: number;
    }