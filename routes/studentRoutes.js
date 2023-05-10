const express = require("express");
const { createStudent, getStudent, assignStudent, assignMentorController } = require("../controllers/studentController");


const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello students")
});

router.post("/add-student", createStudent);

router.get("/students-list", getStudent);

router.put("/:studentId/mentor/:mentorId", assignStudent);

router.get("/:studentId/mentor", assignMentorController)

module.exports = router;