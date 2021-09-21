import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  faculty: String,
});

const StudentInfo = mongoose.model("studentInfo", studentSchema);

export default StudentInfo;
