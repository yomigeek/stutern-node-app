import { Router } from "express";
import CheckConflicts from './../middlewares/CheckConflicts';
import Token from './../utils/Token';
import StoryController from './../controllers/StoryController';

const storyRouter = Router();

storyRouter.post(
  "/add",
  Token.verifyToken,
  CheckConflicts.validateStoryDetail,
  StoryController.addStory
);

export default storyRouter;