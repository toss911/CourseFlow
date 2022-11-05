import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./routes/auth.js";
import coursesRouter from "./routes/courses.js";
import dotenv from "dotenv";


async function init() {
//   dotenv.config();

  const app = express();
  const port = 4000;

  app.use(cors());
  app.use(bodyParser.json());

  app.use("/auth", authRouter);
  app.use("/courses", coursesRouter);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("*", (req, res) => {
    res.status(404).send("Not found");
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

init();
