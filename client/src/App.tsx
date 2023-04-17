import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./routes/Home";
import { NotePadNew } from "./routes/NotePadNew";
import { NotePadView } from "./routes/NotePadView";
import { NotePadUpdate } from "./routes/NotePadUpdate";
import { AppBar } from "./components/AppBar";

function App() {
  return (
    <BrowserRouter>
      <div>
        <AppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notepad-new/" element={<NotePadNew />} />
          <Route path="/notepad-view/:id" element={<NotePadView />} />
          <Route path="/notepad-update/:id" element={<NotePadUpdate />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
