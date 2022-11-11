import { Router } from "express";
import { pool } from "../utils/db.js";

const userRouter = Router();

// Get user's profile info
userRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const result = await pool.query("select * from users where user_id = $1", [
    userId,
  ]);
  return res.json({
    data: result.rows[0],
  });
});

// Update user's profile
userRouter.put("/:id", async (req, res) => {
  const updatedUser = {
    ...req.body,
  };
  const userId = req.params.id;
  await pool.query(
    "update users set full_name = $1, birthdate = $2, education = $3, email = $4 where user_id = $5",
    [
      updatedUser.full_name,
      updatedUser.birthdate,
      updatedUser.education,
      updatedUser.email,
      userId,
    ]
  );

  return res.json({
    message: "Your profile has been updated successfully.",
  });
});

userRouter.get("/courses/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const results = await pool.query(
      `select courses.course_id, courses.course_name, 
      courses.summary, courses.cover_image_directory, courses.learning_time, 
      count(lessons.lesson_id) 
      as lessons_count
      from lessons
      inner join courses
      on courses.course_id = lessons.course_id
      inner join subscriptions
      on courses.course_id = subscriptions.course_id
      where subscriptions.user_id = $1
      group by courses.course_id 
      order by courses.course_id asc`,
      [userId]
    );
    return res.json({
      data: results.rows,
    });
  } catch (error) {
    return res.json({
      message: "cannot get data",
    });
  }
});

export default userRouter;
