import { addMission, listStoreMissions } from "../services/mission.service.js";
import { StatusCodes } from "http-status-codes";

export const handleAddMission = async (req, res, next) => {
  try {
    const mission = await addMission(req.body);
    res.status(StatusCodes.CREATED).success(mission);
  } catch (err) {
    next(err);
  }
};


export const handleListStoreMissions = async (req, res) => {
  const missions = await listStoreMissions(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(missions);
};