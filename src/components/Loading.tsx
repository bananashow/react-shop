import styled from "styled-components";
import spinner from "../assets/spinner.gif";

export const Loading = () => {
  return (
    <UndefinedPage>
      <img src={spinner} alt="spinner" />
      <div className="loading">Loading</div>
      <div className="comment">잠시만 기다려 주세요.</div>
    </UndefinedPage>
  );
};

const UndefinedPage = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #c0c0c0;
  img {
    margin-top: 120px;
    width: 100px;
  }

  .loading {
    font-size: 50px;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    scale: 0.8;
  }
`;
