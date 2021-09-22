import mongoose from "mongoose";
import StudentInfo from "../models/studentInfo.js";
import * as studentService from "../services/students.js";

export const getStudents = async (req, res) => {
  try {
    const students = await studentService.getStudents();
    return res.status(200).json(students);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const createStudent = async (req, res) => {
  const student = req.body;
  try {
    const newStudent = await studentService.createStudent(student);
    return res.status(201).json(newStudent);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const student = req.body;

  const updatedStudent = await studentService.updateStudent(id, student);
  if (!updatedStudent)
    return res.status(400).send("Could not parse student id");

  return res.status(200).json(updatedStudent);
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  const deletedStudent = await studentService.deleteStudent(id);
  if (!deletedStudent)
    return res.status(400).send("Could not parse student id");

  return res.status(200).json({ message: "Student deleted successfully" });
};
