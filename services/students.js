import mongoose from "mongoose";
import StudentInfo from "../models/studentInfo.js";

export const getStudents = async () => {
  return await StudentInfo.find();
};

export const createStudent = async (student) => {
  const newStudent = new StudentInfo(student);
  return await newStudent.save();
};

export const updateStudent = async (id, student) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return await StudentInfo.findByIdAndUpdate(id, student, {
    new: true,
  });
};

export const deleteStudent = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return await StudentInfo.findByIdAndRemove(id);
};
