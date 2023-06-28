import styled from "styled-components";
import { cartStorageAtom } from "../../recoil/Atoms";
import { useRecoilValue } from "recoil";

export const CartBadge = () => {
  const cartItems = useRecoilValue(cartStorageAtom);
  let count;
  if (cartItems !== null) {
    let parsedCartItems = JSON.parse(cartItems);
    count = parsedCartItems.reduce((acc: any, cur: any) => {
      return acc + cur.count;
    }, 0);
  } else {
    count = 0;
  }

  return <Badge>{count}</Badge>;
};

const Badge = styled.div`
  width: 20px;
  height: 20px;
  background-color: red;
  font-size: 12px;
  border-radius: 50%;
  opacity: 0.8;
  color: white;

  position: absolute;
  top: -8px;
  right: -4px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
