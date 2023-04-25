import express from "express";
import * as commentService from "./comment.service";
import { commentType } from "../../../shared/types/comment.type";

export const commentController = express.Router();

commentController.get("/:notepad_id", (req, res) => {
  const notepadId = Number(req.params.notepad_id);
  res.status(200).json(commentService.findCommentByNotepadId(notepadId));
});

commentController.post("/", (req, res) => {
  const commentObjectReceived = req.body;
  const commentObjectCreated = commentService.createComment(
    commentObjectReceived
  );
  res.status(201).json(commentObjectCreated);
});
