import { Router } from "express";
import * as auth_controller from "../controllers/authController.js";

const authRouter = Router();

// Register
authRouter.post("/register", auth_controller.register);

// Login
authRouter.post("/login", auth_controller.login);

export default authRouter;
