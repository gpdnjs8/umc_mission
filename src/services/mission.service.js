import { insertMission, getMissionById } from "../repositories/mission.repository.js";
import { getStoreById } from "../repositories/store.repository.js";
import { CreateMissionDTO } from "../dtos/mission.dto.js";

export const addMission = async (data) => {
  const missionData = CreateMissionDTO(data);  

  const store = await getStoreById(missionData.storeId);
  if (!store) {
    throw new Error("해당 가게가 존재하지 않습니다.");
  }

  const result = await insertMission(missionData);

  return await getMissionById(result.id);
};