import { Router } from "express";
import { pool } from "../utils/db.js";

const coursesRouter = Router();

coursesRouter.get("/", async (req, res) => {
  let keywords = req.query.keywords || "";
  keywords = "\\m" + keywords;

  const results = await pool.query(
    `select courses.course_id, courses.course_name, courses.summary, courses.cover_image_directory, courses.learning_time, count(lessons.lesson_id) as lessons_count
  from lessons
  inner join courses
  on courses.course_id = lessons.course_id
  where courses.course_name ~* $1
  group by courses.course_id
  order by courses.course_id asc
  `,
    [keywords]
  );

  return res.json({
    data: results.rows,
  });
});

coursesRouter.get("/:courseId", async (req, res) => {
  const courseId = req.params.courseId;
  const results = await pool.query(
    `SELECT *
    FROM courses
        INNER JOIN files 
        ON courses.course_id = files.course_id
        INNER JOIN lessons 
        ON courses.course_id = lessons.course_id
        INNER JOIN sub_lessons 
        ON lessons.lesson_id = sub_lessons.lesson_id
        where courses.course_id=$1`,
    [courseId]
  );
  return res.json({
    data: results.rows,
  });
});

export default coursesRouter;
