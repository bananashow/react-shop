import styled from "styled-components";
import { Sticker } from "../components/badge/Sticker";
import { StarRating } from "../components/StarRating";
import { BasicButton } from "../components/BasicButton";
import { useLocation, useNavigate } from "react-router-dom";
import { MapPropsType } from "../components/ProductList";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartStorageAtom, darkModeAtom } from "../recoil/Atoms";

export interface ItemType extends MapPropsType {
  category: string;
  description: string;
  image: string;
  rating: {
    count: number;
    rate: number;
  };
}

interface ItemContainerProps {
  imgUrl: string;
}

export const ProductInfo = () => {
  const isDarkMode = useRecoilValue(darkModeAtom);
  const navigation = useNavigate();
  const location = useLocation();
  const cartStorage = window.localStorage;
  const item: ItemType = location.state.item;
  const [cartItems, setCartItems] = useRecoilState(cartStorageAtom);

  const addCart = () => {
    const item = location.state.item;
    let parsedCartItems = cartItems !== null ? JSON.parse(cartItems) : [];

    const findItemIndex = parsedCartItems.findIndex(
      (cartItem: any) => cartItem.ID === item.id
    );

    if (findItemIndex !== -1) {
      parsedCartItems[findItemIndex].count++;
    } else {
      parsedCartItems.push({ ID: item.id, count: 1 });
    }

    const updatedCartItems = JSON.stringify(parsedCartItems);
    setCartItems(updatedCartItems);
    cartStorage.setItem("CART", updatedCartItems);
  };

  const moveCart = () => {
    navigation("/cart");
  };

  let currentCategory = "";
  if (
    item.category === "men's clothing" ||
    item.category === "women's clothing"
  ) {
    currentCategory = "패션";
  } else if (item.category === "jewelery") {
    currentCategory = "액세서리";
  } else if (item.category === "electronics") {
    currentCategory = "디지털";
  }

  return (
    <>
      <Category isDarkMode={isDarkMode}>
        {currentCategory} - {item.title}
      </Category>
      <ItemContainer isDarkMode={isDarkMode}>
        <ItemImage imgUrl={item.image} />
        <ItemInfo>
          <div className="title">
            <h2>{item.title}</h2> <Sticker>NEW</Sticker>
          </div>
          <p>{item.description}</p>
          <div>
            <StarRating rating={item.rating} />
          </div>
          <div className="price">${item.price}</div>
          <div className="buttons">
            <BasicButton
              fontColor="white"
              backgdColor="rgb(102, 26, 230)"
              borderColor="rgb(102, 26, 230)"
              hoverFontColor="white"
              hoverBackgdColor="rgb(74, 17, 172)"
            >
              <span onClick={() => addCart()}>장바구니에 담기</span>
            </BasicButton>
            <BasicButton
              fontColor="rgb(166, 173, 187)"
              backgdColor="inherit"
              borderColor="rgb(166, 173, 187)"
              hoverFontColor="rgb(50, 51, 54)"
              hoverBackgdColor="rgb(166, 173, 187)"
            >
              <span onClick={() => moveCart()}>장바구니로 이동</span>
            </BasicButton>
          </div>
        </ItemInfo>
      </ItemContainer>
    </>
  );
};

const Category = styled.div<{ isDarkMode: boolean }>`
  font-size: 13px;
  padding: 32px 0 32px 120px;
  text-align: left;
  color: ${(props) => (props.isDarkMode ? "#c0c0c0" : "#293042")};

  @media (max-width: 1025px) {
    padding: 32px 0 0 32px;
  }
`;

const ItemContainer = styled.section<{ isDarkMode: boolean }>`
  margin: 48px 0;
  padding: 0 120px;
  display: flex;
  color: ${(props) => (props.isDarkMode ? "#c0c0c0" : "#293042")};

  @media (max-width: 1025px) {
    flex-direction: column;
    padding: 0 32px;
  }
`;

const ItemImage = styled.div<ItemContainerProps>`
  width: 30%;
  min-width: 288px;
  height: 288px;
  border-radius: 12px;
  border: 12px solid white;
  background-color: white;
  background-image: url(${(props) => props.imgUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  @media (max-width: 1025px) {
    width: 100%;
  }
`;

const ItemInfo = styled.div`
  width: 70%;
  height: 280px;
  padding: 32px 48px;

  @media (max-width: 1025px) {
    width: 90%;
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
  }

  p {
    margin: 16px 0;
  }

  .price {
    font-size: 30px;
    margin: 24px 0;
  }

  .buttons {
    display: flex;
    gap: 12px;
  }

  .title {
    display: flex;
    align-items: center;
  }
`;
