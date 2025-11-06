import { addReview, listUserReviews } from "../services/review.service.js";
import { bodyToReview, responseFromReview } from "../dtos/review.dto.js";
import { StatusCodes } from "http-status-codes";

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

export const handleListUserReviews = async (req, res, next) => {
  const reviews = await listUserReviews(
    parseInt(req.params.userId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).json({
    success: true,
    message: "사용자 리뷰 목록 조회 성공",
    data: reviews,
  });
};