import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TeamMemberList from "./components/TeamMemberList";

export const TEAM_API_URL = "http://localhost:8000/api/team";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route index path="/" element={<TeamMemberList />} />
    </Routes>
  </BrowserRouter>
);
