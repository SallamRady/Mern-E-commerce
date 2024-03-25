import { openDB } from "idb";

const DB_NAME = "mern-shop";
const DB_VERSION = 1;
const STORE_NAME = "products";

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
    }
  },
});

export const isDBEmpty = async () => {
  const db = await dbPromise;
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const count = await store.count();
  return count === 0;
};

export const addToDB = async (data) => {
  try {
    let idbEmpty = await isDBEmpty();
    if (idbEmpty) {
      const db = await dbPromise;
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      await store.add(data);
      await tx.done;
    }
  } catch (err) {
    console.log("error::", err);
  }
};

export const getAllFromDB = async () => {
  const db = await dbPromise;
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  return store.getAll();
};

export const clearDB = async () => {
  const db = await dbPromise;
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  store.clear();
  return tx.done;
};
