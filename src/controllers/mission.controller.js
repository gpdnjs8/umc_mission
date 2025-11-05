import { addMission } from "../services/mission.service.js";

export const handleAddMission = async (req, res) => {
  try {
    const mission = await addMission(req.body);
    res.status(201).json({ message: "미션 추가 성공", mission });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};