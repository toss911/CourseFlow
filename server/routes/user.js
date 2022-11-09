import { Router } from "express";
import { pool } from "../utils/db.js";
import multer from "multer";
import { cloudinaryUpload } from "../utils/upload.js";

const userRouter = Router();
const multerUpload = multer({ dest: "uploads/" });
const avatarUpload = multerUpload.fields([{ name: "avatar", maxCount: 1 }]);

// ----------------------------GET current user's profile info---------------------------- //
userRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const result = await pool.query("select * from users where user_id = $1", [
    userId,
  ]);
  return res.json({
    data: result.rows[0],
  });
});

// ----------------------------Update user's profile---------------------------- //
userRouter.put("/:id", avatarUpload, async (req, res) => {
  // console.log(req.files);
  const userId = req.params.id;

  const updatedUser = {
    fullName: req.body.full_name,
    birthdate: req.body.birthdate,
    education: req.body.education,
    email: req.body.email,
  };

  if (updatedUser.birthdate === "null") {
    updatedUser.birthdate = null;
  }

  if (updatedUser.education === "null") {
    updatedUser.education = null;
  }

  const avatarUrl = await cloudinaryUpload(req.files);
  updatedUser["avatars"] = avatarUrl;
  console.log(updatedUser);

  // Keeping updated user's info in our database
  await pool.query(
    `update users set full_name=$1, birthdate=$2, education=$3, email=$4, avatar_directory=$5 where user_id=$6`,
    [
      updatedUser.fullName,
      updatedUser.birthdate,
      updatedUser.education,
      updatedUser.email,
      updatedUser.avatars,
      userId,
    ]
  );

  return res.json({
    message: "Your profile has been updated successfully.",
  });
});

export default userRouter;
