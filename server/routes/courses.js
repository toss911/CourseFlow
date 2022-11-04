import { Router } from "express";
import { pool } from "../utils/db.js";

const coursesRouter = Router();

coursesRouter.get("", async (req, res) => {
    `select courses.name, courses.summary, courses.cover_image_directory, courses.learning_time, count(lessons.lesson_id), lessons.course_id from courses 
    inner join lessons on courses.course_id = lessons.course_id
    group by lessons.course_id`

    // this is just a sample code
})