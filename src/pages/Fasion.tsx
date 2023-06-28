import { ProductList } from "../components/ProductList";
import { useRecoilValue } from "recoil";
import { getFasion } from "../recoil/FetchSelector";

export const Fasion = () => {
  const getData = useRecoilValue(getFasion);
  return <ProductList title="패션" getData={getData} />;
};
