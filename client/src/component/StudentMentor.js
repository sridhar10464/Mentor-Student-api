import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/StudentMentor.css";

function StudentMentor() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [mentor, setMentor] = useState("");

  useEffect(() => {
    // Fetch students from database
    axios.get("http://localhost:8000/api/student/students-list").then((response) => {
      setStudents(response.data);
    });
  }, []);

  const handleSelect = (event) => {
    const studentId = event.target.value;
    setSelectedStudent(studentId);

    // Fetch previously assigned mentor for the selected student
    axios.get(`http://localhost:8000/api/student/${studentId}/mentor`).then((response) => {
      setMentor(response.data.name);
    });
  };

  return (
    <div className="container">
      <h1>Student Mentor Assignment</h1>
      <form>
        <label htmlFor="student-select">Select a student:</label>
        <select id="student-select" onChange={handleSelect}>
          <option value="">-- Select a student --</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.name}
            </option>
          ))}
        </select>
        {selectedStudent && (
          <p>
            <strong>Previously assigned mentor:</strong> {mentor}
          </p>
        )}
      </form>
    </div>
  );
}

export default StudentMentor;