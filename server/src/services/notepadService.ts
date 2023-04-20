import * as json from "../utils/jsonUtils";
import { Notepad } from "../types/notepadType";

const notepadDataPath = ["..", "..", "data", "notepads"];
const notepadLastIdPath = ["..", "..", "data", "notepad-last-id.json"];

export function findNotepadList() {
  // const dirFiles = json.listDir("..", "..", "data", "notepads");
  const dirFiles = json.listDir(...notepadDataPath);
  const notepads = dirFiles.map((dirFile: string) => {
    // const notepad = json.readJSON("..", "..", "data", "notepads", dirFile);
    const notepad = json.readJSON(...notepadDataPath, dirFile);
    return notepad;
  });
  return notepads;
}
export function findNotepadById(id: number) {
  const notepad = json.readJSON(...notepadDataPath, `${id}.json`);
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
  json.writeJSON(newNotepadObject, ...notepadDataPath, `${newNotepadId}.json`);
  updateLastNotepadId(newNotepadId);
  return newNotepadObject;
}
export function updateNotepadById(id: number, notepadData: Notepad) {
  const updatedNotepadObject = {
    ...notepadData,
    id: Number(id),
  };
  json.patchJSON(updatedNotepadObject, ...notepadDataPath, `${id}.json`);
  return updatedNotepadObject;
}

export function overwriteNotepadById(id: number, notepadData: Notepad) {
  const notepad = findNotepadById(id);
  const overwriteNotepad = {
    ...notepad,
    ...notepadData,
  };
  json.patchJSON(overwriteNotepad, ...notepadDataPath, `${id}.json`);
  return overwriteNotepad;
}

export function deleteNotepadById(id: number) {
  const notepad = json.readJSON(...notepadDataPath, `${id}.json`);
  json.deleteJSON(...notepadDataPath, `${id}.json`);
  const response = {
    success: true,
    data: {
      ...notepad,
    },
  };
  return response;
}

export function getNextNotepadId() {
  const notepadNumber = json.readJSON(...notepadLastIdPath);
  const notepadNextNumber = notepadNumber.last_id + 1;
  return notepadNextNumber;
}
export function updateLastNotepadId(lastNotepadId: number) {
  const lastNotepadIdObject = {
    last_id: lastNotepadId,
  };
  json.patchJSON(lastNotepadIdObject, ...notepadLastIdPath);
}
