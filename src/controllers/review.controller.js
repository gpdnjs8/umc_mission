import { addReview, listUserReviews } from "../services/review.service.js";
import { bodyToReview, responseFromReview } from "../dtos/review.dto.js";
import { StatusCodes } from "http-status-codes";

export const handleAddReview = async (req, res, next) => {
  /*
    #swagger.summary = '가게에 리뷰 추가 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: { type: "number" },
              storeId: { type: "number" },
              content: { type: "string" },
              star: { type: "number" },
              imageUrl: { type: "string" }
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "가게에 리뷰 추가 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  content: { type: "string" },
                  star: { type: "number" },
                  imageUrl: { type: "string" },
                  createdAt:  { type: "string", format: "date-time" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[404] = {
      description: "가게에 리뷰 추가 실패 응답 (S001)",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "S001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
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
   /*
    #swagger.summary = '내가 작성한 리뷰 목록 조회 API';
    #swagger.responses[200] = {
      description: "내가 작성한 리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        content: { type: "string" },
                        star: { type: "number" },
                        imageUrl: { type: "string" },
                        createdAt: { type: "string", format: "date-time" },
                        storeId: { type: "number" },
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
  */
  const reviews = await listUserReviews(
    parseInt(req.params.userId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};