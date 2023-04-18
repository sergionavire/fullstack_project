import express from "express";
import fs from "fs";
import * as notepadService from "./notepad.service";
import * as userService from "./user.service";
import cors from "cors";

const app = express();
const port = 8080;
const host = "0.0.0.0"; //"localhost";
const messageListen = `Server listen on http://${host}:${port}`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/iphone/", (req, res) => {
  const page = fs.readFileSync("./src/pages/iphone.html");
  res.status(200).end(page);
});

app.get("/iphone/:answer", (req, res) => {
  const answer = req.params.answer;
  if (answer === "sim") {
    // res.status(301).redirect("/virus/");
    res.redirect(301, "/virus/");
  } else {
    res.redirect(302, "https://www.google.com");
  }
});

app.get("/virus/", (req, res) => {
  // const page = fs.readFileSync("./src/pages/iphone-virus.html");
  res.status(404).end();
});

app.get("/calcular/:num_a/:operator/:num_b", (req, res) => {
  const numA = Number(req.params.num_a);
  const numB = Number(req.params.num_b);
  const operator = req.params.operator;
  const validOperator = ["mais", "menos", "vezes", "dividido"];
  console.log(numA);
  console.log(isNaN(numA));
  if (isNaN(numA) || isNaN(numB) || validOperator.indexOf(operator) === -1) {
    res.status(422).json({ resposta: null });
  } else {
    let result = 0;
    if (operator === "mais") {
      result = numA + numB;
    } else if (operator === "menos") {
      result = numA - numB;
    } else if (operator === "vezes") {
      result = numA * numB;
    } else if (operator === "dividido") {
      result = numA / numB;
    }
    res.status(200).json({ resposta: result });
  }
});

app.get("/pizza/:flavor", (req, res) => {
  const flavor = req.params.flavor;
  if (flavor === "marguerita") {
    res.status(404).json({ message: "Esse sabor está indisponível" });
  } else {
    res.status(200).json({ message: "Sabor encontrado, pode comer!" });
  }
});

app.get("/pessoas", (req, res) => {
  const users = userService.findUserList();
  res.status(200).send(users).end();
});

app.get("/pessoas/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = userService.findUserById(id);
  res.status(200).send(user).end();
});

app.post("/pessoas/", (req, res) => {
  const userParams = req.body;
  const user = userService.createUser(userParams);
  res.status(200).send(user).end();
});

app.put("/pessoas/:id", (req, res) => {
  const id = Number(req.params.id);
  const userParams = req.body;
  const user = userService.updateUserById(id, userParams);
  res.status(200).send(user).end();
});

app.patch("/pessoas/:id", (req, res) => {
  const id = Number(req.params.id);
  const userParams = req.body;
  const user = userService.overwriteUserById(id, userParams);
  res.status(200).send(user).end();
});

app.delete("/pessoas/:id", (req, res) => {
  const id = Number(req.params.id);
  const response = userService.deleteUserById(id);
  res.status(200).send(response).end();
});

app.get("/notepads", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const notepads = notepadService.findNotepadList();
  res.status(200).json(notepads);
});

app.get("/notepads/:id", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const id = Number(req.params.id);
  const notepad = notepadService.findNotepadById(id);
  res.send(notepad);
});

app.post("/notepads/", (req, res) => {
  const newNotepadObject = notepadService.createNotepad(req.body);
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).json(newNotepadObject);
});

app.put("/notepads/:id", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const id = Number(req.params.id);
  const updatedNotepadObject = notepadService.updateNotepadById(
    Number(id),
    req.body
  );
  res.status(200).json(updatedNotepadObject);
});

app.patch("/notepads/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedNotepadObject = notepadService.overwriteNotepadById(
    id,
    req.body
  );
  res.json(updatedNotepadObject);
});

app.delete("/notepads/:id", (req, res) => {
  const id = Number(req.params.id);
  const response = notepadService.deleteNotepadById(id);
  // res.end(`<h1>Deletando a pessoa ${req.params.id}!</h1>`);
  res.status(200).json(response);
});

app.listen(port, host, () => {
  console.log(messageListen);
});
