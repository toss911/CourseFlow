import { Router } from "express";
import multer from "multer";
import * as user_controller from "../controllers/userController.js";

const userRouter = Router();
const multerUpload = multer({ dest: "uploads/" });
const avatarUpload = multerUpload.fields([{ name: "avatar", maxCount: 1 }]);

userRouter.put("/:userId", avatarUpload, user_controller.updateProfile);

export default userRouter;
