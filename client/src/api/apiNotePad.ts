import axios from "axios";

export const apiNotePad = axios.create({
  baseURL: "http://localhost:8080",
});
