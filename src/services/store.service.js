import { insertStore, getStoreById, getAllStoreReviews } from "../repositories/store.repository.js";
import { responseFromReviews } from "../dtos/store.dto.js";

export const addStore = async (data) => {
  const storeIds = await insertStore(data);
  const store = await getStoreById(storeIds.id);
  return store;
};

export const listStoreReviews = async (storeId, cursor=0) => {
  const reviews = await getAllStoreReviews(storeId, cursor);
  return responseFromReviews(reviews);
};