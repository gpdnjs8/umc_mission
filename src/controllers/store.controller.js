import { addStore, listStoreReviews } from "../services/store.service.js";
import { StatusCodes } from "http-status-codes";

export const handleAddStore = async (req, res) => {
  try {
    const store = await addStore(req.body);
    res.status(201).json({ message: "가게 추가 성공", store });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const handleListStoreReviews = async (req, res, next) => {
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).json({
    success: true,
    message: "리뷰 목록 조회 성공",
    data: reviews,
  });
};