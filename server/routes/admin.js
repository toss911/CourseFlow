import { Router } from "express";
import multer from "multer";
import * as admin_controller from "../controllers/adminController.js";
import { protect } from "../middlewares/protect.js";

const adminRouter = Router();
const multerUpload = multer({ dest: "uploads/" });

const courseUpload = multerUpload.fields([
  { name: "course_cover_images", maxCount: 1 },
  { name: "course_video_trailers", maxCount: 1 },
  { name: "course_attached_files", maxCount: 20 },
  { name: "sub_lesson_videos", maxCount: 200 },
]);

adminRouter.post("/add-course", courseUpload, admin_controller.addCourse);
adminRouter.get("/get-course/:courseId", admin_controller.getCourse);
adminRouter.get(
  "/edit-course/:courseId/edit-lesson",
  protect,
  admin_controller.getAllCoursesData
);

adminRouter.get(
  "/edit-course/:courseId/edit-lesson/:lessonId",
  protect,
  admin_controller.getCourseLesson
);
adminRouter.put(
  "/edit-course/:courseId/edit-lesson/:lessonId",
  protect,
  admin_controller.editLesson
);
adminRouter.delete(
  "/edit-course/:courseId/edit-lesson/:lessonId",
  protect,
  admin_controller.deleteLesson
);
adminRouter.get("/courses", protect, admin_controller.getAdminCourses);
adminRouter.delete(
  "/courses/:courseId",
  protect,
  admin_controller.deleteCourse
);

adminRouter.get("/assignments", protect, admin_controller.getAllCoursesData);
adminRouter.post("/assignments", protect, admin_controller.postNewAssignment);
adminRouter.get(
  "/assignments/list",
  protect,
  admin_controller.getAllAssignment
);
adminRouter.get(
  "/assignments/:assignmentId",
  protect,
  admin_controller.getAssignmentById
);
adminRouter.put(
  "/assignments/:assignmentId",
  protect,
  admin_controller.editAssignment
);
adminRouter.delete(
  "/assignments/:assignmentId",
  protect,
  admin_controller.deleteAssignment
);

adminRouter.put(
  "/edit-course/:courseId",
  courseUpload,
  admin_controller.updateCourse
);
adminRouter.delete(
  "/delete-course/:courseId",
  courseUpload,
  admin_controller.deleteCourse
);

export default adminRouter;
