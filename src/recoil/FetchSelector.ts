import axios from "axios";
import { selector } from "recoil";
import { getItemsIdAtom, searchAtom } from "./Atoms";

export const getProductsAll = selector({
  key: "getProductsAll",
  get: async ({ get }) => {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  },
});
// 동적으로 수정해야함
export const getFasionLimit = selector({
  key: "getFasionLimit",
  get: async ({ get }) => {
    const response = await axios.get(
      `https://fakestoreapi.com/products/category/men's clothing?limit=4`
    );
    return response.data;
  },
});
export const getJeweleryLimit = selector({
  key: "getJeweleryLimit",
  get: async ({ get }) => {
    const response = await axios.get(
      `https://fakestoreapi.com/products/category/jewelery?limit=4`
    );
    return response.data;
  },
});
export const getElectronicLimit = selector({
  key: "getElectronicLimit",
  get: async ({ get }) => {
    const response = await axios.get(
      `https://fakestoreapi.com/products/category/electronics?limit=4`
    );
    return response.data;
  },
});
//------------

export const getFasion = selector({
  key: "getFasion",
  get: ({ get }) => {
    const getData = get(getProductsAll);
    const result = getData.filter((item: Record<string, string>) => {
      return (
        item.category === "men's clothing" ||
        item.category === "women's clothing"
      );
    });
    return result;
  },
});

export const getAccessory = selector({
  key: "getAccessory",
  get: ({ get }) => {
    const getData = get(getProductsAll);
    const result = getData.filter((item: Record<string, string>) => {
      return item.category === "jewelery";
    });
    return result;
  },
});

export const getDigital = selector({
  key: "getDigital",
  get: ({ get }) => {
    const getData = get(getProductsAll);
    const result = getData.filter((item: Record<string, string>) => {
      return item.category === "electronics";
    });
    return result;
  },
});

export const searchData = selector({
  key: "searchData",
  get: ({ get }) => {
    const getData = get(getProductsAll);
    let getSearchData = get(searchAtom);

    getSearchData = getSearchData.toLowerCase();

    if (getSearchData === "") {
      return [];
    }

    const result = getData.filter((item: Record<string, string>) => {
      const isTitleMatch = item.title.toLowerCase().includes(getSearchData);
      return isTitleMatch;
    });

    return result;
  },
});

export const getCartItems = selector({
  key: "getCartItems",
  get: ({ get }) => {
    const getData = get(getProductsAll);
    const id = get(getItemsIdAtom);

    const result: Record<string, string>[] = [];

    if (!id) {
      return [];
    }

    getData.map((item1: { id: string }) => {
      id.filter((item2) => {
        if (item2.ID === item1.id) {
          result.push({ ...item1, count: String(item2.count) });
        }
      });
    });
    return result;
  },
});
