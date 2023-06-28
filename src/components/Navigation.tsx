import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { darkModeAtom, searchAtom } from "../recoil/Atoms";
import { BsSun, BsMoonStars, BsCart2 } from "react-icons/bs";
import { SearchModal } from "./modal/SearchModal";
import { CartBadge } from "./badge/Cartbadge";
import { HamburgerButton } from "./HamburgerButton";
import { HamburgerMenu } from "./modal/HamburgerMenu";

export interface PropsType {
  toggleDarkMode: () => void;
}

export const Navigation = ({ toggleDarkMode }: PropsType) => {
  const navigation = useNavigate();
  const isDarkMode = useRecoilValue(darkModeAtom);
  const [searchAText, setSearchText] = useRecoilState(searchAtom);
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  const handleHamburgerMenu = (isOpen: boolean) => {
    setHamburgerMenuOpen(isOpen);
  };

  return (
    <>
      <Wrapper isDarkMode={isDarkMode}>
        <Nav>
          {hamburgerMenuOpen && (
            <HamburgerMenu
              hamburgerMenuOpen={hamburgerMenuOpen}
              handleHamburgerMenu={handleHamburgerMenu}
            />
          )}
          <div className="nav-left">
            <div onClick={() => handleHamburgerMenu(true)}>
              <div className="hamburger-button">
                <HamburgerButton />
              </div>
            </div>
            <Link to={"/"}>
              <Header>React Shop</Header>
            </Link>
            <NavUl isDarkMode={isDarkMode}>
              <Link to={"/fasion"}>
                <li>패션</li>
              </Link>
              <Link to={"/accessory"}>
                <li>액세서리</li>
              </Link>
              <Link to={"/digital"}>
                <li>디지털</li>
              </Link>
            </NavUl>
          </div>

          <div className="nav-right">
            <BrowserMode onClick={toggleDarkMode}>
              {isDarkMode ? (
                <BsSun className="icon" />
              ) : (
                <BsMoonStars className="icon" />
              )}
            </BrowserMode>
            <Search
              placeholder="Search"
              isDarkMode={isDarkMode}
              onChange={handleInputChange}
              value={searchAText}
            ></Search>
            <SearchModal />
            <Cart onClick={() => navigation("/cart")}>
              <BsCart2 className="icon" />
              <CartBadge />
            </Cart>
          </div>
        </Nav>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div<{ isDarkMode: boolean }>`
  background-color: ${(props) => (props.isDarkMode ? "#1d2027" : "#dbdfe7")};
  padding: 0 120px;
  position: sticky;
  top: 0;
  z-index: 100;

  .hamburger-button {
    display: none;
  }

  @media (max-width: 768px) {
    .hamburger-button {
      display: block; /* 또는 다른 원하는 스타일 적용 */
    }
  }

  @media (max-width: 1021px) {
    padding: 0;
  }

  .icon {
    font-size: 22px;
    padding: 0 8px;
    cursor: pointer;
  }
`;

const Nav = styled.nav`
  font-weight: 700;
  padding: 12px 0;
  display: flex;
  justify-content: space-between;

  .nav-left,
  .nav-right {
    display: flex;
    align-items: center;

    @media (max-width: 1021px) {
      padding: 0 8px;
      scale: 0.9;
    }
  }
`;

const Header = styled.header`
  font-size: 22px;
  line-height: 28px;
  cursor: pointer;
  margin-right: 12px;
  min-width: 120px;

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const NavUl = styled.ul<{ isDarkMode: boolean }>`
  display: flex;
  li {
    margin: 0 4px;
    padding: 8px 12px;
    cursor: pointer;

    :hover {
      background-color: ${(props) =>
        props.isDarkMode ? "#52545a" : "#a9b0c2"};
      border-radius: 8px;
      transition: 0.3s;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const BrowserMode = styled.div`
  cursor: pointer;
`;

const Search = styled.input<{ isDarkMode: boolean }>`
  border-radius: 4px;
  background-color: ${(props) => (props.isDarkMode ? "#52545a" : "#848ca0")};
  border: 1px solid rgba(166, 173, 187, 0);
  color: ${(props) => (props.isDarkMode ? "#c0c1c7" : "white")};
  font-size: 16px;
  font-weight: 400;
  height: 48px;
  padding: 0 16px;
  margin: 0 16px;

  ::placeholder {
    color: ${(props) => (props.isDarkMode ? "#c0c0c0" : "#ffffff")};
  }

  @media (max-width: 768px) {
    width: 160px;
  }
`;

const Cart = styled.div`
  background-color: inherit;
  position: relative;
`;
