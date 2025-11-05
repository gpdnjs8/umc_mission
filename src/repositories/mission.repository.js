import { pool } from "../db.config.js";

export const insertMission = async (data) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(`SELECT MAX(id) as maxId FROM mission`);
    const newId = (rows[0].maxId || 0) + 1;

    await conn.query(
      `INSERT INTO mission 
      (id, store_id, status, content, deadline, point, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [newId, data.storeId, data.status || "pending", data.content, data.deadline, data.point || 0]
    );

    return { id: newId, storeId: data.storeId };
  } finally {
    conn.release();
  }
};

export const getMissionById = async (id) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(`SELECT * FROM mission WHERE id = ?`, [id]);
    return rows[0] || null;
  } finally {
    conn.release();
  }
};