import { addUserMission, listUserMissionsInProgress } from "../services/userMission.service.js";
import { createUserMissionDto } from "../dtos/userMission.dto.js";
import { StatusCodes } from "http-status-codes";

export const handleAddUserMission = async (req, res) => {
  try {
    const dto = createUserMissionDto(req.body);
    const userMission = await addUserMission(dto);
    res.status(201).json({ message: "미션 도전 추가 성공", userMission });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const handleListUserMissionsInProgress = async (req, res) => {
  const usermissions = await listUserMissionsInProgress(
    parseInt(req.params.userId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).json({
    success: true,
    message: "내가 진행 중인 미션 목록 조회 성공",
    data: usermissions,
  });
 
};
