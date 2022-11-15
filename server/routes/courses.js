import { Router } from "express";
import * as courses_controller from "../controllers/coursesController.js";

const coursesRouter = Router();

coursesRouter.get("/", courses_controller.getAll);

coursesRouter.get("/:courseId", courses_controller.getById);

coursesRouter.post("/:courseId", courses_controller.postSubscribeOrAddCourse);

coursesRouter.get("/:courseId/learning", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    let course_data = await pool.query(
      `
      SELECT courses.course_id, courses.course_name, courses.summary
      FROM courses
      WHERE course_id = $1`,
      [courseId]
    );
    course_data = course_data.rows[0];

    const lessons = await pool.query(
      `
      SELECT  lessons.lesson_name, sub_lessons.sub_lesson_name
      FROM courses
      INNER JOIN lessons 
      ON courses.course_id = lessons.course_id
      INNER JOIN sub_lessons 
      ON lessons.lesson_id = sub_lessons.lesson_id
      WHERE courses.course_id=$1
      order by lessons.sequence ASC, sub_lessons.sequence ASC`,
      [courseId]
    );

    course_data.lessons = {};
    lessons.rows.map((lesson) => {
      if (lesson.lesson_name in course_data.lessons) {
        course_data.lessons[lesson.lesson_name].push(lesson.sub_lesson_name);
      } else {
        course_data.lessons[lesson.lesson_name] = [];
        course_data.lessons[lesson.lesson_name].push(lesson.sub_lesson_name);
      }
    });

    return res.json({
      data: course_data,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
});

coursesRouter.get("/:courseId/learning", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    let course_data = await pool.query(
      `
      SELECT courses.course_id, courses.course_name, courses.summary
      FROM courses
      WHERE course_id = $1`,
      [courseId]
    );
    course_data = course_data.rows[0];

    const lessons = await pool.query(
      `
      SELECT  lessons.lesson_name, sub_lessons.sub_lesson_name
      FROM courses
      INNER JOIN lessons 
      ON courses.course_id = lessons.course_id
      INNER JOIN sub_lessons 
      ON lessons.lesson_id = sub_lessons.lesson_id
      WHERE courses.course_id=$1
      order by lessons.sequence ASC, sub_lessons.sequence ASC`,
      [courseId]
    );

    course_data.lessons = {};
    lessons.rows.map((lesson) => {
      if (lesson.lesson_name in course_data.lessons) {
        course_data.lessons[lesson.lesson_name].push(lesson.sub_lesson_name);
      } else {
        course_data.lessons[lesson.lesson_name] = [];
        course_data.lessons[lesson.lesson_name].push(lesson.sub_lesson_name);
      }
    });

    return res.json({
      data: course_data,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
});

export default coursesRouter;
