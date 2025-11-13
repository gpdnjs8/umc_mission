import { addStore, listStoreReviews } from "../services/store.service.js";
import { StatusCodes } from "http-status-codes";

export const handleAddStore = async (req, res, next) => {
  try {
    const store = await addStore(req.body);
    res.status(StatusCodes.CREATED).success(store);
  } catch (err) {
    next(err);
  }
};

export const handleListStoreReviews = async (req, res, next) => {
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};