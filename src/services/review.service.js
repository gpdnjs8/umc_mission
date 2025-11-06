import { getStoreById, insertReview, getAllUserReviews } from "../repositories/review.repository.js";
import { responseFromReviews } from "../dtos/review.dto.js";

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

export const listUserReviews = async (userId, cursor=0) => {
  const reviews = await getAllUserReviews(userId, cursor);
  return responseFromReviews(reviews);
};