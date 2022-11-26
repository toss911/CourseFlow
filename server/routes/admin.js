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

export default adminRouter;
