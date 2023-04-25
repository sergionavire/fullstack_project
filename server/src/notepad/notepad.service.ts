import * as json from "../utils/jsonUtils";
import { notepadType } from "../../../shared/types/notepad.type";

const notepadDataPath = ["..", "..", "data", "notepad.data", "notepads"];
const notepadLastIdPath = [
  "..",
  "..",
  "data",
  "notepad.data",
  "notepad-last-id.json",
];

export function findNotepadList(offset: number, limit: number) {
  const dirFilesTotal = json
    .listDir(...notepadDataPath)
    .sort((a: string, b: string) => {
      return parseInt(a) - parseInt(b);
    });
  const dirFiles = dirFilesTotal.slice(offset, offset + limit);

  const notepads = dirFiles
    .map((dirFile: string) => {
      const notepad: notepadType = json.readJSON(...notepadDataPath, dirFile);
      return notepad;
    })
    .sort((a: notepadType, b: notepadType) => a.id - b.id);
  const notepadsTotal = dirFilesTotal.length;
  const notepadReturn = {
    notepads,
    notepadsTotal,
  };
  return notepadReturn;
}
export function findNotepadById(id: number) {
  const notepad = json.readJSON(...notepadDataPath, `${id}.json`);
  return notepad;
}
export function createNotepad(notepadData: notepadType) {
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
export function updateNotepadById(id: number, notepadData: notepadType) {
  const updatedNotepadObject = {
    ...notepadData,
    id: Number(id),
  };
  json.patchJSON(updatedNotepadObject, ...notepadDataPath, `${id}.json`);
  return updatedNotepadObject;
}

export function overwriteNotepadById(id: number, notepadData: notepadType) {
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
