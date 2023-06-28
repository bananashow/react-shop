import styled from "styled-components";
import { BasicButton } from "../BasicButton";
import { useSetRecoilState } from "recoil";
import { cartStorageAtom } from "../../recoil/Atoms";

interface ModalType {
  handlePurchase: (isOpen: boolean) => void;
  header: string;
  children: React.ReactNode;
}

export const PurchaseModal = (props: ModalType) => {
  const { header, handlePurchase, children } = props;
  const setCartItems = useSetRecoilState(cartStorageAtom);
  const cartStorage = window.localStorage;

  const isPurchase = () => {
    setCartItems(null);
    cartStorage.clear();
    handlePurchase(false);
  };
  return (
    <>
      <Overlay onClick={() => handlePurchase(false)} />
      <Container>
        <h2>{header}</h2>
        <p>{children}</p>
        <Buttons>
          <div onClick={isPurchase}>
            <BasicButton
              fontColor="white"
              backgdColor="rgb(102, 26, 230)"
              borderColor="rgb(102, 26, 230)"
              hoverFontColor="white"
              hoverBackgdColor="rgb(74, 17, 172)"
            >
              네
            </BasicButton>
          </div>
          <div onClick={() => handlePurchase(false)}>
            <BasicButton
              fontColor="rgb(166, 173, 187)"
              backgdColor="inherit"
              borderColor="rgb(166, 173, 187)"
              hoverFontColor="rgb(50, 51, 54)"
              hoverBackgdColor="rgb(166, 173, 187)"
            >
              아니오
            </BasicButton>
          </div>
        </Buttons>
      </Container>
    </>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(26, 26, 26, 0.5);
  z-index: 999;
`;

const Container = styled.div`
  width: 450px;
  height: 150px;
  z-index: 1000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px;

  background-color: rgb(33, 38, 49);
  border: 3px solid rgb(48, 55, 71);
  border-radius: 12px;

  h2 {
    font-size: 18px;
    margin-bottom: 16px;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;

  button {
    margin-left: 12px;
  }
`;
