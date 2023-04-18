import * as json from "./json";
import { User } from "./types";

export function findUserList() {
  const dirFiles = json.listDir("..", "data", "users");
  const users = dirFiles.map((dirFile: string) => {
    const user = json.readJSON("..", "data", "users", dirFile);
    return user;
  });
  return users;
}
export function findUserById(id: number) {
  const user = json.readJSON("..", "data", "users", `${id}.json`);
  return user;
}
export function createUser(userData: User) {
  const newUserId = getNextUserId();
  console.log(newUserId);
  const newUserObject = {
    ...userData,
    id: newUserId,
  };
  json.writeJSON(newUserObject, "..", "data", "users", `${newUserId}.json`);
  updateLastUserId(newUserId);
  return newUserObject;
}
export function updateUserById(id: number, userData: User) {
  const updatedUserObject = {
    ...userData,
    id: Number(id),
  };
  json.patchJSON(updatedUserObject, "..", "data", "users", `${id}.json`);
  return updatedUserObject;
}
export function overwriteUserById(id: number, userData: User) {
  const user = findUserById(id);
  const overwriteUser = {
    ...user,
    ...userData,
  };
  json.patchJSON(overwriteUser, "..", "data", "users", `${id}.json`);
  return overwriteUser;
}
export function deleteUserById(id: number) {
  const user = json.readJSON("..", "data", "users", `${id}.json`);
  json.deleteJSON("..", "data", "users", `${id}.json`);
  const response = {
    success: true,
    data: {
      ...user,
    },
  };
  return response;
}

export function getNextUserId() {
  const userNumber = json.readJSON("..", "data", "user-last-id.json");
  const userNextNumber = userNumber.lastId + 1;
  return userNextNumber;
}
export function updateLastUserId(lastUserId: number) {
  const lastUserIdObject = {
    lastId: lastUserId,
  };
  json.patchJSON(lastUserIdObject, "..", "data", "user-last-id.json");
}
