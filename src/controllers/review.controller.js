import { addReview } from "../services/review.service.js";
import { bodyToReview, responseFromReview } from "../dtos/review.dto.js";

export const handleAddReview = async (req, res) => {
  try {
    const reviewData = bodyToReview(req.body);
    const newReview = await addReview(reviewData);

    res.status(201).json({
      message: "리뷰 추가 성공",
      review: responseFromReview({ ...reviewData, id: newReview.id, created_at: new Date() }),
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};