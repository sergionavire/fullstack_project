const {
  listDir,
  readJSON,
  writeJSON,
  deleteJSON,
  patchJSON,
} = require("./json.js");

function findNotepadList() {
  const dirFiles = listDir("..", "data", "notepads");
  const notepads = dirFiles.map((dirFile) => {
    const notepad = readJSON("..", "data", "notepads", dirFile);
    return notepad;
  });
  return notepads;
}
function findNotepadById(id) {
  const notepad = readJSON("..", "data", "notepads", `${id}.json`);
  return notepad;
}
function createNotepad(notepadData) {
  const newNotepadId = getNextNotepadId();
  const currentDate = new Date();
  const newNotepadObject = {
    id: newNotepadId,
    ...notepadData,
    created_at: currentDate.toString(),
  };
  writeJSON(newNotepadObject, "..", "data", "notepads", `${newNotepadId}.json`);
  updateLastNotepadId(newNotepadId);
  return newNotepadObject;
}
function updateNotepadById(id, notepadData) {
  const updatedNotepadObject = {
    id: Number(id),
    ...notepadData,
  };
  patchJSON(updatedNotepadObject, "..", "data", "notepads", `${id}.json`);
  return updatedNotepadObject;
}
function overwriteNotepadById(id, notepadData) {
  const notepad = findNotepadById(id);
  const overwriteNotepad = {
    ...notepad,
    ...notepadData,
  };
  patchJSON(overwriteNotepad, "..", "data", "notepads", `${id}.json`);
  return overwriteNotepad;
}
function deleteNotepadById(id) {
  const notepad = readJSON("..", "data", "notepads", `${id}.json`);
  deleteJSON("..", "data", "notepads", `${id}.json`);
  const response = {
    success: true,
    data: {
      ...notepad,
    },
  };
  return response;
}

function getNextNotepadId() {
  const notepadNumber = readJSON("..", "data", "notepad-last-id.json");
  const notepadNextNumber = notepadNumber.lastId + 1;
  // const newNotepadId = {
  //   lastId: notepadNextNumber,
  // };
  return notepadNextNumber;
}
function updateLastNotepadId(lastNotepadId) {
  const lastNotepadIdObject = {
    lastId: lastNotepadId,
  };
  patchJSON(lastNotepadIdObject, "..", "data", "notepad-last-id.json");
}

module.exports = {
  findNotepadById,
  findNotepadList,
  createNotepad,
  updateNotepadById,
  overwriteNotepadById,
  deleteNotepadById,
  getNextNotepadId,
  updateLastNotepadId,
};
