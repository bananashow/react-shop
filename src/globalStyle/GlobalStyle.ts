import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}  
  body {        
    background-color: ${({ theme }) => theme.bgColor};
    color:${({ theme }) => theme.textColor};
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
    a:link,a:visited  {
     color: inherit;
     text-decoration: none;
    }
  }  
`;
