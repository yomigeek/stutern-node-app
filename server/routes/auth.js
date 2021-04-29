import { Router } from "express";
import AuthController from "../controllers/AuthController";
import CheckConflicts from './../middlewares/CheckConflicts';

const authRouter = Router();

authRouter.post(
  "/login",
  CheckConflicts.validateLoginDetail,
  AuthController.userLogin
);

authRouter.post(
    "/signup",
    CheckConflicts.validateUserDetail,
    CheckConflicts.existingUser,
    AuthController.userSignUp
  );


export default authRouter;