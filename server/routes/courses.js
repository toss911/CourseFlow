import { Router } from "express";
import { pool } from "../utils/db.js";

const coursesRouter = Router();

coursesRouter.get("/", async (req, res) => {
  try {
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
  } catch (error) {
    return res.sendStatus(500);
  }
});

coursesRouter.get("/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const results = await pool.query(
      `SELECT *
        FROM courses
        INNER JOIN lessons 
        ON courses.course_id = lessons.course_id
        INNER JOIN sub_lessons 
        ON lessons.lesson_id = sub_lessons.lesson_id
        where courses.course_id=$1`,
      [courseId]
    );
    const nameCategory = results.rows[0].category;

    const filterCategory = await pool.query(
      `SELECT *
        FROM courses
        WHERE category = $1 AND course_id != $2
        ORDER BY random()
        limit 3`,
      [nameCategory, courseId]
    );

    const files = await pool.query(
      `SELECT *
        FROM files
        where course_id=$1`,
      [courseId]
    );

    return res.json({
      data: results.rows,
      dataCategory: filterCategory.rows,
      dataFiles: files.rows,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
});

coursesRouter.post("/:courseId", async (req, res) => {
  try {
    const data = {
      ...req.body,
      courseId: req.params.courseId,
    };

    let message;

    if (data.subscribeCourse) {
      await pool.query(
        `INSERT INTO subscriptions(user_id, course_id, status)
          VALUES ($1, $2, $3)`,
        [data.user_id, data.courseId, 0]
      );
      message = "Course has been successfully subscribed";
    }

    if (data.addCourse) {
      await pool.query(
        `INSERT INTO desired_courses(user_id, course_id)
          VALUES ($1, $2)`,
        [data.user_id, data.courseId]
      );
      message = "Desired Course has been successfully added";
    } else if (data.addCourse === false) {
      await pool.query(
        `DELETE FROM desired_courses WHERE user_id = $1 AND course_id = $2`,
        [data.user_id, data.courseId]
      );
      message = "Desired Course has been successfully deleted";
    }

    let subscribeStatus;
    const coursesSubscription = await pool.query(
      `SELECT *
      FROM subscriptions
      WHERE course_id = $1 AND user_id = $2
      `,
      [data.courseId, data.user_id]
    );
    if (Boolean(coursesSubscription.rowCount)) {
      subscribeStatus = true;
    } else {
      subscribeStatus = false;
    }

    let desireStatus;
    const desiredCourses = await pool.query(
      `SELECT *
        FROM desired_courses
        WHERE course_id = $1 AND user_id = $2
        `,
      [data.courseId, data.user_id]
    );
    if (Boolean(desiredCourses.rowCount)) {
      desireStatus = true;
    } else {
      desireStatus = false;
    }

    return res.json({
      desireStatus,
      subscribeStatus,
      message,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
});

export default coursesRouter;
