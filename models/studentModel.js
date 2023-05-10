const mongoose = require('mongoose'); 
const { Schema } = mongoose;
    
const studentSchema = mongoose.Schema({
    name:{
         type: String,
         required: true,
     },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dept: {
        type: String,
        required: true
    },
    mentor: {
        type: Schema.Types.ObjectId,
        ref: "Mentor",
        default: null
    }
});
 
 //Export the model
const Student = mongoose.model('Student', studentSchema);
 
module.exports = Student