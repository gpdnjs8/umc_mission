import { addReview, listUserReviews } from "../services/review.service.js";
import { bodyToReview, responseFromReview } from "../dtos/review.dto.js";
import { StatusCodes } from "http-status-codes";

export const handleAddReview = async (req, res, next) => {
  try {
    const reviewData = bodyToReview(req.body);
    const newReview = await addReview(reviewData);

    const reviewResponse = responseFromReview({
      ...reviewData,
      id: newReview.id,
      created_at: new Date(),
    });

    res.status(StatusCodes.CREATED).success({
      message: "리뷰 추가 성공",
      review: reviewResponse,
    });
  } catch (err) {
    next(err);
  }
};

export const handleListUserReviews = async (req, res, next) => {
  const reviews = await listUserReviews(
    parseInt(req.params.userId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};