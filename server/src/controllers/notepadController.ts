import express from "express";
import * as notepadService from "../services/notepadService";

export const notepadController = express.Router();

notepadController.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const notepads = notepadService.findNotepadList();
  res.status(200).json(notepads);
});

notepadController.get("/:id", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const id = Number(req.params.id);
  const notepad = notepadService.findNotepadById(id);
  res.send(notepad);
});

notepadController.post("/", (req, res) => {
  const newNotepadObject = notepadService.createNotepad(req.body);
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).json(newNotepadObject);
});

notepadController.put("/:id", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const id = Number(req.params.id);
  const updatedNotepadObject = notepadService.updateNotepadById(
    Number(id),
    req.body
  );
  res.status(200).json(updatedNotepadObject);
});

notepadController.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedNotepadObject = notepadService.overwriteNotepadById(
    id,
    req.body
  );
  res.json(updatedNotepadObject);
});

notepadController.delete("/notepads/:id", (req, res) => {
  const id = Number(req.params.id);
  const response = notepadService.deleteNotepadById(id);
  res.status(200).json(response);
});
