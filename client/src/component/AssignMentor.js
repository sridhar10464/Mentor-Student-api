import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignMentor = () => {
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedMentor, setSelectedMentor] = useState("");

  // Fetch mentors and students data from API
  useEffect(() => {
    const fetchMentors = async () => {
      const res = await axios.get("http://localhost:8000/api/mentor/mentors-list");
      setMentors(res.data);
    };
    const fetchStudents = async () => {
      const res = await axios.get("http://localhost:8000/api/student/students-list");
      setStudents(res.data);
    };
    fetchMentors();
    fetchStudents();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.gets(`http://localhost:8000/api/student/${selectedStudent}/mentor`, {
        mentor: selectedMentor,
      });
      alert("Mentor assigned successfully!");
    } catch (err) {
      alert("Error assigning mentor.");
    }
  };

  // Filter out students that already have a mentor assigned
  const filteredStudents = students.filter(
    (student) => !student.mentor || student.mentor === ""
  );

  return (
    <div className="container">
      <h1>Assign or Change Mentor for a Student</h1>
      <form onSubmit={handleSubmit}>
        <label>Select a student:</label>
        <select
          onChange={(e) => setSelectedStudent(e.target.value)}
          value={selectedStudent}
          required
        >
          <option value="">Select a student</option>
          {filteredStudents.map((student) => (
            <option key={student._id} value={student._id}>
              {student.name}
            </option>
          ))}
        </select>
        <br />
        <label>Select a mentor:</label>
        <select
          onChange={(e) => setSelectedMentor(e.target.value)}
          value={selectedMentor}
          required
        >
          <option value="">Select a mentor</option>
          {mentors.map((mentor) => (
            <option key={mentor._id} value={mentor._id}>
              {mentor.name}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Assign Mentor</button>
      </form>
    </div>
  );
};

export default AssignMentor;