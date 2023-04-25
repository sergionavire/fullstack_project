import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./routes/Home";
import { NotepadNew } from "./routes/NotepadNew";
import { NotepadView } from "./routes/NotepadView";
import { NotepadUpdate } from "./routes/NotepadUpdate";
import { AppBar } from "./components/AppBar";

function App() {
  return (
    <BrowserRouter>
      <div>
        <AppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page/:page" element={<Home />} />
          <Route path="/notepad-new/" element={<NotepadNew />} />
          <Route path="/notepad-view/:id" element={<NotepadView />} />
          <Route path="/notepad-update/:id" element={<NotepadUpdate />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
