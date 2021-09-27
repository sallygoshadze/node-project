import * as studentService from "../services/students";
import { Request, Response } from "express";
import { CreateStudentDTO } from "../DTOs/createStudentDTO";
import { UpdateStudentDTO } from "../DTOs/updateStudentDTO";

export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await studentService.getStudents();
    return res.status(200).json(students);
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export const createStudent = async (req: Request, res: Response) => {
  const dto: CreateStudentDTO = req.body;
  try {
    const newStudent = await studentService.createStudent(dto);
    return res.status(201).json(newStudent);
  } catch (error: any) {
    return res.status(409).json({ message: error.message });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const dto: UpdateStudentDTO = req.body;

  const updatedStudent = await studentService.updateStudent(Number(id), dto);
  if (updatedStudent === null)
    return res
      .status(404)
      .json({ message: `Could not find student with given id: ${id}` });

  return res.status(200).json(updatedStudent);
};

export const deleteStudent = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedStudent = await studentService.deleteStudent(Number(id));
  if (deletedStudent === null)
    return res
      .status(404)
      .json({ message: `Could not find student with given id: ${id}` });

  return res.status(200).json({ message: "Student deleted successfully" });
};
