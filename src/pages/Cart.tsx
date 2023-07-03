import { useEffect, useState } from "react";
import styled from "styled-components";
import { BasicButton } from "../components/BasicButton";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { cartStorageAtom, darkModeAtom, getItemsIdAtom } from "../recoil/Atoms";
import { getCartItems } from "../recoil/FetchSelector";
import { Link } from "react-router-dom";
import { handleSubtract } from "../components/handleCount";
import { PurchaseModal } from "../components/modal/PurchaseModal";

export const Cart = () => {
  const isDarkMode = useRecoilValue(darkModeAtom);
  const setCartItemsId = useSetRecoilState(getItemsIdAtom);
  const cartItemList = useRecoilValue(getCartItems);
  const [cartItems, setCartItems] = useRecoilState(cartStorageAtom);
  let totalPrice = 0;
  const handleCartItems = (item: any) => {
    setCartItems(item);
  };

  useEffect(() => {
    let parsedCartItems = null;
    if (cartItems !== null) {
      parsedCartItems = JSON.parse(cartItems);
    }
    setCartItemsId(parsedCartItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  const [modalOpen, setModalOpen] = useState(false);
  const handlePurchase = (isOpen: boolean) => {
    setModalOpen(isOpen);
  };

  return (
    <>
      {cartItems === "[]" || cartItems === null ? (
        <CartItemContainer>
          <div className="empty-cart">
            <div>장바구니에 물품이 없습니다.</div>
            <Link to={"/"}>
              <BasicButton
                fontColor="white"
                backgdColor="rgb(102, 26, 230)"
                borderColor="rgb(102, 26, 230)"
                hoverFontColor="white"
                hoverBackgdColor="rgb(74, 17, 172)"
              >
                담으러 가기
              </BasicButton>
            </Link>
          </div>
        </CartItemContainer>
      ) : (
        <>
          <Category> 홈 - 장바구니</Category>
          <Container>
            <div>
              {cartItemList.map((item: any) => {
                totalPrice += item.price * item.count;

                return (
                  <CartItemContainer key={item.id}>
                    <Link to={"/product"} state={{ item: item }}>
                      <ItemImage imgUrl={item.image} />
                    </Link>
                    <ItemInfo isDarkMode={isDarkMode}>
                      <Link to={"/product"} state={{ item: item }}>
                        <h2>{item.title}</h2>
                      </Link>
                      <div className="price">
                        ${(item.price * item.count).toFixed(2)}
                      </div>
                      <ButtonGroup>
                        <button
                          className="subtract"
                          onClick={(e) =>
                            handleSubtract(
                              e,
                              item.id,
                              "subtract",
                              handleCartItems
                            )
                          }
                        >
                          -
                        </button>
                        <CountButton isDarkMode={isDarkMode}>
                          {item.count}
                        </CountButton>
                        <button
                          className="add"
                          onClick={(e) =>
                            handleSubtract(e, item.id, "add", handleCartItems)
                          }
                        >
                          +
                        </button>
                      </ButtonGroup>
                    </ItemInfo>
                  </CartItemContainer>
                );
              })}
            </div>
            <div className="total-price-container">
              <span className="total-price">총 : ${totalPrice.toFixed(2)}</span>
              <div onClick={() => handlePurchase(true)}>
                <BasicButton
                  fontColor="white"
                  backgdColor="rgb(102, 26, 230)"
                  borderColor="rgb(102, 26, 230)"
                  hoverFontColor="white"
                  hoverBackgdColor="rgb(74, 17, 172)"
                >
                  구매하기
                </BasicButton>
              </div>
              {modalOpen && (
                <PurchaseModal
                  handlePurchase={handlePurchase}
                  header="정말로 구매하시겠습니까?"
                >
                  장바구니의 모든 상품들이 삭제됩니다.
                </PurchaseModal>
              )}
            </div>
          </Container>
        </>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  padding: 0 0 48px 120px;
  justify-content: space-between;

  @media (max-width: 1025px) {
    flex-direction: column;
    padding: 0 32px;
  }

  .total-price-container {
    display: flex;
    align-items: baseline;
    padding-left: 8px;
    min-width: 260px;
    font-weight: 600;
    margin-right: 120px;
  }

  .total-price {
    margin-right: 24px;
    font-size: 24px;

    @media (max-width: 1025px) {
      flex-direction: column;
      margin: 36px 0;
      margin-right: 24px;
    }
  }
`;

const Category = styled.div`
  font-size: 13px;
  padding: 32px 0 32px 120px;
  text-align: left;
  color: "#c0c0c0";
  margin-bottom: 48px;

  @media (max-width: 1025px) {
    padding: 32px 0 0 32px;
  }
`;

const CartItemContainer = styled.section`
  margin-bottom: 24px;
  display: flex;
  align-items: center;

  .empty-cart {
    font-size: 24px;
    padding: 64px 0;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ItemInfo = styled.div<{ isDarkMode: boolean }>`
  width: auto;
  margin-left: 48px;

  color: ${(props) => (props.isDarkMode ? "#c0c0c0" : "#1d2027")};
  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    :hover {
      text-decoration: underline;
    }
  }

  .price {
    font-size: 30px;
    margin: 24px 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0px;
  }
`;

const ItemImage = styled.div<{ imgUrl: string }>`
  width: 192px;
  height: 192px;
  border-radius: 12px;
  border: 12px solid white;
  background-image: url(${(props) => props.imgUrl});
  background-color: white;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  @media (max-width: 768px) {
    width: 85vw;
    margin: 0 0 32px 0;
  }
`;

const ButtonGroup = styled.div`
  button {
    border: none;
    padding: 16px;
    height: 3rem;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: 0.3s;
  }

  .subtract {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  .add {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .subtract,
  .add {
    background-color: rgb(102, 26, 230);
    color: white;
    :hover {
      background-color: rgb(74, 17, 172);
    }
  }
`;

const CountButton = styled.button<{ isDarkMode: boolean }>`
  background-color: inherit;
  color: ${(props) => (props.isDarkMode ? "#c0c0c0" : "#1d2027")};
  :hover {
    background-color: ${(props) =>
      props.isDarkMode ? "rgb(55, 65, 81)" : "#c0c0c0"};
  }
`;
