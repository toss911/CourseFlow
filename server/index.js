import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import { client } from "./utils/db.js";
import authRouter from "./routes/auth.js";

async function init() {
//   dotenv.config();

  const app = express();
  const port = 4000;

//   await client.connect();

  app.use(cors());
  app.use(bodyParser.json());

  app.use("/auth", authRouter);

//   app.use("/auth", authRouter);
//   app.use("/posts", postRouter);

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
