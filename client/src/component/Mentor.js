import React, { useState } from "react";
import "../styles/CreateMentor.css";
import axios from "axios";

 function CreateMentor() {
     const [name, setName] = useState("");
     const [expertise, setExpertise] = useState("");
     const [message, setMessage] = useState("");

     const handleSubmit = async e => {
         e.preventDefault();
         try {
             await axios.post("http://localhost:8000/api/mentor/add-mentor", { name, expertise });
             setMessage("Mentor created successfully");
             setName("");
             setExpertise("");
         } catch (err) {
             console.error(err);
             setMessage("Error creating mentor");
         }
     }

     return (
         <div className="create-mentor-container">
             <h1>Create Mentor</h1>
             <form onSubmit={handleSubmit} className="create-mentor-form">
                 <div className="form-group">
                     <label>Name:</label>
                     <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                 </div>
                 <div className="form-group">
                    <label>Expertise:</label>
                    <input type="text" value={expertise} onChange={e => setExpertise(e.target.value)} required />
                 </div>
                 <button type="submit">Create Mentor</button>
                 {message && <p>{ message }</p>}
             </form>
         </div>
     )
};
 
export default CreateMentor;