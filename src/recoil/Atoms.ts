import { atom } from "recoil";

export const darkModeAtom = atom({
  key: "darkModeAtom",
  default: true,
});

export const searchAtom = atom({
  key: "searchAtom",
  default: "",
});

interface CartId {
  ID: string;
  count: number | string;
}

export const getItemsIdAtom = atom<CartId[]>({
  key: "getItemsIdAtom",
  default: [],
});

const cartStorage = window.localStorage;
export const cartStorageAtom = atom({
  key: "cartStorageAtom",
  default: cartStorage.getItem("CART"),
});
