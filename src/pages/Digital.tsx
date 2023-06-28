import { ProductList } from "../components/ProductList";
import { useRecoilValue } from "recoil";
import { getDigital } from "../recoil/FetchSelector";

export const Digital = () => {
  const getData = useRecoilValue(getDigital);
  return <ProductList title="디지털" getData={getData} />;
};
