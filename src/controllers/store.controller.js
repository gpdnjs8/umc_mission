import { addStore, listStoreReviews } from "../services/store.service.js";
import { StatusCodes } from "http-status-codes";

export const handleAddStore = async (req, res, next) => {
   /*
    #swagger.summary = '특정 지역에 가게 추가 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              region_id: { type: "number" },
              name: { type: "string" },
              number: { type: "number" },
              thumbnail: { type: "string" },
              work_time: { type: "string" },
              region: { type: "string" },
              address: { type: "string" }
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "특정 지역에 가게 추가 성공 응답",
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
                  id: { type: "number" },
                  name: { type: "string" },
                  number: { type: "number" },
                  thumbnail: { type: "string" },
                  work_time: { type: "string" },
                  address: { type: "string" },
                  regionId: { type: "number" },
                  region: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[404] = {
      description: "특정 지역에 가게 추가 실패 응답 (R001)",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "R001" },
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
    const store = await addStore(req.body);
    res.status(StatusCodes.CREATED).success(store);
  } catch (err) {
    next(err);
  }
};

export const handleListStoreReviews = async (req, res, next) => {
   /*
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
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
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        user: { type: "object", properties: { id: { type: "number" }, email: { type: "string" }, name: { type: "string" } } },
                        content: { type: "string" }
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
    #swagger.responses[404] = {
      description: "상점 리뷰 목록 조회 실패 응답 (S001)",
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
    const reviews = await listStoreReviews(
      parseInt(req.params.storeId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );

    res.status(StatusCodes.OK).success(reviews);
  } catch (err) {
    next(err); 
  }
};