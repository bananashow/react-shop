import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const Error = () => {
  const navigation = useNavigate();

  const backMain = () => {
    navigation("/");
  };

  return (
    <UndefinedPage>
      <div className="error-number">404</div>
      <div className="page-not-found">페이지를 찾을 수 없습니다.</div>
      <button onClick={backMain}>메인으로</button>
    </UndefinedPage>
  );
};

const UndefinedPage = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  color: rgb(166, 173, 187);

  .error-number {
    font-size: 128px;
    font-weight: 700;
    margin-top: 120px;
  }

  .page-not-found {
    font-size: 30px;
    margin: 16px 0 40px 0;
  }

  button {
    background-color: rgb(102, 26, 230);
    width: 160px;
    height: 62px;
    padding: 0 24px;
    border-radius: 8px;
    border: none;
    color: rgb(255, 255, 255);
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 120px;
    cursor: pointer;
  }
`;
