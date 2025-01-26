import { Repository } from "typeorm";
import appDataSource from "../../config/database";
import { User, Follow } from "../../models";

export class FollowServices {
  private userRepository: Repository<User> = appDataSource.getRepository(User);
  private followRepository: Repository<Follow> = appDataSource.getRepository(Follow);

  async followUser(followerId: number, userId: number) {
    if (followerId === userId) {
      throw new Error("You cannot follow yourself.");
    }

    const follower = await this.userRepository.findOne({ where: { id: followerId } });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!follower || !user) {
      throw new Error("Follower or user not found.");
    }

    // Verificar si ya existe la relación de seguimiento
    const existingFollow = await this.followRepository.findOne({
      where: { follower: { id: followerId }, user: { id: userId } },
    });

    if (existingFollow) {
      throw new Error("You are already following this user.");
    }

    // Crear la relación de seguimiento
    const follow = this.followRepository.create({ follower, user });
    await this.followRepository.save(follow);

    // Incrementar el número de seguidores del usuario seguido
    user.followers = (user.followers || 0) + 1;
    await this.userRepository.save(user);

    // Incrementar el número de seguimientos del seguidor
    follower.following = (follower.following || 0) + 1;
    await this.userRepository.save(follower);

    return {
      message: "You are now following the user.",
    };
  }

  async unfollowUser(followerId: number, userId: number) {
    if (followerId === userId) {
      throw new Error("You cannot unfollow yourself.");
    }

    // Verificar si existe la relación de seguimiento
    const follow = await this.followRepository.findOne({
      where: { follower: { id: followerId }, user: { id: userId } },
    });

    if (!follow) {
      throw new Error("You are not following this user.");
    }

    // Eliminar la relación de seguimiento
    await this.followRepository.remove(follow);

    // Decrementar el número de seguidores del usuario seguido
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user) {
      user.followers = (user.followers || 0) - 1;
      await this.userRepository.save(user);
    }

    // Decrementar el número de seguimientos del seguidor
    const follower = await this.userRepository.findOne({ where: { id: followerId } });
    if (follower) {
      follower.following = (follower.following || 0) - 1;
      await this.userRepository.save(follower);
    }

    return {
      message: "You have unfollowed the user.",
    };
  }

  // Obtener los usuarios a los que un usuario sigue
  async getFollowing(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found.");
    }

    const following = await this.followRepository.find({
      where: { follower: { id: userId } },
      relations: ["user"], // Trae los usuarios que está siguiendo
    });

    const followingUsers = following.map((follow) => follow.user);

    return followingUsers;
  }

  // Obtener los usuarios que siguen a un usuario
  async getFollowers(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found.");
    }

    const followers = await this.followRepository.find({
      where: { user: { id: userId } },
      relations: ["follower"], // Trae los usuarios que lo están siguiendo
    });

    const followersUsers = followers.map((follow) => follow.follower);

    return followersUsers;
  }
}
