import { User } from "../../models/user.model";
import { appDataSourceSelected } from "../../../config";


export class followServices {
    private userRepository = appDataSourceSelected.getRepository(User); 

    
    async verifyFollow(id: number) {
        const existFollow = await this.userRepository.exists({
            where: { id }
        });

        return !!existFollow;
    }
}