import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface propsType {
  header: string;
  contents: string;
  category: string | undefined;
}

export const Shortcuts = ({ header, contents, category }: propsType) => {
  const navigation = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (category === undefined) {
      navigation("/undefined");
    }
    navigation(`/${category}`);
  };

  return (
    <>
      <ShortCutContainer>
        <h2>{header}</h2>
        <div>{contents}</div>
        <button onClick={handleClick}>바로가기 ▶</button>
      </ShortCutContainer>
    </>
  );
};

const ShortCutContainer = styled.section`
  position: absolute;
  bottom: 40%;
  left: 20%;

  h2 {
    font-size: 36px;
    font-weight: bold;
    color: white;
  }

  div {
    margin: 12px 0 22px 0;
  }

  button {
    padding: 16px 24px;
    border: none;
    border-radius: 10px;
    background-color: #1d2027;
    color: white;
    cursor: pointer;
    transition: 0.4s;

    :hover {
      background-color: #131418;
    }
  }

  @media (max-width: 1025px) {
    left: 10%;
    top: 25%;
    scale: 0.8;
  }

  @media (max-width: 768px) {
    left: 6px;
    top: 25%;
    scale: 0.7;
  }
`;
