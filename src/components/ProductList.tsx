import { useRecoilValue } from "recoil";
import { darkModeAtom } from "../recoil/Atoms";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface PropsType {
  title: string;
  getData: Record<string, MapPropsType>;
}

export interface MapPropsType {
  id: string;
  title: string;
  image: string;
  price: string;
}

export const ProductList = ({ title, getData }: PropsType) => {
  const isDarkMode = useRecoilValue(darkModeAtom);
  const navigation = useNavigate();

  const handleItemClick = (item: MapPropsType) => {
    navigation("/product", {
      state: {
        item: item,
        currentCategory: title,
      },
    });
  };

  return (
    <>
      {window.location.pathname === "/" ? (
        ""
      ) : (
        <Category isDarkMode={isDarkMode}> 홈 - {title}</Category>
      )}
      <Wrapper>
        <Title>{title}</Title>
        <ProductCardContainer>
          {Object.values(getData).map((item: MapPropsType) => {
            return (
              <ProductCard
                isDarkMode={isDarkMode}
                key={item.id}
                onClick={() => handleItemClick(item)}
              >
                <div className="product-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="product-info">
                  <div className="title">{item.title}</div>
                  <div className="price">${item.price}</div>
                </div>
              </ProductCard>
            );
          })}
        </ProductCardContainer>
      </Wrapper>
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ProductCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 26px;
  row-gap: 80px;
  padding: 0 120px;
  margin-bottom: 48px;

  @media (max-width: 1025px) {
    padding: 0 32px;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    padding: 0 12px;
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Title = styled.div`
  font-size: 32px;
  margin: 64px;
`;
const ProductCard = styled.div<{ isDarkMode: boolean }>`
  height: 520px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  .product-image {
    background-color: white;
    border: ${(props) => (props.isDarkMode ? "" : "1px solid #c0c0c0")};
    border-bottom: none;
    height: 65%;
    border-top-left-radius: 32px;
    border-top-right-radius: 32px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-width: 50%;
      max-height: 50%;
      padding: 16px;
      transform: scale(1);
      transition: 0.3s;
      :hover {
        transform: scale(1.1);
        transition: 0.3s;
      }
    }
  }

  .product-info {
    background-color: ${(props) =>
      props.isDarkMode ? "rgb(55, 65, 81)" : "#dbdfe7"};
    flex-grow: 1;
    color: ${(props) => (props.isDarkMode ? "#c0c0c0" : "#1b1b1b")};
    padding: 16px 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
      margin-bottom: 32px;
      font-weight: 600;
    }
  }
`;
