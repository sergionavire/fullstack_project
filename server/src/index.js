const express = require("express");
const fs = require("fs");
const notepadService = require("./notepadService.js");
const cors = require("cors");

const app = express();
const port = 8080;
const host = "0.0.0.0"; //"localhost";
const messageListen = `Server listen on http://${host}:${port}`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/notepads", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const notepads = notepadService.findNotepadList();
  // const notepads = { message: "aqui" };
  res.status(200).json(notepads);
  // res.status(200).end("Aqui");
});

app.get("/notepads/:id", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const notepad = notepadService.findNotepadById(req.params.id);
  res.send(notepad);
});

app.post("/notepads/", (req, res) => {
  const newNotepadObject = notepadService.createNotepad(req.body);
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).json(newNotepadObject);
});

app.put("/notepads/:id", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const updatedNotepadObject = notepadService.updateNotepadById(
    req.params.id,
    req.body
  );
  res.status(200).json(updatedNotepadObject);
});

app.patch("/notepads/:id", (req, res) => {
  const updatedNotepadObject = notepadService.overwriteNotepadById(
    req.params.id,
    req.body
  );
  res.json(updatedNotepadObject);
});

app.delete("/notepads/:id", (req, res) => {
  const response = notepadService.deleteNotepadById(req.params.id);
  // res.end(`<h1>Deletando a pessoa ${req.params.id}!</h1>`);
  res.status(200).json(response);
});

app.listen(port, host, () => {
  console.log(messageListen);
});
