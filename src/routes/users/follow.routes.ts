import { FollowController } from '../../controllers/users/followController';
import express from 'express';


const router = express.Router();
const useController = new FollowController();


// endpoints follows
export const followRoutes = () => {
  router.post("/:userId/:followerId", useController.followUser.bind(useController));
  router.post("/:userId/unfollow/:followerId", useController.unFollowUser.bind(useController));
  router.get("/:id/get-followers", useController.getFollowers.bind(useController));
  router.get("/:id/get-followings", useController.getFollowing.bind(useController));

  
  return router;
};

export default followRoutes;