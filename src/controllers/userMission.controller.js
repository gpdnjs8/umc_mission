import { addUserMission, listUserMissionsInProgress } from "../services/userMission.service.js";
import { createUserMissionDto } from "../dtos/userMission.dto.js";
import { StatusCodes } from "http-status-codes";

export const handleAddUserMission = async (req, res, next) => {
  try {
    const dto = createUserMissionDto(req.body);
    const userMission = await addUserMission(dto);
    res.status(StatusCodes.CREATED).success(userMission);
  } catch (err) {
    next(err);
  }
};

export const handleListUserMissionsInProgress = async (req, res) => {
  const usermissions = await listUserMissionsInProgress(
    parseInt(req.params.userId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(usermissions);
};
