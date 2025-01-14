export interface UserDTO {
    id: number;
    username: string;
    email: string;
    password: string;
    avatar: string;
    followers: number;
    following: number;
    created_at: Date;
    updated_at: Date;
}