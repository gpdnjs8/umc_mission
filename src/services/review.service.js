import { getStoreById, insertReview } from "../repositories/review.repository.js";

export const addReview = async (data) => {
  const store = await getStoreById(data.storeId);
  if (!store) {
    throw new Error("해당 가게가 존재하지 않습니다.");
  }

  const result = await insertReview({
    userId: data.userId,
    storeId: data.storeId,
    content: data.content,
    star: data.star,
    imageUrl: data.imageUrl,
  });

  return result;
};