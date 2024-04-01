import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TeamListPage from './components/TeamListPage';
import TeamMemberForm from './components/TeamMemberForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<TeamListPage />} />
        <Route path="/:id" element={<TeamMemberForm />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
