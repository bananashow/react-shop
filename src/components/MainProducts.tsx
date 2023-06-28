import {
  getElectronicLimit,
  getFasionLimit,
  getJeweleryLimit,
} from "../recoil/FetchSelector";
import { ProductList } from "./ProductList";
import { useRecoilValue } from "recoil";

export const MainProducts = () => {
  const fasionData = useRecoilValue(getFasionLimit);
  const accessoryData = useRecoilValue(getJeweleryLimit);
  const digitalData = useRecoilValue(getElectronicLimit);

  return (
    <>
      <ProductList title="패션" getData={fasionData} />
      <ProductList title="액세서리" getData={accessoryData} />
      <ProductList title="디지털" getData={digitalData} />
    </>
  );
};
