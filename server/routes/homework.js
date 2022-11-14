import { Router } from "express";
import * as homework_controller from "../controllers/homeworkController.js";

const homeworkRouter = Router();

homeworkRouter.get("/:userId", homework_controller.getAllHomework);

homeworkRouter.post("/:assignmentId", homework_controller.submitHomework);

export default homeworkRouter;