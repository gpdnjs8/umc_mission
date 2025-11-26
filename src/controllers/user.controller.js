import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp, updateMyInfoService } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  /*
    #swagger.summary = '회원 가입 API';
    #swagger.tags = ['Auth']
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string" },
              name: { type: "string" },
              gender: { type: "string" },
              birth: { type: "string", format: "date" },
              address: { type: "string" },
              detailAddress: { type: "string" },
              phoneNumber: { type: "string" },
              preferences: { type: "array", items: { type: "number" } }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "회원 가입 성공 응답",
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
                  email: { type: "string" },
                  name: { type: "string" },
                  preferCategory: { type: "array", items: { type: "string" } }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "회원 가입 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
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
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));

  res.status(StatusCodes.OK).success(user);
};

export const updateMyInfo = async (req, res, next) => {
  /*
    #swagger.summary = '내 정보 수정 API';
    #swagger.tags = ['User']
    #swagger.security = [{ "BearerAuth": [] }];
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string" },
              gender: { type: "string" },
              birth: { type: "string", format: "date"},
              address: { type: "string" },
              detailAddress: { type: "string" },
              phoneNumber: { type: "string" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "내 정보 수정 성공 응답",
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
                  email: { type: "string" },
                  name: { type: "string"},
                  gender: { type: "string" },
                  birth: { type: "string", format: "date" },
                  address: { type: "string" },
                  detailAddress: { type: "string" },
                  phoneNumber: { type: "string" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[401] = {
      description: "인증 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U002" },
                  reason: { type: "string", example: "로그인이 필요합니다." }
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
    const user = await updateMyInfoService(req.user.id, req.body);

    res.status(StatusCodes.OK).success(user);
  } catch (err) {
    next(err);
  }
};