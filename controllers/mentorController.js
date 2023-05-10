const Mentor = require("../models/mentorModel");
const Student = require("../models/studentModel");



const createMentor = async (req, res) => {
    try {
        const mentor = new Mentor(req.body);
        const savedMentor = await mentor.save();
        res.json(savedMentor);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

const getMentor = async (req, res) => {
    try {
        const mentors = await Mentor.find().populate("students");
        res.json(mentors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const assignMentor = async (req, res) => {
    const { mentorId } = req.params;
  const { studentIds } = req.body;

  try {
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    // Filter out students who already have a mentor
    const existingStudents = await Student.find({ mentor: { $exists: true } });
    const newStudentIds = studentIds.filter(id => !existingStudents.find(student => student.id === id));

    mentor.students.push(...newStudentIds);
    await mentor.save();

    // Update the mentor field for the new students
    await Student.updateMany({ _id: { $in: newStudentIds } }, { mentor: mentorId });

    res.json({ message: 'Students added to mentor successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const mentorStudentController = async (req, res) => {
    const { mentorId } = req.params;

    try {
        const mentor = await Mentor.findById(mentorId);
        if (!mentor) {
            return res.statu(404).json({ error: "Mentor not found" });
        }

        const students = await Student.find({ mentor: mentorId });
        res.json(students);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

// const assignMentor = async (req, res) => {
//     const { mentorId } = req.params;
//     const { studentIds } = req.body;

//     try {
//         const mentor = await Mentor.findById(mentorId);
//         if (!mentor) {
//           return res.status(404).json({ error: 'Mentor not found' });
//         }
    
//         const students = await Student.find({ _id: { $in: studentIds }, mentor: { $eq: null }});
//         if (students.length === 0) {
//             return res.status(400).json({ error: 'No valid students found' });
//         }
       
//         mentor.students = mentor.students.concat(students.map(s => s._id));
//         for (const student of students) {
//           student.mentor = mentor._id;
//           await student.save();
//         }
//         await mentor.save();
    
//         res.json(mentor);
//       } catch (err) {
//         res.status(500).json({ error: err.message });
//       }
// }

module.exports = { createMentor, getMentor, assignMentor, mentorStudentController };