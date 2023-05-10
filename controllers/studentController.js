const Mentor = require("../models/mentorModel");
const Student = require("../models/studentModel");



const createStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        const savedStudent = await student.save();
        res.json(savedStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getStudent = async (req, res) => {
    try {
        const students = await Student.find().populate("mentor");
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const assignStudent = async (req, res) => {
    const { studentId, mentorId } = req.params;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    student.mentor = mentorId;
    await student.save();

    res.json({ message: 'Mentor assigned successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const assignMentorController = async (req, res) => {
    const { studentId } = req.params;

    try {
        const student = await Student.findById(studentId).populate("mentor");
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        if (!student.mentor) {
            return res.status(404).json({ error: "Student does not have a mentor" });
        }
        const mentor = student.mentor;
        res.json(mentor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createStudent, getStudent, assignStudent, assignMentorController };