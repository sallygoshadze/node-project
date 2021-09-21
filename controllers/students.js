import mongoose from "mongoose";
import StudentInfo from "../models/studentInfo.js";

export const getStudents = async (req, res) => {
  try {
    const students = await StudentInfo.find();
    return res.status(200).json(students);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const createStudent = async (req, res) => {
  const student = req.body;
  const newStudent = new StudentInfo(student);
  console.log(req.body);
  try {
    await newStudent.save();
    return res.status(201).json(newStudent);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const student = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("Could not parse student id");

  const updatedStudent = await StudentInfo.findByIdAndUpdate(id, student, {
    new: true,
  });

  return res.status(200).json(updatedStudent);
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("Could not parse student id");

  await StudentInfo.findByIdAndRemove(id);

  return res.status(200).json({ message: "Student deleted successfully" });
};
