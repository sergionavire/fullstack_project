import express from "express";
import { notepadController } from "./notepad/notepad.controller";
import { commentController } from "./comment/comment.controller";
import cors from "cors";

const app = express();
const port = 8080;
const host = "0.0.0.0"; //"localhost";
const messageListen = `Server listen on http://${host}:${port}`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/notepads", notepadController);
app.use("/comments", commentController);

app.listen(port, host, () => {
  console.log(messageListen);
});
