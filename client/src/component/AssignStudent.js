import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Navbar from './Navbar';
import "../styles/AssignStudent.css";

function AssignStudent() {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
    const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch all mentors and students from backend API
    axios.get('https://mentor-student-api-3fz7.onrender.com/api/mentor/mentors-list')
      .then((response) => {
        setMentors(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get('https://mentor-student-api-3fz7.onrender.com/api/student/students-list')
      .then((response) => {
        // Filter out students who already have a mentor assigned
        const unassignedStudents = response.data.filter((student) => !student.mentor);
        setStudents(unassignedStudents);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleMentorChange = (e) => {
    setSelectedMentor(e.target.value);
    };
    
  const handleStudentChange = (e) => {
        const selectedStudentIds = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedStudents(selectedStudentIds);
    };

//   const handleStudentChange = (e) => {
//     const options = e.target.options;
//     const selected = [];
//     for (let i = 0; i < options.length; i++) {
//       if (options[i].selected) {
//         selected.push(options[i].value);
//       }
//     }
//     setSelectedStudents(selected);
//   };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      mentor: selectedMentor,
      students: selectedStudents
        };
    //    axios.post( `http://localhost:8000/api/mentor/${selectedMentor}/assign-students`, data)
    axios.post(`https://mentor-student-api-3fz7.onrender.com/api/mentor/${selectedMentor}/assign-students`, data)
      .then((response) => {
        console.log(response.data);
        setMessage("Mentor created successfully");
        setSelectedMentor('');
        setSelectedStudents([]);
      })
      .catch((error) => {
        console.log(error);
        setMessage("Error creating mentor");
      });
  };

  return (
    <div className="assign-container">
      <div className="assign-content">
        <h1>Assign Students to Mentors</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Select a Mentor:
            <select value={selectedMentor} onChange={handleMentorChange} required>
              <option value="">--Select a mentor--</option>
              {mentors.map((mentor) => (
                <option value={mentor._id} key={mentor._id}>
                  {mentor.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Select Students:
            <select multiple value={selectedStudents} onChange={handleStudentChange} required>
              {students.map((student) => (
                <option value={student._id} key={student._id}>
                  {student.name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Assign</button>
          {message && <p>{ message }</p>}
        </form>
      </div>
    </div>
  );
}

export default AssignStudent;
