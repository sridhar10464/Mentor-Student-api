import React from "react";
import "../styles/Navbar.css"
// import { Link } from "react-router-dom";


function Navbar () {
    return (
        <nav className="navbar">
            <span className="navbar-brand">MyApp</span>
            <div className="navbar-links">
                <a href="/" className="navbar-link">Home</a>
                <a href="/create-mentor" className="navbar-link">Create Mentors</a>
                <a href="/create-student" className="navbar-link">Create Students</a>
                <a href="/assign-student/" className="navbar-link">Assign Students</a>
                <a href="/assign-mentor/" className="navbar-link">Assign Mentors</a>
                <a href="/student-mentor/" className="navbar-link">Student Mentors</a>
            </div>
        </nav>
        // <nav>
        //     <ul>
        //         <li><Link to="/"> Home </Link></li>
        //         <li><Link to="/create-mentor"> Create Mentor </Link></li>
        //         <li><Link to="/create-student"> Create Student </Link></li>
        //         <li><Link to = "/assign-student"> Assign Student </Link></li>
        //     </ul>
        // </nav>
    )
}

export default Navbar;