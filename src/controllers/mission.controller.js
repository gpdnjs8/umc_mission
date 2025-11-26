import { addMission, listStoreMissions } from "../services/mission.service.js";
import { StatusCodes } from "http-status-codes";

export const handleAddMission = async (req, res, next) => {
   /*
    #swagger.summary = '가게에 미션 추가 API';
    #swagger.tags = ['Mission']
    #swagger.security = [{ "BearerAuth": [] }]  
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              storeId: { type: "number" },
              content: { type: "string" },
              deadline: { type: "string", format: "date" },
              point: { type: "number" }
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "가게에 미션 추가 성공 응답",
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
                  storeId: { type: "number" },
                  status: { type: "string" },
                  content: { type: "string" },
                  deadline:  { type: "string", format: "date-time" },
                  point: { type: "number" },
                  createdAt:  { type: "string", format: "date-time" },
                  updatedAt:  { type: "string", format: "date-time" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[404] = {
      description: "가게에 미션 추가 실패 응답 (S001)",
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
    const mission = await addMission(req.body);
    res.status(StatusCodes.CREATED).success(mission);
  } catch (err) {
    next(err);
  }
};


export const handleListStoreMissions = async (req, res, next) => {
   /*
    #swagger.summary = '특정 가게의 미션 목록 조회 API';
    #swagger.tags = ['Mission']
    #swagger.security = [{ "BearerAuth": [] }]  
    #swagger.responses[200] = {
      description: "특정 가게의 미션 목록 조회 성공 응답",
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
                        storeId: { type: "number" },
                        status: { type: "string" },
                        content: { type: "string" },
                        deadline: { type: "string", format: "date-time" },
                        point: { type: "number" },
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
      description: "특정 가게의 미션 목록 조회 실패 응답 (S001)",
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
    const missions = await listStoreMissions(
      parseInt(req.params.storeId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );

    res.status(StatusCodes.OK).success(missions);
  } catch (err) {
    next(err); 
  }
};