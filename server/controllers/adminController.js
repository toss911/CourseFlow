import { pool } from "../utils/db.js";
import { cloudinaryUpload } from "../utils/upload.js";

export const videoSubLessonUpload = async (req, res) => {};

export const addCourse = async (req, res) => {
  const adminId = req.params.userId;
  const newCourse = {
    course_name: req.body.course_name,
    price: req.body.price,
    learning_time: req.body.learning_time,
    course_summary: req.body.course_summary,
    course_detail: req.body.course_detail,
  };

  const courseCoverImage = await cloudinaryUpload(
    ...req.files.course_cover_image,
    "upload",
    "course_cover_images"
  );
  const courseVideoTrailer = await cloudinaryUpload(
    ...req.files.course_video_trailer,
    "upload",
    "course_video_trailers"
  );
  const courseAttachFiles = await cloudinaryUpload(
    ...req.files.course_attach_files,
    "upload",
    "course_attach_files"
  );
  const subLessonVideo = await cloudinaryUpload(
    ...req.files.subLessonVideo,
    "upload",
    "sub_lesson_videos"
  );

  await pool.query(``);
};

export const getAdminCourses = async (req, res) => {
  try {
    let searchText = req.query.searchText || "";
    searchText = "\\m" + searchText;
    const adminId = req.query.byAdmin;

    // Change ISO date to normal date before sending data to FE
    const changeDateFormat = (iso_Date) => {
      if (iso_Date === null) {
        return "null";
      }
      const isoDate = new Date(iso_Date);
      let year = isoDate.getFullYear();
      let month = isoDate.getMonth() + 1;
      let date = isoDate.getDate();
      let time = isoDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      if (date < 10) {
        date = "0" + date;
      }

      if (month < 10) {
        month = "0" + month;
      }

      let normalDate = date + "/" + month + "/" + year + " " + time;

      return normalDate;
    };

    const results = await pool.query(
      `
      SELECT courses.cover_image_directory, courses.course_name, count(lessons.lesson_id) as lessons_count, courses.price, courses.created_date, courses.updated_date, courses.course_id
      FROM lessons
      INNER JOIN courses
      ON courses.course_id = lessons.course_id
      WHERE courses.course_name ~* $1 AND courses.admin_id = $2
      GROUP BY courses.course_id
      ORDER BY courses.updated_date DESC
        `,
      [searchText, adminId]
    );

    for (let course of results.rows) {
      course.cover_image_directory = JSON.parse(course.cover_image_directory);
      course.created_date = changeDateFormat(course.created_date);
      course.updated_date = changeDateFormat(course.updated_date);
    }

    return res.json({
      data: results.rows,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const admin_id = req.query.byAdmin;
    const course_id = req.params.courseId;

    /* Validate whether this admin owned the course or not */
    let doesAdminOwnThisCourse = await pool.query(
      `
    SELECT EXISTS 
    (SELECT *
      FROM courses
    WHERE admin_id = $1 AND course_id = $2)
    `,
      [admin_id, course_id]
    );
    doesAdminOwnThisCourse = doesAdminOwnThisCourse.rows[0].exists;
    if (!doesAdminOwnThisCourse) {
      return res
        .status(403)
        .json({ message: "You have no permission to delete this course" });
    }

    /* Delete an assignment from "assignments" table */
    await pool.query(
      `
    DELETE FROM courses
    WHERE course_id = $1
    `,
      [course_id]
    );

    return res.json({ message: "Course has been successfully deleted" });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const getAllCoursesData = async (req, res) => {
  try {
    const adminId = req.query.byAdmin;

    let fetchAllCoursesData = await pool.query(
      `
      SELECT courses.course_id, courses.course_name, lessons.lesson_id, lessons.lesson_name, sub_lessons.sub_lesson_id, sub_lessons.sub_lesson_name, sub_lessons.duration
      FROM courses
      INNER JOIN lessons
      ON courses.course_id = lessons.course_id
      INNER JOIN sub_lessons
      ON lessons.lesson_id = sub_lessons.lesson_id
      WHERE courses.admin_id = $1
      ORDER BY courses.course_id ASC, lessons.sequence ASC, sub_lessons.sequence ASC
      `,
      [adminId]
    );
    fetchAllCoursesData = fetchAllCoursesData.rows;

    /* Transform data structure from array of objects to purely object */
    const allCoursesData = {};
    fetchAllCoursesData.map((item) => {
      if (item.course_id in allCoursesData) {
        if (item.lesson_id in allCoursesData[item.course_id].lessons) {
          allCoursesData[item.course_id].lessons[item.lesson_id].sub_lessons = {
            ...allCoursesData[item.course_id].lessons[item.lesson_id]
              .sub_lessons,
            [item.sub_lesson_id]: {
              sub_lesson_name: item.sub_lesson_name,
              duration: item.duration,
            },
          };
        } else {
          allCoursesData[item.course_id].lessons[item.lesson_id] = {
            lesson_name: item.lesson_name,
            sub_lessons: {
              [item.sub_lesson_id]: {
                sub_lesson_name: item.sub_lesson_name,
                duration: item.duration,
              },
            },
          };
        }
      } else {
        allCoursesData[item.course_id] = {
          course_name: item.course_name,
          lessons: {
            [item.lesson_id]: {
              lesson_name: item.lesson_name,
              sub_lessons: {
                [item.sub_lesson_id]: {
                  sub_lesson_name: item.sub_lesson_name,
                  duration: item.duration,
                },
              },
            },
          },
        };
      }
    });
    return res.json({ data: allCoursesData });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const postNewAssignment = async (req, res) => {
  try {
    const admin_id = req.query.byAdmin;
    const sub_lesson_id = req.body.sub_lesson_id;
    const detail = req.body.detail;
    const duration = req.body.duration;

    /* Validate whether this admin owned the course or not */
    let doesAdminOwnThisCourse = await pool.query(
      `
      SELECT EXISTS 
      (SELECT *
        FROM courses
      INNER JOIN lessons
      ON courses.course_id = lessons.course_id
      INNER JOIN sub_lessons
      ON lessons.lesson_id = sub_lessons.lesson_id
      WHERE courses.admin_id = $1 AND sub_lessons.sub_lesson_id = $2)
      `,
      [admin_id, sub_lesson_id]
    );
    doesAdminOwnThisCourse = doesAdminOwnThisCourse.rows[0].exists;
    if (!doesAdminOwnThisCourse) {
      return res
        .status(403)
        .json({ message: "You have no permission to manipulate this course" });
    }

    /* Update duration of assignments in "sub_lessons" table */
    await pool.query(
      `
      UPDATE sub_lessons
      SET duration = $1
      WHERE sub_lesson_id = $2
      `,
      [duration, sub_lesson_id]
    );

    /* Insert new assignment into "assignments" table */
    await pool.query(
      `
      INSERT INTO assignments(sub_lesson_id, detail, created_date, updated_date)
      VALUES ($1, $2, $3, $4)
      `,
      [sub_lesson_id, detail, new Date(), new Date()]
    );

    return res.json({ message: "Assignment has been successfully added" });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const getAllAssignment = async (req, res) => {
  try {
    let searchText = req.query.searchText || "";
    searchText = "\\m" + searchText;
    const adminId = req.query.byAdmin;

    const changeDateFormat = (iso_Date) => {
      if (iso_Date === null) {
        return "null";
      }
      const isoDate = new Date(iso_Date);
      let year = isoDate.getFullYear();
      let month = isoDate.getMonth() + 1;
      let date = isoDate.getDate();
      let time = isoDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      if (date < 10) {
        date = "0" + date;
      }

      if (month < 10) {
        month = "0" + month;
      }

      let normalDate = date + "/" + month + "/" + year + " " + time;

      return normalDate;
    };

    const result = await pool.query(
      `SELECT assignments.detail, courses.course_name, lessons.lesson_name, sub_lessons.sub_lesson_name, assignments.created_date, assignments.updated_date, assignments.assignment_id
      FROM courses
      INNER JOIN lessons
      ON lessons.course_id = courses.course_id
      INNER JOIN sub_lessons
      ON sub_lessons.lesson_id = lessons.lesson_id
      INNER JOIN assignments
      ON assignments.sub_lesson_id = sub_lessons.sub_lesson_id
      WHERE assignments.detail ~* $1 and courses.admin_id = $2
      ORDER BY assignments.updated_date DESC`,
      [searchText, adminId]
    );

    for (let course of result.rows) {
      course.created_date = changeDateFormat(course.created_date);
      course.updated_date = changeDateFormat(course.updated_date);
    }

    return res.json({
      data: result.rows,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const getAssignmentById = async (req, res) => {
  const admin_id = req.query.byAdmin;
  const assignment_id = req.params.assignmentId;

  /* Validate whether this admin owned the course or not */
  let doesAdminOwnThisCourse = await pool.query(
    `
  SELECT EXISTS 
  (SELECT *
    FROM courses
  INNER JOIN lessons
  ON courses.course_id = lessons.course_id
  INNER JOIN sub_lessons
  ON lessons.lesson_id = sub_lessons.lesson_id
  INNER JOIN assignments
  ON sub_lessons.sub_lesson_id = assignments.sub_lesson_id
  WHERE courses.admin_id = $1 AND assignments.assignment_id = $2)
  `,
    [admin_id, assignment_id]
  );
  doesAdminOwnThisCourse = doesAdminOwnThisCourse.rows[0].exists;
  if (!doesAdminOwnThisCourse) {
    return res
      .status(403)
      .json({ message: "You have no permission to delete this assignment" });
  }

  let data = await pool.query(
    `
    SELECT courses.course_id, lessons.lesson_id, sub_lessons.sub_lesson_id, assignments.detail
    FROM courses
    INNER JOIN lessons
    ON courses.course_id = lessons.course_id
    INNER JOIN sub_lessons
    ON lessons.lesson_id = sub_lessons.lesson_id
    INNER JOIN assignments
    ON sub_lessons.sub_lesson_id = assignments.sub_lesson_id
    WHERE courses.admin_id = $1 AND assignments.assignment_id = $2
    `,
    [admin_id, assignment_id]
  );

  data = data.rows[0];
  data = {
    ...data,
    course_id: String(data.course_id),
    lesson_id: String(data.lesson_id),
    sub_lesson_id: String(data.sub_lesson_id),
  };
  return res.json({ data });
};

export const editAssignment = async (req, res) => {
  try {
    const admin_id = req.query.byAdmin;
    const assignment_id = req.params.assignmentId;
    const sub_lesson_id = req.body.sub_lesson_id;
    const detail = req.body.detail;
    const duration = req.body.duration;

    /* Validate whether this admin owned the course or not */
    let doesAdminOwnThisCourse = await pool.query(
      `
    SELECT EXISTS 
    (SELECT *
      FROM courses
    INNER JOIN lessons
    ON courses.course_id = lessons.course_id
    INNER JOIN sub_lessons
    ON lessons.lesson_id = sub_lessons.lesson_id
    WHERE courses.admin_id = $1 AND sub_lessons.sub_lesson_id = $2)
    `,
      [admin_id, sub_lesson_id]
    );
    doesAdminOwnThisCourse = doesAdminOwnThisCourse.rows[0].exists;
    if (!doesAdminOwnThisCourse) {
      return res
        .status(403)
        .json({ message: "You have no permission to edit this course" });
    }

    /* Update duration of assignments in "sub_lessons" table */
    await pool.query(
      `
    UPDATE sub_lessons
    SET duration = $1
    WHERE sub_lesson_id = $2
    `,
      [duration, sub_lesson_id]
    );

    /* Update an assignment in "assignments" table */
    await pool.query(
      `
    UPDATE assignments
    SET sub_lesson_id = $1,
        detail = $2,
        updated_date = $3
    WHERE assignment_id = $4
    `,
      [sub_lesson_id, detail, new Date(), assignment_id]
    );

    return res.json({ message: "Assignment has been successfully edited" });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const deleteAssignment = async (req, res) => {
  try {
    const admin_id = req.query.byAdmin;
    const assignment_id = req.params.assignmentId;

    /* Validate whether this admin owned the course or not */
    let doesAdminOwnThisCourse = await pool.query(
      `
    SELECT EXISTS 
    (SELECT *
      FROM courses
    INNER JOIN lessons
    ON courses.course_id = lessons.course_id
    INNER JOIN sub_lessons
    ON lessons.lesson_id = sub_lessons.lesson_id
    INNER JOIN assignments
    ON sub_lessons.sub_lesson_id = assignments.sub_lesson_id
    WHERE courses.admin_id = $1 AND assignments.assignment_id = $2)
    `,
      [admin_id, assignment_id]
    );
    doesAdminOwnThisCourse = doesAdminOwnThisCourse.rows[0].exists;
    if (!doesAdminOwnThisCourse) {
      return res
        .status(403)
        .json({ message: "You have no permission to delete this assignment" });
    }

    /* Delete an assignment from "assignments" table */
    await pool.query(
      `
    DELETE FROM assignments
    WHERE assignment_id = $1
    `,
      [assignment_id]
    );

    return res.json({ message: "Assignment has been successfully deleted" });
  } catch (error) {
    return res.sendStatus(500);
  }
};
