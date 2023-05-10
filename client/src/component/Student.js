import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/Student.css';

function CreateStudent() {
    const [name, setName] = useState('');
    const [age, setAge] = useState("");
    const [email, setEmail] = useState('');
    const [dept, setDept] = useState("");
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, age, email, dept, phone };
    axios.post('http://localhost:8000/api/student/add-student', data)
      .then((response) => {
        console.log(response.data);
        setName('');
        setAge ("");
        setEmail('');
        setDept("");
        setPhone('');
        setMessage("Student created successfully");
      })
      .catch((error) => {
          console.log(error);
          setMessage("Error creating mentor");
      });
  };

  return (
    <div className="student-container">
      <div className="student-content">
        <h1>Student Registration Form</h1>
        <form onSubmit={handleSubmit} className="create-student-form">
          <div className="form-group">
          <label>
            Name:
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Age:
            <input type="text" name="age" value={age} onChange={(e) => setAge(e.target.value)} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Department:
            <input type="text" name="department" value={dept} onChange={(e) => setDept(e.target.value)} required />
          </label>
          <label>
            Phone:
            <input type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </label>
          </div>
          <button type="submit">Register</button>
          {message && <p>{ message }</p>}
        </form>
      </div>
    </div>
  );
}

export default CreateStudent;