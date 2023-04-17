const express = require("express");
const fs = require("fs");
const {
  listDir,
  readJSON,
  writeJSON,
  deleteJSON,
  patchJSON,
  fullPath,
  isJSON,
} = require("./json.js");
const {
  getNextPeopleId,
  updateLastPeopleId,
} = require("./nodemon_ignore/peopleUtils.js");

const app = express();
const port = 8080;
const host = "0.0.0.0"; //"localhost";
const messageListen = `Server listen on http://${host}:${port}`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/pessoas", (req, res) => {
  const dirFiles = listDir("pessoas");
  const peoples = dirFiles.map((dirFile) => {
    const people = readJSON("pessoas", dirFile);
    return people;
  });
  res.status(200).json(peoples);
});

app.get("/pessoas/:id", (req, res) => {
  const peopleId = req.params.id;
  const people = readJSON("pessoas", `${peopleId}.json`);
  res.send(people);
});

app.post("/pessoas/", (req, res) => {
  const peopleReceived = req.body;
  const newPeopleId = getNextPeopleId();
  const newPeopleObject = {
    ...newPeopleId,
    ...peopleReceived,
  };
  writeJSON(newPeopleObject, "pessoas", `${newPeopleId.id}.json`);
  updateLastPeopleId(newPeopleId);
  res.status(200).json(newPeopleObject);
});

app.put("/pessoas/:id", (req, res) => {
  const peopleId = req.params.id;
  const peopleUpdate = req.body;
  console.log(peopleUpdate);
  const updatedPeopleObject = {
    id: Number(peopleId),
    ...peopleUpdate,
  };
  patchJSON(updatedPeopleObject, "pessoas", `${peopleId}.json`);
  res.status(200).json(updatedPeopleObject);
});

app.patch("/pessoas/:id", (req, res) => {
  res.end(`<h1>Atualizando parte da pessoa ${req.params.id}!</h1>`);
});

app.delete("/pessoas/:id", (req, res) => {
  const peopleId = req.params.id;
  const people = readJSON("pessoas", `${peopleId}.json`);
  deleteJSON("pessoas", `${peopleId}.json`);
  const response = {
    success: true,
    data: {
      ...people,
    },
  };
  // res.end(`<h1>Deletando a pessoa ${req.params.id}!</h1>`);
  res.status(200).json(response);
});

app.listen(port, host, () => {
  console.log(messageListen);
});
