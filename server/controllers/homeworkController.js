import { pool } from "../utils/db.js";

export const getAllHomework = async (req, res) => {
  try {
    const userId = req.params.userId;
    const results = await pool.query(
      `SELECT courses.course_name, lessons.lesson_name, sub_lessons.sub_lesson_name, 
        assignments.assignment_id, assignments.detail, assignments.duration, 
        users_assignments.answer, users_assignments.accepted_date, users_assignments.submitted_date
        FROM courses
        JOIN lessons
        ON courses.course_id = lessons.course_id
        JOIN sub_lessons
        ON lessons.lesson_id = sub_lessons.lesson_id
        JOIN assignments
        ON sub_lessons.sub_lesson_id = assignments.sub_lesson_id
        JOIN users_assignments 
        ON assignments.assignment_id = users_assignments.assignment_id
        WHERE users_assignments.user_id = $1`,
      [userId]
    );

    // *- Find deadline in date format -* //
    const findDeadline = (accepted_date, duration) => {
      const deadline = new Date(accepted_date);
      deadline.setDate(deadline.getDate() + parseInt(duration));
      return deadline;
    };

    const currentDate = new Date();

    // *- Find no. of days until deadline -* //
    const findDaysUntilDeadline = (currentDate, deadline) => {
      const dl = new Date(deadline);
      const cd = new Date(currentDate);
      const deadlineDateInMs = dl.getTime();
      const currentDateInMs = cd.getTime();
      const msDiff = deadlineDateInMs - currentDateInMs;
      const daysUntilDeadline = msDiff / (1000 * 60 * 60 * 24);
      return Math.round(daysUntilDeadline);
    };

    // *- Add assignment status, deadline and days until deadline -* //
    for (let assignment of results.rows) {
      assignment["deadline"] = findDeadline(
        assignment.accepted_date,
        assignment.duration
      );
      assignment["days_until_deadline"] = findDaysUntilDeadline(
        currentDate,
        assignment.deadline
      );

      if (currentDate > assignment.deadline) {
        assignment["status"] = "overdue";
      } else if (assignment.submitted_date != null) {
        assignment.submitted_date < assignment.deadline
          ? (assignment["status"] = "submitted")
          : (assignment["status"] = "overdue");
      } else {
        if (assignment.answer != null) {
          assignment["status"] = "in progress";
        } else {
          assignment["status"] = "pending";
        }
      }
    }

    return res.json({
      data: results.rows,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const submitHomework = async (req, res) => {
  const answer = req.body.answer;
  const submittedDate = new Date();
  const assignmentId = req.params.assignmentId;
  try {
    await pool.query(
      `UPDATE users_assignments SET answer = $1, submitted_date = $2 
        WHERE assignment_id = $3
        RETURNING *`,
      [answer, submittedDate, assignmentId]
    );

    return res.json({
      message: "Homework submitted.",
    });
  } catch (error) {
    return res.sendStatus(500);
  }

};

export const saveAnswerDraft = async (req, res) => {};
