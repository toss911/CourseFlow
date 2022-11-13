import { Router } from "express";
import { pool } from "../utils/db.js";
import multer from "multer";
import { cloudinaryUpload } from "../utils/upload.js";
import jwt from "jsonwebtoken";

const userRouter = Router();
const multerUpload = multer({ dest: "uploads/" });
const avatarUpload = multerUpload.fields([{ name: "avatar", maxCount: 1 }]);

userRouter.put("/:userId", avatarUpload, async (req, res) => {
  try {
    const userId = req.params.userId;
    const action = req.body.action;
    const updatedUser = {
      full_name: req.body.full_name,
      birthdate: req.body.birthdate,
      education: req.body.education,
      email: req.body.email,
    };

    /* 
  An action for avatar uploading
  - if action is "change" 
    • delete an old one from cloud(?) + upload new one to cloud + update new one in database
  - if action is "remove"
    • delete from cloud + update database
  - if action is "undefined"
    • nothing changed
  */

    // *- Checking birthdate and education whether they are empty string or not? If they are, covert them into null -* //
    if (!updatedUser.birthdate) {
      updatedUser.birthdate = null;
    }
    if (!updatedUser.education) {
      updatedUser.education = null;
    }

    // *- Checking duplicated email -* //
    const currentUserInfo = await pool.query(
      `
      SELECT email, avatar_directory
      FROM users
      WHERE user_id = $1`,
      [userId]
    );
    const prevEmail = currentUserInfo.rows[0].email;
    const regEx = new RegExp(prevEmail, "i");
    let prevAvatar;
    if (currentUserInfo.rows[0].avatar_directory !== null) {
      prevAvatar = JSON.parse(
        currentUserInfo.rows[0].avatar_directory
      ).public_id;
    } else {
      prevAvatar = null;
    }

    // *- Checking that the updated email and previous email are the same or not -* //
    if (regEx.test(updatedUser.email)) {
      // Email doesn't be changed => Can be updated immediately
      if (!action) {
        await pool.query(
          `
          UPDATE users
          SET full_name = $1,
          birthdate = $2,
          education = $3
          WHERE user_id = $4`,
          [
            updatedUser.full_name,
            updatedUser.birthdate,
            updatedUser.education,
            userId,
          ]
        );
      } else {
        if (/change/i.test(action)) {
          if (prevAvatar !== null) {
            await cloudinaryUpload(prevAvatar, "delete");
          }
          updatedUser.avatar = await cloudinaryUpload(
            ...req.files.avatar,
            "upload"
          );
        } else if (/delete/.test(action)) {
          await cloudinaryUpload(prevAvatar, "delete");
          updatedUser.avatar = null;
        }
        await pool.query(
          `
          UPDATE users
          SET full_name = $1, 
          birthdate = $2, 
          education = $3, 
          avatar_directory = $4 
          WHERE user_id = $5`,
          [
            updatedUser.full_name,
            updatedUser.birthdate,
            updatedUser.education,
            updatedUser.avatar,
            userId,
          ]
        );
      }
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
        if (!action) {
          await pool.query(
            `
            UPDATE users
            SET full_name = $1,
            birthdate = $2,
            education = $3, 
            email = $4 
            WHERE user_id = $5`,
            [
              updatedUser.full_name,
              updatedUser.birthdate,
              updatedUser.education,
              updatedUser.email,
              userId,
            ]
          );
        } else {
          if (/change/i.test(action)) {
            if (prevAvatar !== null) {
              await cloudinaryUpload(prevAvatar, "delete");
            }
            updatedUser.avatar = await cloudinaryUpload(
              ...req.files.avatar,
              "upload"
            );
          } else if (/delete/.test(action)) {
            await cloudinaryUpload(prevAvatar, "delete");
            updatedUser.avatar = null;
          }
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
              updatedUser.full_name,
              updatedUser.birthdate,
              updatedUser.education,
              updatedUser.email,
              updatedUser.avatar,
              userId,
            ]
          );
        }
      }
    }

    const updatedUserInfo = await pool.query(
      `
    SELECT *
    FROM users
    WHERE user_id = $1`,
      [userId]
    );

    const token = jwt.sign(
      {
        user_id: userId,
        email: updatedUserInfo.rows[0].email,
        full_name: updatedUserInfo.rows[0].full_name,
        birthdate: updatedUserInfo.rows[0].birthdate,
        education: updatedUserInfo.rows[0].education,
        avatar_directory: JSON.parse(updatedUserInfo.rows[0].avatar_directory),
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "3600000",
      }
    );

    return res.json({
      message: "Your profile has been updated successfully.",
      token,
    });
  } catch (error) {
    return res.json({
      message: "Internal Server Error. Please try again later.",
    });
  }
});

export default userRouter;
