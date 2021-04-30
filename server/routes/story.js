import { Router } from "express";
import CheckConflicts from './../middlewares/CheckConflicts';
import Token from './../utils/Token';

const storyRouter = Router();

storyRouter.post(
  "/add",
  Token.verifyToken,
  CheckConflicts.validateStoryDetail,
);

export default storyRouter;