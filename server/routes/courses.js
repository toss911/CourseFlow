import { Router } from "express";
import { pool } from "../utils/db.js";

const coursesRouter = Router();

coursesRouter.get("/", async (req, res) => {
  const keywords = req.query.keywords || "";
  const page = req.query.page || 1;

  const PAGE_SIZE = 10;
  const offset = (page - 1) * PAGE_SIZE;

  let query = "";
  let values = [];

  if (keywords) {
    query = `select courses.course_id, courses.name, courses.summary, courses.cover_image_directory, courses.learning_time, count(lessons.lesson_id) as lessons_count
        from lessons
        inner join courses
        on courses.course_id = lessons.course_id
        where courses.name=$1
        group by courses.course_id
        order by courses.course_id asc
        limit $2
        offset $3`;
    values = [keywords, PAGE_SIZE, offset];
  } else {
    query = `select courses.course_id, courses.name, courses.summary, courses.cover_image_directory, courses.learning_time, count(lessons.lesson_id) as lessons_count
        from lessons
        inner join courses
        on courses.course_id = lessons.course_id
        group by courses.course_id
        order by courses.course_id asc
        limit $1
        offset $2
        `;
    values = [PAGE_SIZE, offset];
  }

  const results = await pool.query(query, values);

  return res.json({
    data: results.rows,
  });
});

coursesRouter.get("/:courseId", async (req, res) => {
  const courseId = req.params.courseId;
  const results = await pool.query(
    `SELECT *
        FROM courses
            INNER JOIN subscriptions ON courses.course_id = subscriptions.course_id
            INNER JOIN users ON subscriptions.user_id = users.user_id
            INNER JOIN files ON courses.course_id = files.course_id
            INNER JOIN lessons ON courses.course_id = lessons.course_id
            INNER JOIN sub_lessons ON lessons.lesson_id = sub_lessons.lesson_id
            where courses.course_id=$1`,
    [courseId]
  );
});
return res.json({
  data: results.rows,
});

export default coursesRouter;
