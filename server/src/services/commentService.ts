import * as json from "../utils/jsonUtils";
import { commentType } from "../types/commentType";

const dataPath = ["..", "..", "data", "comments"];
const lastIdPath = ["..", "..", "data", "comment-last-id.json"];

export function findCommentByNotepadId(id: number) {
  const commentFiles = json.listDir(...dataPath);
  const commentsByNotepadId = commentFiles
    .map((commentFile: string) => {
      const comment = json.readJSON(...dataPath, commentFile);
      console.log(comment);
      return comment;
    })
    .filter((comment: commentType) => comment.notepad_id === id);
  return commentsByNotepadId;
}

export function createComment(commentObjectReceived: commentType) {
  const commentNewId = getNextCommentId();
  const currentDate = new Date();
  const commentNewObjectCreated: commentType = {
    ...commentObjectReceived,
    id: commentNewId,
    created_at: currentDate.toString(),
  };
  json.writeJSON(commentNewObjectCreated, ...dataPath, `${commentNewId}.json`);
  updateLastCommentId(commentNewId);
  return commentNewObjectCreated;
}

export function getNextCommentId() {
  const commentLastIdObject = json.readJSON(...lastIdPath);
  const commentNextId = commentLastIdObject.last_id + 1;
  return commentNextId;
}
export function updateLastCommentId(lastCommentId: number) {
  const lastCommentIdObject = {
    last_id: lastCommentId,
  };
  json.patchJSON(lastCommentIdObject, ...lastIdPath);
}
