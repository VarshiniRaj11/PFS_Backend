const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  semester: { type: Schema.Types.ObjectId, ref: 'Semester' },
  id: { type: Number, },
  attendance: Number,
  gpa: Number,
  status: String,
  applicationStatus: String,
});


module.exports = mongoose.model('User_Details', userSchema);
