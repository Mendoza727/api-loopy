import { appDataSource } from "@/config/database";
import { UserDTO } from "@/interfaces/user.interfaces";
import { User } from "@/models/user.model";

import bcrypt from 'bcrypt';

export class userServices {
    private userRepository = appDataSource.getRepository(User);
    
    async createUser(userData: UserDTO): Promise<User> {
        const {
            username,
            email,
            avatar,
            password,
            created_at,
            updated_at
        } = userData;

        const existingUser = await this.userRepository.findOne({
            where: { email }
        });

        if (existingUser) throw new Error(`Email has existing please verify the data`);


        // encrypt password for save in the database
        const hashedPassword = await bcrypt.hash(
            password,
            30
        );

        // register the new user
        const user = this.userRepository.create({
            username,
            email,
            avatar,
            created_at,
            updated_at
        });

        return await this.userRepository.save(user);
    }
}