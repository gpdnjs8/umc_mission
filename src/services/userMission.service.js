import { insertUserMission, getUserMission, getUserMissionById } from "../repositories/userMission.repository.js";
import { getMissionById } from "../repositories/mission.repository.js";

export const addUserMission = async (data) => {
  const mission = await getMissionById(data.missionId);
  if (!mission) throw new Error("해당 미션이 존재하지 않습니다.");

  const existing = await getUserMission(data.userId, data.missionId);
  if (existing) throw new Error("이미 도전 중인 미션입니다.");

  const userMissionId = await insertUserMission(data);

  const userMission = await getUserMissionById(userMissionId);
  return userMission;
};