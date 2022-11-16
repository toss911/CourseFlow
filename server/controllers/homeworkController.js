import { pool } from "../utils/db.js";

export const getAllHomework = async (req, res) => {
  try {
    const userId = req.params.userId;
    const results = await pool.query(
      `SELECT courses.course_name, courses.course_id, lessons.lesson_name, sub_lessons.sub_lesson_name, 
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
  const acceptedDate = new Date();
  const submittedDate = new Date();
  const assignmentId = req.params.assignmentId;
  const userId = req.query.userId;

  try {
    // *- Check if user has accepted the assignment -* //
    const assignmentExistForThisUser = await pool.query(
      `SELECT exists (SELECT user_id FROM users_assignments WHERE assignment_id = $1 AND user_id = $2)`,
      [assignmentId, userId]
    );
    // *- If yes, add answer and submitted date -* //
    assignmentExistForThisUser
      ? await pool.query(
          `UPDATE users_assignments SET answer = $1, submitted_date = $2 
        WHERE assignment_id = $3`,
          [answer, submittedDate, assignmentId]
        )
      : // *- If not, create a new user_assignment and add answer, accepted date and submitted date as the same date-* //
        await pool.query(
          `INSERT INTO users_assignments (user_id, assignment_id, answer, accepted_date, submitted_date, status)
            VALUES ($1, $2, $3, $4, $5, $6)`,
          [userId, assignmentId, answer, acceptedDate, submittedDate, "submitted"]
        );

    return res.json({
      message: "Homework submitted.",
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const saveAnswerDraft = async (req, res) => {
  const answer = req.body.answer;
  const assignmentId = req.params.assignmentId;

  try {
    await pool.query(
      `UPDATE users_assignments SET answer = $1
      WHERE assignment_id = $2`,
      [answer, assignmentId]
    );
  } catch (error) {
    return res.sendStatus(500);
  }
};
