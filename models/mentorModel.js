const mongoose = require('mongoose'); 
const { Schema } = mongoose;
    
const mentorSchema = mongoose.Schema({
     name:{
         type: String,
         required: true,
     },
    expertise: {
        type: String,
        required: true
    },
    students: {
        type: [Schema.Types.ObjectId],
        ref: "Student",
        default:[]
    }
});
 
 //Export the model
const Mentor = mongoose.model('Mentor', mentorSchema);
 
module.exports = Mentor