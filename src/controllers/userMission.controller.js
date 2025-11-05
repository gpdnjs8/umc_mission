import { addUserMission } from "../services/userMission.service.js";
import { createUserMissionDto } from "../dtos/userMission.dto.js";

export const handleAddUserMission = async (req, res) => {
  try {
    const dto = createUserMissionDto(req.body);
    const userMission = await addUserMission(dto);
    res.status(201).json({ message: "미션 도전 추가 성공", userMission });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};