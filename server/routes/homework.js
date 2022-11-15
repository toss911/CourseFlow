import { Router } from "express";
import * as homework_controller from "../controllers/homeworkController.js";

const homeworkRouter = Router();

homeworkRouter.get("/:userId", homework_controller.getAllHomework);

homeworkRouter.put("/:assignmentId", homework_controller.submitHomework);

homeworkRouter.put("/:assignmentId", homework_controller.saveAnswerDraft);

export default homeworkRouter;