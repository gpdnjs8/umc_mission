import { insertUserMission, getUserMission, getUserMissionById, getUserMissionsInProgress } from "../repositories/userMission.repository.js";
import { getMissionById } from "../repositories/mission.repository.js";
import { responseFromUserMissions } from "../dtos/userMission.dto.js";
import { MissionError, DuplicateMissionError } from "../../errors.js";

export const addUserMission = async (data) => {
  const mission = await getMissionById(data.missionId);
  if (!mission) throw new MissionError("해당 미션이 존재하지 않습니다.", data);

  const existing = await getUserMission(data.userId, data.missionId);
  if (existing) throw new DuplicateMissionError("이미 도전 중인 미션입니다.", data);

  const userMissionId = await insertUserMission(data);

  const userMission = await getUserMissionById(userMissionId);
  return userMission;
};

export const listUserMissionsInProgress = async (userId, cursor = 0) => {
  const missions = await getUserMissionsInProgress(userId, cursor);
  return responseFromUserMissions(missions);
};