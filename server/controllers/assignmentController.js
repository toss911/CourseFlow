import { pool } from "../utils/db.js";

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
