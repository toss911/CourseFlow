import { Router } from "express";
import multer from "multer";
import * as admin_controller from "../controllers/adminController.js";
import { protect } from "../middlewares/protect.js";

const adminRouter = Router();
const multerUpload = multer({ dest: "uploads/" });
const videoSubLessonUpload = multerUpload.fields([
  { name: "video", maxCount: 1 },
]);

adminRouter.post("/add-course", protect, admin_controller.addCourse);
adminRouter.put("/add-lesson", protect, admin_controller.videoSubLessonUpload);

export default adminRouter;
