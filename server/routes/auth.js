import { Router } from "express";
import { pool } from "../utils/db.js";

const authRouter = Router();

// Register
authRouter.post("/register", async (req, res) => {
  const newUser = { ...req.body };
  const inputEmail = newUser.email;

  const emailExist = await pool.query(
    `select email from users where email = $1 `,
    [inputEmail]
  );

  console.log(emailExist);

  if (emailExist.rowCount !== 0) {
    res.json({
      message: "This email already has an account.",
    });
  } else {
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
      message: "Registered successfully.",
    });
  }
});

export default authRouter;
