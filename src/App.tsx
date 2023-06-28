import { Footer } from "./components/Footer";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./globalStyle/theme";
import { GlobalStyle } from "./globalStyle/GlobalStyle";
import { Route, Routes } from "react-router-dom";
import { Fasion } from "./pages/Fasion";
import { Main } from "./pages/Main";
import { Navigation } from "./components/Navigation";
import { Accessory } from "./pages/Accessory";
import { Digital } from "./pages/Digital";
import { useRecoilState } from "recoil";
import { darkModeAtom } from "./recoil/Atoms";
import { Error } from "./pages/Error";
import { ProductInfo } from "./pages/ProductInfo";
import { Cart } from "./pages/Cart";

function App() {
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Navigation toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/fasion" element={<Fasion />} />
          <Route path="/accessory" element={<Accessory />} />
          <Route path="/digital" element={<Digital />} />
          <Route path="/undefined" element={<Error />} />
          <Route path="/product" element={<ProductInfo />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
