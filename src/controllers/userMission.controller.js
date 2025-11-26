import { addUserMission, listUserMissionsInProgress } from "../services/userMission.service.js";
import { createUserMissionDto } from "../dtos/userMission.dto.js";
import { StatusCodes } from "http-status-codes";

export const handleAddUserMission = async (req, res, next) => {
  /*
    #swagger.summary = '가게의 미션을 도전 중인 미션에 추가 API';
    #swagger.tags = ['Mission']
    #swagger.security = [{ "BearerAuth": [] }]  
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              missionId: { type: "number" }
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "가게의 미션을 도전 중인 미션에 추가 성공 응답",
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
                  userId: { type: "number" },
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
      description: "가게의 미션을 도전 중인 미션에 추가 실패 응답 (M001)",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M001" },
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
    #swagger.responses[409] = {
      description: "가게의 미션을 도전 중인 미션에 추가 실패 응답 (M002)",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M002" },
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
    const dto = {
    ...createUserMissionDto(req.body),
    userId: req.user.id, 
    };
    const userMission = await addUserMission(dto);
    res.status(StatusCodes.CREATED).success(userMission);
  } catch (err) {
    next(err);
  }
};

export const handleListUserMissionsInProgress = async (req, res) => {
   /*
    #swagger.summary = '내가 진행 중인 미션 목록 조회 API';
    #swagger.tags = ['User']
    #swagger.security = [{ "BearerAuth": [] }]  
    #swagger.responses[200] = {
      description: "내가 진행 중인 미션 목록 조회 성공 응답",
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
                        missionId: { type: "number" },
                        status: { type: "string" },
                        createdAt: { type: "string", format: "date-time" }
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
  try {
    const userId = req.user.id; 
    const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;
    const userMissions = await listUserMissionsInProgress(userId, cursor);

    res.status(StatusCodes.OK).success(userMissions);
  } catch (err) {
    next(err);
  }
};
