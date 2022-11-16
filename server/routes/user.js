import { Router } from "express";
import multer from "multer";
import * as user_controller from "../controllers/userController.js";
import { protect } from "../middlewares/protect.js";

const userRouter = Router();
const multerUpload = multer({ dest: "uploads/" });
const avatarUpload = multerUpload.fields([{ name: "avatar", maxCount: 1 }]);

userRouter.put(
  "/:userId",
  protect,
  avatarUpload,
  user_controller.updateProfile
);

userRouter.get("/mycourses", protect, user_controller.subscribedCourses);

export default userRouter;
