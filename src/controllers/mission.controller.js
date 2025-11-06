import { addMission, listStoreMissions } from "../services/mission.service.js";
import { StatusCodes } from "http-status-codes";

export const handleAddMission = async (req, res) => {
  try {
    const mission = await addMission(req.body);
    res.status(201).json({ message: "미션 추가 성공", mission });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const handleListStoreMissions = async (req, res) => {
  const missions = await listStoreMissions(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).json({
    success: true,
    message: "가게 미션 목록 조회 성공",
    data: missions,
  });
};