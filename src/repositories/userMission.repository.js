import { pool } from "../db.config.js";

export const insertUserMission = async (data) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(`SELECT MAX(id) as maxId FROM user_mission`);
    const newId = (rows[0].maxId || 0) + 1;

    await conn.query(
      `INSERT INTO user_mission (id, user_id, mission_id, status, created_at)
       VALUES (?, ?, ?, ?, NOW())`,
      [newId, data.userId, data.missionId, true]
    );

    return newId;
  } finally {
    conn.release();
  }
};

export const getUserMissionById = async (id) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(`SELECT * FROM user_mission WHERE id = ?`, [id]);
    return rows[0] || null;
  } finally {
    conn.release();
  }
};

export const getUserMission = async (userId, missionId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT * FROM user_mission WHERE user_id = ? AND mission_id = ? AND status = true`,
      [userId, missionId]
    );
    return rows[0] || null;
  } finally {
    conn.release();
  }
};