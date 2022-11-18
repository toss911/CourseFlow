import { Router } from "express";
import * as courses_controller from "../controllers/coursesController.js";

const coursesRouter = Router();

coursesRouter.get("/", courses_controller.getAll);

coursesRouter.get("/desire", courses_controller.getDesire);

coursesRouter.get("/:courseId", courses_controller.getById);

coursesRouter.post("/:courseId", courses_controller.postSubscribeOrAddCourse);

export default coursesRouter;
