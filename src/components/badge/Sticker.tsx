import styled from "styled-components";

interface PropsType {
  children: React.ReactNode;
}

export const Sticker = ({ children }: PropsType) => {
  return (
    <>
      <StickerStyle>{children}</StickerStyle>
    </>
  );
};

const StickerStyle = styled.span`
  min-width: 50px;
  height: 24px;
  background-color: rgb(31, 178, 165);
  border-radius: 30px;
  color: white;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
`;
