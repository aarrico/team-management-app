import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TeamListPage from './components/TeamListPage';
import TeamMemberFormPage from './components/TeamMemberForm/TeamMemberFormPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<TeamListPage />} />
          <Route path="/:id" element={<TeamMemberFormPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
