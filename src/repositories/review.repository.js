import { pool } from "../db.config.js";

export const getStoreById = async (storeId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT * FROM store WHERE id = ?`,
      [storeId]
    );
    return rows[0] || null;
  } finally {
    conn.release();
  }
};

export const insertReview = async (data) => {
  const conn = await pool.getConnection();
  try {
    await conn.query(
      `INSERT INTO review (id, user_id, store_id, content, star, imageUrl, created_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [
        data.id,
        data.userId,
        data.storeId,
        data.content,
        data.star,
        data.imageUrl || null
      ]
    );
    return { message: "리뷰 추가 성공" };
  } finally {
    conn.release();
  }
};

export const getMaxReviewId = async () => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(`SELECT MAX(id) as maxId FROM review`);
    return rows[0].maxId || 0;
  } finally {
    conn.release();
  }
};