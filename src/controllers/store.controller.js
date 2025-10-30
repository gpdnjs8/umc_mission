import { addStore } from "../services/store.service.js";

export const handleAddStore = async (req, res) => {
  try {
    const store = await addStore(req.body);
    res.status(201).json({ message: "가게 추가 성공", store });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};