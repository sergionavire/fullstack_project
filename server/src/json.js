const fs = require("fs");
const path = require("path");

function listDir(...pathDir) {
  const files = fs.readdirSync(fullPath(...pathDir));
  return files;
}

function readJSON(...pathFile) {
  const JSONString = fs.readFileSync(fullPath(...pathFile)).toString();
  return JSON.parse(JSONString);
}

function writeJSON(newObject, ...pathFile) {
  const fullPathString = fullPath(...pathFile);
  if (isJSON(fullPathString) === false) {
    console.log("O arquivo não é JSON.");
    return;
  }
  fs.writeFileSync(fullPathString, JSON.stringify(newObject), null, 4);
  return;
}

function deleteJSON(...pathFile) {
  const fullPathString = fullPath(...pathFile);
  if (isJSON(fullPathString) === true) {
    fs.unlink(fullPathString, (err) => {
      if (err) {
        return err;
      } else {
        return "Arquivo JSON apagado!";
      }
    });
  } else {
    return "O arquivo não é JSON, por isso não foi apagado!";
  }
}

function patchJSON(updateObject, ...pathFile) {
  const fullPathString = fullPath(...pathFile);
  if (isJSON(fullPathString) === true) {
    const JSONFileString = fs.readFileSync(fullPathString).toString();
    const JSONObject = JSON.parse(JSONFileString);
    const newObject = { ...JSONObject, ...updateObject };
    fs.writeFileSync(fullPathString, JSON.stringify(newObject, null, 4));
    console.log("Arquivo atualizado.");
  } else {
    console.log("Tem que informar um arquivo JSON válido.");
  }
  return;
}

function fullPath(...pathDir) {
  return path.join(__dirname, ...pathDir);
}

function isJSON(pathJSON) {
  return pathJSON.endsWith(".json");
}

module.exports = {
  listDir,
  readJSON,
  writeJSON,
  deleteJSON,
  patchJSON,
  fullPath,
  isJSON,
};
