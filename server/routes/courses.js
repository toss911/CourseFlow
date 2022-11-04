import { Router } from "express";
import { pool } from "../utils/db.js";

const coursesRouter = Router();

coursesRouter.get("", async (req, res) => {
    `select courses.name, courses.summary, courses.cover_image_directory, courses.learning_time, lessons.name, count(lessons.lesson_id), lessons.course_id from courses 
    inner join lessons on courses.course_id = lessons.course_id
    where courses.course_id = lessons.course_id`
})