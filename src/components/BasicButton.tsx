import styled from "styled-components";

interface PropsType {
  children: React.ReactNode;
  fontColor: string;
  backgdColor: string;
  borderColor: string;
  hoverFontColor: string;
  hoverBackgdColor: string;
  onClick?: () => void;
}

export const BasicButton = ({
  children,
  fontColor,
  backgdColor,
  borderColor,
  hoverFontColor,
  hoverBackgdColor,
}: PropsType) => {
  return (
    <Button
      fontColor={fontColor}
      backgdColor={backgdColor}
      borderColor={borderColor}
      hoverFontColor={hoverFontColor}
      hoverBackgdColor={hoverBackgdColor}
    >
      {children}
    </Button>
  );
};

const Button = styled.button<PropsType>`
  padding: 16px;
  background-color: ${(props) => props.backgdColor};
  border: 1px solid ${(props) => props.borderColor};
  color: ${(props) => props.fontColor};
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: 0.3s;

  :hover {
    color: ${(props) => props.hoverFontColor};
    background-color: ${(props) => props.hoverBackgdColor};
  }
`;
