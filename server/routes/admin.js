import { Router } from "express";
import multer from "multer";
import * as admin_controller from "../controllers/adminController.js";
import { protect } from "../middlewares/protect.js";

const adminRouter = Router();
const multerUpload = multer({ dest: "uploads/" });
// const videoSubLessonUpload = multerUpload.fields([
//   { name: "video", maxCount: 1 },
// ]);

const courseUpload = multerUpload.fields([
  { name: "course_cover_images", maxCount: 1},
  { name: "course_video_trailers", maxCount: 1},
  { name: "course_attached_files", maxCount: 20},
  { name: "sub_lesson_videos", maxCount: 200}
])

adminRouter.post("/add-course", courseUpload, admin_controller.addCourse);
adminRouter.put("/add-lesson", protect, admin_controller.videoSubLessonUpload);

export default adminRouter;
