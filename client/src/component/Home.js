import React from "react";
import Navbar from "./Navbar";
import "../styles/Home.css";

function Home () {
    return (
        <div className="home-container">
            {/* <Navbar /> */}
            <div className="home-content">
                <h1>Welcome to my Mentor-Student Assigning App</h1>
                <p>Select an option from the navigation bar to get started.</p>
            </div>
        </div>
    )
}

export default Home;