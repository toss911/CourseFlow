import { Router } from "express";
import { pool } from "../utils/db.js";

const userRouter = Router();

// Get user's profile info
userRouter.get("/:id", async (req, res) => {
    const userId = req.params.id;
    const result = await pool.query("select * from users where user_id = $1", [userId])
    return res.json({
        data: result.rows[0]
    });
});

// Update user's profile 
userRouter.put("/:id", async (req, res) => {
    const updatedUser = {
        ...req.body
    };
    const userId = req.params.id;
    await pool.query("update users set full_name = $1, birthdate = $2, education = $3, email = $4 where user_id = $5",
    [
        updatedUser.full_name,
        updatedUser.birthdate,
        updatedUser.education,
        updatedUser.email,
        userId
    ]);

    return res.json({
        message: "Your profile has been updated successfully."
    });
});


export default userRouter;