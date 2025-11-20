import { insertMission, getMissionById, getAllStoreMissions } from "../repositories/mission.repository.js";
import { getStoreById } from "../repositories/store.repository.js";
import { getUser } from "../repositories/user.repository.js";
import { CreateMissionDTO, responseFromMissions } from "../dtos/mission.dto.js";
import { StoreError } from "../../errors.js";

export const addMission = async (data) => {
  const missionData = CreateMissionDTO(data);  
 
  const user = await getUserById(missionData.userId);
  if (!user) {
    throw new UserError("존재하지 않는 사용자입니다.", data);
  }
  
  const store = await getStoreById(missionData.storeId);
  if (!store) {
    throw new StoreError("해당 가게가 존재하지 않습니다.", data);
  }

  const result = await insertMission(missionData);

  return await getMissionById(result.id);
};

export const listStoreMissions = async (storeId, cursor=0) => {
  const store = await getStoreById(storeId);
  if (!store) {
    throw new StoreError("해당 가게가 존재하지 않습니다.", { storeId });
  }

  const missions = await getAllStoreMissions(storeId, cursor);
  return responseFromMissions(missions);
};