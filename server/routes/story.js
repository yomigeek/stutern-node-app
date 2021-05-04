import { Router } from "express";
import CheckConflicts from './../middlewares/CheckConflicts';
import Token from './../utils/Token';
import StoryController from './../controllers/StoryController';

const storyRouter = Router();

storyRouter.post(
  "/add",
  Token.verifyToken,
  CheckConflicts.validatePermission,
  CheckConflicts.validateStoryDetail,
  StoryController.addStory
);

storyRouter.post(
  "/update/:id",
  Token.verifyToken,
  CheckConflicts.validatePermission,
  CheckConflicts.existingStory,
  CheckConflicts.validateStoryDetail,
  StoryController.updateStory,
);

export default storyRouter;