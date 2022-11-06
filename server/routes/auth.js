import { Router } from "express";
import { pool } from "../utils/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authRouter = Router();

// Register
authRouter.post("/register", async (req, res) => {
  // try {
  const newUser = { ...req.body };
  const inputEmail = newUser.email;

  const emailExist = await pool.query(
    `select email from users where email ilike $1 `,
    [inputEmail]
  );

  if (emailExist.rowCount !== 0) {
    return res.json({
      message: "This email already has an account",
    });
  } else {
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await pool.query(
      `insert into users (full_name, birthdate, education, email, password)
      values ($1, $2, $3, $4, $5)`,
      [
        newUser.full_name,
        newUser.birthdate,
        newUser.education,
        newUser.email,
        newUser.password,
      ]
    );

    return res.json({
      message: "Registered successfully",
    });
  }
  // } catch (error) {
  //   return res.sendStatus(500);
  // }
});

// Login
authRouter.post("/login", async (req, res) => {
  try {
    const loginInfo = { ...req.body };
    const user = await pool.query(`select * from users where email ilike $1 `, [
      loginInfo.email,
    ]);

    if (user.rowCount === 0) {
      return res.json({
        message: "Couldn't find your account",
      });
    }

    const isValidPassword = await bcrypt.compare(
      loginInfo.password,
      user.rows[0].password
    );

    if (!isValidPassword) {
      return res.json({
        message: "Wrong password. Please try again.",
      });
    }

    const token = jwt.sign(
      {
        email: user.rows[0].email,
        full_name: user.rows[0].full_name,
        birthdate: user.rows[0].birthdate,
        education: user.rows[0].education,
        avatar_directory: user.rows[0].avatar_directory,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "3600000",
      }
    );

    return res.json({
      message: "Login successfully",
      token,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
});

export default authRouter;
