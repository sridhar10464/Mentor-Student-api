const express = require("express");
const { createMentor, getMentor, assignMentor, mentorStudentController } = require("../controllers/mentorController");


const router = express.Router();

router.get("/", (req, res) =>{
    res.send("Hello mentors")
});

router.post("/add-mentor", createMentor);

router.get("/mentors-list", getMentor);

router.post("/:mentorId/assign-students", assignMentor);

router.get("/:mentorId/students", mentorStudentController);

module.exports = router;