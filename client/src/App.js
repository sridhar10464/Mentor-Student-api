import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import CreateMentor from './component/Mentor';
import CreateStudent from './component/Student';
import AssignStudent from './component/AssignStudent';
import AssignMentor from './component/AssignMentor';
import StudentMentor from './component/StudentMentor';

function App() {
  return (
    <BrowserRouter>
       <Navbar />
       <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/create-mentor" element={<CreateMentor />} />
        <Route path="/create-student" element={<CreateStudent />} />
        <Route path="/assign-student" element={<AssignStudent />} />
        <Route path="/assign-mentor" element={<AssignMentor />} />
        <Route path="/student-mentor" element={<StudentMentor />} />
      
      </Routes>
      </BrowserRouter>
  );
}

export default App;
