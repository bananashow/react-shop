import { Link } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";

interface PropsType {
  handleHamburgerMenu: (isOpen: boolean) => void;
  hamburgerMenuOpen: boolean;
}

export const HamburgerMenu = (props: PropsType) => {
  const { handleHamburgerMenu, hamburgerMenuOpen } = props;
  return (
    <>
      <Overlay onClick={() => handleHamburgerMenu(false)} />
      <SideMenuContainer SideMenuOpen={hamburgerMenuOpen}>
        <Link to={"/fasion"}>
          <div onClick={() => handleHamburgerMenu(false)}>패션</div>
        </Link>
        <Link to={"/accessory"}>
          <div onClick={() => handleHamburgerMenu(false)}>액세서리</div>
        </Link>
        <Link to={"/digital"}>
          <div onClick={() => handleHamburgerMenu(false)}>디지털</div>
        </Link>
      </SideMenuContainer>
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
  z-index: 998;
`;

const slideIn = keyframes`
  from {
    transform: translateX(-300px);
  }
  to {
    transform: translateX(0);
  }
`;

const SideMenuContainer = styled.div<{ SideMenuOpen: boolean }>`
  background-color: #14141c;
  padding-top: 16px;
  height: 100vh;
  width: 300px;
  z-index: 999;

  position: absolute;
  left: ${(props) => (props.SideMenuOpen ? "0" : "-300px")};
  top: 0;

  ${(props) =>
    props.SideMenuOpen &&
    css`
      animation: ${css`
        ${slideIn} 0.5s
      `};
    `}

  div {
    padding: 16px 24px;
    margin: 0 16px;
    border-radius: 8px;
    cursor: pointer;

    :hover {
      background-color: #2b2b30;
    }
  }
`;
