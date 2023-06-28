import styled from "styled-components";
import { visa } from "../assets/cards/visa";
import { mastercard } from "../assets/cards/mastercard";
import { americanExpress } from "../assets/cards/americanExpress";
import { paypal } from "../assets/cards/paypal";
import { dinersClub } from "../assets/cards/dinersClub";
import { discover } from "../assets/cards/discover";
import { darkModeAtom } from "../recoil/Atoms";
import { useRecoilValue } from "recoil";
import { BsFacebook, BsInstagram, BsGithub } from "react-icons/bs";

export const Footer = () => {
  const isDarkMode = useRecoilValue(darkModeAtom);

  return (
    <Container isDarkMode={isDarkMode}>
      <h3>React Shop</h3>
      <Cards>
        <ul>
          <li>{visa()}</li>
          <li>{mastercard()}</li>
          <li>{americanExpress()}</li>
          <li>{paypal()}</li>
          <li>{dinersClub()}</li>
          <li>{discover()}</li>
          <li>{visa()}</li>
        </ul>
      </Cards>
      <SNSIcons>
        <ul>
          <Icon tooltip="facebook">
            <BsFacebook
              onClick={() =>
                window.open(
                  "https://www.facebook.com/profile.php?id=100003441659007&mibextid=LQQJ4d"
                )
              }
            />
          </Icon>
          <Icon tooltip="instagram">
            <BsInstagram
              onClick={() =>
                window.open("https://www.instagram.com/bananaqick/")
              }
            />
          </Icon>
          <Icon tooltip="github">
            <BsGithub
              onClick={() => window.open("https://github.com/bananashow")}
            />
          </Icon>
        </ul>
      </SNSIcons>
      <div>Copyright &copy; 2023 React Shop</div>
    </Container>
  );
};
const Container = styled.footer<{ isDarkMode: boolean }>`
  background-color: ${(props) => (props.isDarkMode ? "#1d2027" : "#d8dce7")};
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    margin: 48px 0;
  }
`;

const Cards = styled.div`
  ul {
    width: 300px;
    display: flex;
    justify-content: space-between;
  }
  margin-bottom: 48px;
`;

const SNSIcons = styled.div`
  margin-bottom: 32px;
  ul {
    display: flex;
  }
`;

const Icon = styled.li<{ tooltip: string }>`
  font-size: 24px;
  margin: 0 14px;
  position: relative;
  cursor: pointer;

  :hover {
    position: relative;

    ::after {
      content: "${(props) => props.tooltip}";
      position: absolute;
      bottom: 36px;
      left: 50%;
      transform: translateX(-50%);
      padding: 8px;
      font-size: 12px;
      background-color: #313131;
      border-radius: 12px;
      color: white;
      white-space: nowrap;
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
      opacity: 1;
    }

    ::before {
      content: "";
      position: absolute;
      bottom: 25px;
      left: 32%;
      transform: rotate(180deg);
      border-width: 6px;
      border-style: solid;
      border-color: transparent transparent #313131 transparent;
    }
  }
`;
