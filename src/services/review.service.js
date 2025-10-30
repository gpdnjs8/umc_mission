import { getStoreById, insertReview, getMaxReviewId } from "../repositories/review.repository.js";

export const addReview = async (data) => {
  const store = await getStoreById(data.storeId);
  if (!store) {
    throw new Error("해당 가게가 존재하지 않습니다.");
  }

  const maxId = await getMaxReviewId();
  const newId = maxId + 1;

  return insertReview({ ...data, id: newId });
};
