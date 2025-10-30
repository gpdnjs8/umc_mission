import { insertStore, getStoreById } from "../repositories/store.repository.js";

export const addStore = async (data) => {
  const storeIds = await insertStore(data);
  const store = await getStoreById(storeIds.id);
  return store;
};