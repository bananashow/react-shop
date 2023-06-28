import { ProductList } from "../components/ProductList";
import { useRecoilValue } from "recoil";
import { getAccessory } from "../recoil/FetchSelector";

export const Accessory = () => {
  const getData = useRecoilValue(getAccessory);
  return <ProductList title="액세서리" getData={getData} />;
};
