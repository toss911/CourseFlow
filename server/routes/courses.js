import { Router } from "express";
import { pool } from "../utils/db.js";

const coursesRouter = Router();

coursesRouter.get("/", async (req, res) => {

    const keywords = req.query.keywords || "";
    const page = req.query.page || 1;
    
    const PAGE_SIZE = 12;
    const offset = (page-1) * PAGE_SIZE;

    console.log(keywords);

    let query = "";
    let values = [];

    if (keywords) {
        query = `select courses.course_id, courses.name, courses.summary, courses.cover_image_directory, courses.learning_time, count(lessons.lesson_id) as lessons_count
        from lessons
        inner join courses
        on courses.course_id = lessons.course_id
        where courses.name ilike '%' || $1 || '%'
        group by courses.course_id
        order by courses.course_id asc
        limit $2
        offset $3`;
        values=[keywords, PAGE_SIZE, offset];
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
        values = [PAGE_SIZE, offset]
    }

    const results = await pool.query(query, values);
    console.log(results)

    return res.json({
        data: results.rows
    })

})

export default coursesRouter;