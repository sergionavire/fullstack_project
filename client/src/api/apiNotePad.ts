import axios from "axios";

export const apiNotepad = axios.create({
  baseURL: "http://localhost:8080",
});
