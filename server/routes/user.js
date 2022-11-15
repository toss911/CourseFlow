import { Router } from "express";
import { pool } from "../utils/db.js";

const userRouter = Router();

// Get user's profile info
// userRouter.get("/:id", async (req, res) => {
//   const userId = req.params.id;
//   const result = await pool.query("select * from users where user_id = $1", [
//     userId,
//   ]);
//   return res.json({
//     data: result.rows[0],
//   });
// });

// // Update user's profile
// userRouter.put("/:id", async (req, res) => {
//   const updatedUser = {
//     ...req.body,
//   };
//   const userId = req.params.id;
//   await pool.query(
//     "update users set full_name = $1, birthdate = $2, education = $3, email = $4 where user_id = $5",
//     [
//       updatedUser.full_name,
//       updatedUser.birthdate,
//       updatedUser.education,
//       updatedUser.email,
//       userId,
//     ]
//   );

//   return res.json({
//     message: "Your profile has been updated successfully.",
//   });
// });

userRouter.get("/mycourses", async (req, res) => {
  try {
    const userId = req.query.byUser;

    let subscribedCourses = await pool.query(
      `
      SELECT courses.course_id, courses.course_name, courses.summary, courses.cover_image_directory, courses.learning_time, count(lessons.lesson_id) as lessons_count
      FROM lessons
      INNER JOIN courses
      ON courses.course_id = lessons.course_id
      INNER JOIN subscriptions
      ON courses.course_id = subscriptions.course_id
      WHERE subscriptions.user_id = $1
      GROUP BY courses.course_id 
      ORDER BY courses.course_id ASC`,
      [userId]
    );
    subscribedCourses = subscribedCourses.rows;

    let coursesStatus = await pool.query(
      `
      SELECT course_id, status
      FROM subscriptions
      WHERE user_id = $1
      ORDER BY course_id asc`,
      [userId]
    );
    coursesStatus = coursesStatus.rows;

    subscribedCourses.map((course) => {
      for (let i = 0; i < coursesStatus.length; i++) {
        if (course.course_id === coursesStatus[i].course_id) {
          course.status = coursesStatus[i].status;
        }
      }
    });

    let subCoursesCount = await pool.query(
      `
      SELECT status, COUNT(subscription_id) AS courses_count
      FROM subscriptions
      WHERE user_id = $1
      GROUP BY status`,
      [userId]
    );

    let coursesCount = {};
    subCoursesCount.rows.map((item) => {
      if (!item.status) {
        coursesCount["in progress"] = item.courses_count;
      } else {
        coursesCount["completed"] = item.courses_count;
      }
    });

    return res.json({
      data: subscribedCourses,
      coursesCount,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
});

export default userRouter;
