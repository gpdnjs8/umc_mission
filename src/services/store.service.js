import { insertStore, getStoreById, getAllStoreReviews, getRegionById } from "../repositories/store.repository.js";
import { responseFromReviews } from "../dtos/store.dto.js";
import { StoreError, RegionError } from "../../errors.js";

export const addStore = async (data) => {
  const region = await getRegionById(data.region_id);
  if (!region) {
    throw new RegionError("해당 지역이 존재하지 않습니다.", {
      region_id: data.region_id,
    });
  }

  const storeIds = await insertStore(data);
  const store = await getStoreById(storeIds.id);
  if (!store) {
      throw new StoreError("해당 가게가 존재하지 않습니다.", data);
  }
  return store;
};

export const listStoreReviews = async (storeId, cursor = 0) => {
  const store = await getStoreById(storeId);
  if (!store) {
    throw new StoreError("해당 가게가 존재하지 않습니다.", { storeId });
  }

  const reviews = await getAllStoreReviews(storeId, cursor);
  return responseFromReviews(reviews);
};