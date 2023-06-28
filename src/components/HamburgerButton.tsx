import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { darkModeAtom } from "../recoil/Atoms";
import { useRecoilValue } from "recoil";

interface PropsType {}

export const HamburgerButton = (props: PropsType) => {
  const isDarkMode = useRecoilValue(darkModeAtom);

  return (
    <HamburgerButtonBox isDarkMode={isDarkMode}>
      <div className="hamburger-button" role="button">
        <GiHamburgerMenu />
      </div>
    </HamburgerButtonBox>
  );
};

const HamburgerButtonBox = styled.div<{ isDarkMode: boolean }>`
  margin-right: 6px;
  .hamburger-button {
    padding: 8px;
    font-size: 23px;
    cursor: pointer;
  }
  :hover {
    transition: 0.2s;
    background-color: ${(props) => (props.isDarkMode ? "#52545a" : "#848ca0")};
    border-radius: 8px;
  }
`;
