import { Router } from "express";
import * as courses_controller from "../controllers/coursesController.js";
import { protect } from "../middlewares/protect.js";
import { getProgress } from "../middlewares/getProgress.js";

const coursesRouter = Router();

coursesRouter.get("/", courses_controller.getAll);

coursesRouter.get("/:courseId", courses_controller.getById);

coursesRouter.post(
  "/:courseId",
  protect,
  courses_controller.postSubscribeOrAddCourse
);

coursesRouter.get(
  "/:courseId/learning",
  protect,
  getProgress,
  courses_controller.getLearningById
);

export default coursesRouter;
