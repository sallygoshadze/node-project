import { pool } from "../config/db.js";

const getStudentFromDatabase = async (id) => {
  const [rows, fields] = await pool.query(
    "SELECT * FROM students WHERE id = ?",
    [id]
  );
  return rows[0];
};

export const getStudents = async () => {
  const [rows, fields] = await pool.query("SELECT * FROM students");
  return rows;
};

export const createStudent = async (student) => {
  const [rows, fields] = await pool.query(
    "INSERT INTO students (firstName, lastName, age, faculty) VALUES (?, ?, ?, ?)",
    [student.firstName, student.lastName, student.age, student.faculty]
  );

  const newStudent = await pool.query("SELECT * FROM students WHERE id = ?", [
    rows.insertId,
  ]);

  return newStudent[0][0];
};

export const updateStudent = async (id, student) => {
  const foundStudent = await getStudentFromDatabase(id);

  if (foundStudent) {
    const [rows, fields] = await pool.query(
      "UPDATE students SET firstName = ?, lastName = ?, age = ?, faculty = ? WHERE id = ?",
      [student.firstName, student.lastName, student.age, student.faculty, id]
    );

    if (rows.affectedRows === 1) {
      return getStudentFromDatabase(id);
    } else {
      return undefined;
    }
  } else {
    return null;
  }
};

export const deleteStudent = async (id) => {
  const foundStudent = await getStudentFromDatabase(id);

  if (foundStudent) {
    const [rows, fields] = await pool.query(
      "DELETE FROM students WHERE  id = ?",
      [id]
    );
    if (rows.affectedRows === 1) {
      return rows;
    } else {
      return undefined;
    }
  } else {
    return null;
  }
};
