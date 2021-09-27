import { getRepository } from "typeorm";
import { CreateStudentDTO } from "../DTOs/createStudentDTO";
import { UpdateStudentDTO } from "../DTOs/updateStudentDTO";
import { Student } from "../entities/student";

export const getStudents = async () => {
  return await getRepository(Student).find();
};

export const createStudent = async (
  dto: CreateStudentDTO
): Promise<Student> => {
  const student = new Student();
  student.firstName = dto.firstName;
  student.lastName = dto.lastName;
  student.age = dto.age;
  student.faculty = dto.faculty;

  return await getRepository(Student).save(student);
};

export const updateStudent = async (
  id: number,
  dto: UpdateStudentDTO
): Promise<Student | null> => {
  const foundStudent = await getRepository(Student).findOne(id);

  if (!foundStudent) return null;

  foundStudent.firstName = dto.firstName;
  foundStudent.lastName = dto.lastName;
  foundStudent.age = dto.age;
  foundStudent.faculty = dto.faculty;

  return await getRepository(Student).save(foundStudent);
};

export const deleteStudent = async (id: number): Promise<Student | null> => {
  const foundStudent = await getRepository(Student).findOne(id);

  if (!foundStudent) return null;

  return await getRepository(Student).remove(foundStudent);
};
