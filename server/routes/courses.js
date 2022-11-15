import { Router } from "express";
import * as courses_controller from "../controllers/coursesController.js";

const coursesRouter = Router();

coursesRouter.get("/", courses_controller.getAll);

coursesRouter.get("/:courseId", courses_controller.getById);

coursesRouter.post("/:courseId", courses_controller.postSubscribeOrAddCourse);

coursesRouter.get("/:courseId/learning", courses_controller.getLearningById);

export default coursesRouter;
