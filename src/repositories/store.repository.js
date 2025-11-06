import { pool } from "../db.config.js";
import { prisma } from "../db.config.js";

const getNextStoreId = async () => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(`SELECT MAX(id) as maxId FROM store`);
    return (rows[0].maxId || 0) + 1;
  } finally {
    conn.release();
  }
};

export const insertStore = async (data) => {
  const conn = await pool.getConnection();

  try {
    const newId = await getNextStoreId();

    const [result] = await conn.query(
      `INSERT INTO store (id, region_id, name, number, thumbnail, work_time, region, address)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newId,
        data.region_id,
        data.name,
        data.number || null,
        data.thumbnail || null,
        data.work_time || null,
        data.region || null,
        data.address || null,
      ]
    );

    return { id: newId, region_id: data.region_id };
  } finally {
    conn.release();
  }
};

export const getStoreById = async (id) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(`SELECT * FROM store WHERE id = ?`, [id]);
    return rows[0] || null;
  } finally {
    conn.release();
  }
};

export const getAllStoreReviews = async (storeId, cursor=0) => {
  const reviews = await prisma.userStoreReview.findMany({
    select: {
      id: true,
      content: true,
      storeId: true,
      userId: true,
      store: true,
      user: true,
    },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};