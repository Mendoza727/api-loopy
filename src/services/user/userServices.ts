import { appDataSource } from "@/config/database";
import { UserDTO } from "@/interfaces/user.interfaces";
import { User } from "@/models/user.model";
import bcrypt from 'bcryptjs';

export class userServices {
  private userRepository = appDataSource.getRepository(User);

  async verifyEmail(email: string) {
    const existEmail = await this.userRepository.findOne({
      where: {email }
    });

    if (existEmail.email === email) return true;
    return false;
  }

  async createUser(userData: UserDTO): Promise<User> {
    const { username, email, avatar, password } = userData;

    console.log(password);

    if (!password || typeof password !== "string" || password.trim() === "") {
      throw new Error("password is not valid");
    }

    const existingUser = await this.verifyEmail(email);

    if (existingUser)
      throw new Error(`El correo ya está en uso, por favor verifica los datos`);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      avatar,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return await this.userRepository.save(user);
  }
}
