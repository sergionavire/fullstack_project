import * as json from "./json";
import { Notepad } from "./types";

export function findNotepadList() {
  const dirFiles = json.listDir("..", "data", "notepads");
  const notepads = dirFiles.map((dirFile: string) => {
    const notepad = json.readJSON("..", "data", "notepads", dirFile);
    return notepad;
  });
  return notepads;
}
export function findNotepadById(id: number) {
  const notepad = json.readJSON("..", "data", "notepads", `${id}.json`);
  return notepad;
}
export function createNotepad(notepadData: Notepad) {
  const newNotepadId = getNextNotepadId();
  const currentDate = new Date();
  const newNotepadObject = {
    ...notepadData,
    id: newNotepadId,
    created_at: currentDate.toString(),
  };
  json.writeJSON(
    newNotepadObject,
    "..",
    "data",
    "notepads",
    `${newNotepadId}.json`
  );
  updateLastNotepadId(newNotepadId);
  return newNotepadObject;
}
export function updateNotepadById(id: number, notepadData: Notepad) {
  const updatedNotepadObject = {
    ...notepadData,
    id: Number(id),
  };
  json.patchJSON(updatedNotepadObject, "..", "data", "notepads", `${id}.json`);
  return updatedNotepadObject;
}
export function overwriteNotepadById(id: number, notepadData: Notepad) {
  const notepad = findNotepadById(id);
  const overwriteNotepad = {
    ...notepad,
    ...notepadData,
  };
  json.patchJSON(overwriteNotepad, "..", "data", "notepads", `${id}.json`);
  return overwriteNotepad;
}
export function deleteNotepadById(id: number) {
  const notepad = json.readJSON("..", "data", "notepads", `${id}.json`);
  json.deleteJSON("..", "data", "notepads", `${id}.json`);
  const response = {
    success: true,
    data: {
      ...notepad,
    },
  };
  return response;
}

export function getNextNotepadId() {
  const notepadNumber = json.readJSON("..", "data", "notepad-last-id.json");
  const notepadNextNumber = notepadNumber.lastId + 1;
  return notepadNextNumber;
}
export function updateLastNotepadId(lastNotepadId: number) {
  const lastNotepadIdObject = {
    lastId: lastNotepadId,
  };
  json.patchJSON(lastNotepadIdObject, "..", "data", "notepad-last-id.json");
}
