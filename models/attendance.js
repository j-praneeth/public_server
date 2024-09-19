// models/attendance.js

const pool = require('./db');

/*
 * Mark attendance for a user.
 * param {number} email - The ID of the user.
 * param {boolean} attendance - Attendance status (true for present, false for absent).
 * returns - The inserted attendance record.
 */
const markAttendance = async (email, attendance) => {
  const query = `
    INSERT INTO attendance (email, attendance)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [email, attendance];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

/*
 * Retrieve attendance records for a user.
 * param {number} email - The ID of the user.
 * returns - Array of attendance records.
 */
const getAttendanceByUserId = async (email) => {
  const query = `
    SELECT email, attendance
    FROM attendance
    WHERE email = $1
    ORDER BY email DESC;
  `;
  const values = [email];
  const { rows } = await pool.query(query, values);
  return rows;
};

/*
 * Optionally, retrieve all attendance records.
 * @returns - Array of all attendance records.
 */
const getAllAttendance = async () => {
  const query = `
    SELECT email, attendance
    FROM attendance
    ORDER BY email DESC;
  `;
  const { rows } = await pool.query(query);
  return rows;
};

/*
 * Optionally, update an attendance record.
 * param {number} attendance_id - The ID of the attendance record.
 * param {boolean} attendance - The updated attendance status.
 * returns - The updated attendance record.
 */
const updateAttendance = async (attendance_id, attendance) => {
  const query = `
    UPDATE attendance
    SET attendance = $2
    WHERE email = $1
    RETURNING *;
  `;
  const values = [attendance_id, attendance];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

/*
 * Optionally, delete an attendance record.
 * param {number} attendance_id - The ID of the attendance record.
 */
const deleteAttendance = async (attendance_id) => {
  const query = `
    DELETE FROM attendance
    WHERE email = $1;
  `;
  const values = [attendance_id];
  await pool.query(query, values);
};

module.exports = {
  markAttendance,
  getAttendanceByUserId,
  getAllAttendance,
  updateAttendance,
  deleteAttendance,
};
