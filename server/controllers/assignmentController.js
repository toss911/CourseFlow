import { pool } from "../utils/db.js";
import { getAdminCourses } from "./coursesController.js";

export const putSubmitAssignment = async (req, res) => {
  try {
    const answer = req.body.answer;
    const submittedDate = new Date();
    const assignmentId = req.params.assignmentId;
    const userId = req.query.byUser;
    let status = req.body.status;

    if (!/overdue/i.test(status)) {
      status = "submitted";
    }

    await pool.query(
      `
    UPDATE users_assignments SET answer = $1, submitted_date = $2, status = $3
    WHERE assignment_id = $4 AND user_id = $5`,
      [answer, submittedDate, status, assignmentId, userId]
    );

    return res.json({
      message: "Assignment is submitted.",
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const putSaveDraftAssignment = async (req, res) => {
  try {
    const answer = req.body.answer;
    const assignmentId = req.params.assignmentId;
    const userId = req.query.byUser;
    let status = req.body.status;

    if (!/overdue/i.test(status)) {
      status = "in progress";
    }

    await pool.query(
      `
    UPDATE users_assignments SET answer = $1, status = $2
    WHERE assignment_id = $3 AND user_id = $4`,
      [answer, status, assignmentId, userId]
    );

    return res.json({
      message: "Assignment is saved.",
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

// ------------------------------------------Admin-------------------------------------
export const getAdminAssignment = async (req, res) => {
  let searchText = req.query.searchText || "";
  searchText = "\\m" + searchText;
  const adminId = req.query.adminId;

  const changeDateFormat = (iso_Date) => {
    const isoDate = new Date(iso_Date);
    let year = isoDate.getFullYear();
    let month = isoDate.getMonth();
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

    let normalDate = date + "-" + month + "-" + year + " " + time;

    return normalDate;
  };

  const result = await pool.query(
    `select assignments.detail,courses.course_name,lessons.lesson_name,sub_lessons.sub_lesson_name,assignments.created_date,assignments.updated_date from admins
    inner join courses
    on courses.admin_id = admins.admin_id
    inner join lessons
    on lessons.course_id = courses.course_id
    inner join sub_lessons
    on sub_lessons.lesson_id = lessons.lesson_id
    inner join assignments
    on assignments.sub_lesson_id = sub_lessons.sub_lesson_id
    where courses.course_name ~* $1 and admins.admin_id = $2`,
    [searchText, adminId]
  );

  for (let course of result.rows) {
    course.created_date = changeDateFormat(course.created_date);
    course.updated_date = changeDateFormat(course.updated_date);
  }
  return res.json({
    data: result.rows,
  });
};
