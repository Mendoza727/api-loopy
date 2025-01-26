import appDataSource from "../../config/database";
import { UserDTO, userLoginDTO } from "../../interfaces/user.interfaces";
import { User } from "../../models/user.model";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export class userServices {
  private userRepository = appDataSource.getRepository(User);

  async verifyEmail(email: string) {
    const existEmail = await this.userRepository.exists({
      where: { email }
    });

    return !!existEmail;
  }

  async createUser(userData: UserDTO): Promise<Omit<User, 'id' | 'password'>> { // Omitir 'id' y 'password' en el retorno
    const { username, email, avatar, password } = userData;

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

    // Guardamos al usuario
    const savedUser = await this.userRepository.save(user);

    // Desestructuramos el objeto para excluir 'id' y 'password'
    const { id, password: _, ...userWithoutIdPassword } = savedUser;

    return userWithoutIdPassword; // Retornamos el usuario sin 'id' y 'password'
  }

  async loginUser(authData: userLoginDTO) {
    const { email, password } = authData;

    const user = await this.userRepository.findOne({
      where: { email }
    });
    if (!user) throw new Error('Correo No existe');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Contraseña incorrecta');

    // creamos el jwt
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET || 'FDKFDKFDJFKKJFDSKFSKF',
      {
        expiresIn: '1.5h'
      }
    );

    // retornamos datos
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token, // El token generado
    };
  }

  async getUserById(id: number) {
    return await this.userRepository.findOne({
      where: { id }
    });
  }
}
