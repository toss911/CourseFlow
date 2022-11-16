import { Router } from "express";
import * as courses_controller from "../controllers/coursesController.js";

const coursesRouter = Router();

coursesRouter.get("/", courses_controller.getAll);

coursesRouter.get("/:courseId", courses_controller.getById);

coursesRouter.post("/:courseId", courses_controller.postSubscribeOrAddCourse);
coursesRouter.get("/desire", async (req, res) => {
  try{
    const userId = req.query.byUser
    console.log(userId);
    let courseDesire = await pool.query(
      `select desired_courses.course_id, courses.course_name, courses.summary, courses.cover_image_directory, courses.learning_time, COUNT(lessons.lesson_id)
      from desired_courses
      inner join courses
      on courses.course_id = desired_courses.course_id
      inner join lessons
      on courses.course_id = lessons.course_id
      where desired_courses.user_id = $1
      group by desired_courses.course_id, courses.course_id`,[userId]
    )
    let course = courseDesire.rows
    console.log(course);
    return res.json({
      data: course
    })
  }catch (err){ 
    console.log(err);
  }
})

export default coursesRouter;
