import { Router } from "express";
import AuthController from "../controllers/AuthController";
import CheckConflicts from './../middlewares/CheckConflicts';

const authRouter = Router();

authRouter.post(
  "/login",
  AuthController.userLogin
);

authRouter.post(
    "/signup",
    CheckConflicts.validateUserDetail,
    AuthController.userSignUp
  );


export default authRouter;