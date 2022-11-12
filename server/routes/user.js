import { Router } from "express";
import { pool } from "../utils/db.js";
import multer from "multer";
import { cloudinaryUpload } from "../utils/upload.js";

const userRouter = Router();
const multerUpload = multer({ dest: "uploads/" });
const avatarUpload = multerUpload.fields([{ name: "avatar", maxCount: 1 }]);

// ----------------------------Update user's profile---------------------------- //
userRouter.put("/:userId", avatarUpload, async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUser = {
      full_name: req.body.full_name,
      birthdate: req.body.birthdate,
      education: req.body.education,
      email: req.body.email,
      avatar: req.body.avatar,
    };

    // *- Checking birthdate and education whether they are empty string or not? If they are, covert them into null -* //
    if (!updatedUser.birthdate) {
      updatedUser.birthdate = null;
    }
    if (!updatedUser.education) {
      updatedUser.education = null;
    }

    // *- Checking duplicated email -* //
    let prevEmail = await pool.query(
      `
      SELECT email
      FROM users
      WHERE user_id = $1`,
      [userId]
    );
    prevEmail = prevEmail.rows[0].email;
    const regEx = new RegExp(prevEmail, "i");

    // Checking that the updated email and previous email are the same or not
    if (regEx.test(updatedUser.email)) {
      // Email doesn't be changed => Can be updated immediately
      await pool.query(
        `
        UPDATE users
        SET full_name = $1, 
        birthdate = $2, 
        education = $3, 
        email = $4, 
        avatar_directory = $5 
        WHERE user_id = $6`,
        [
          updatedUser.ful,
          updatedUser.birthdate,
          updatedUser.education,
          updatedUser.email,
          updatedUser.avatar,
          userId,
        ]
      );
    } else {
      // Email is changed => Need to check that the updated email is already existed or not
      let hasNewEmailAlreadyExisted = await pool.query(
        `
      SELECT email
      FROM users
      WHERE email = $1`,
        [updatedUser.email]
      );
      hasNewEmailAlreadyExisted = Boolean(hasNewEmailAlreadyExisted.rowCount);
      if (hasNewEmailAlreadyExisted) {
        return res.json({
          message: "This email has already been taken.",
        });
      } else {
        await pool.query(
          `
          UPDATE users
          SET full_name = $1, 
          birthdate = $2, 
          education = $3, 
          email = $4, 
          avatar_directory = $5 
          WHERE user_id = $6`,
          [
            updatedUser.ful,
            updatedUser.birthdate,
            updatedUser.education,
            updatedUser.email,
            updatedUser.avatar,
            userId,
          ]
        );
      }
    }

    return res.json({
      message: "Your profile has been updated successfully.",
      newUrl: "Test", // ได้ข้อมูลหลังจาก upload เสร็จ
    });
  } catch (error) {
    return res.json({
      message: "Internal Server Error. Please try again later.",
    });
  }
});

export default userRouter;
