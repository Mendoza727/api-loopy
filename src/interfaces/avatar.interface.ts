export interface AvatarResponse {
    results: Result[];
}

export interface Result {
    picture: Picture;
}

export interface Picture {
    large:  string;
}
