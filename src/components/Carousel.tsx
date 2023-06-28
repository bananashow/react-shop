import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { Shortcuts } from "./Shortcuts";

interface ImageProps {
  imageURL: string;
}
export const Carousel = () => {
  const carouselInfo = [
    {
      src: "https://react-shop-oinochoe.vercel.app/img_shop_fashion.jpeg",
      category: "fasion",
      header: "물빠진 청바지!",
      contents: "이제 막 도착한 패션 청바지를 구경해 보세요.",
    },
    {
      src: "https://react-shop-oinochoe.vercel.app/img_shop_digital.jpeg",
      category: "digital",
      header: "신속한 업무처리!",
      contents: "다양한 디지털 상품을 둘러보세요.",
    },
    {
      src: "https://react-shop-oinochoe.vercel.app/img_shop_grocery.jpeg",
      category: undefined,
      header: "신선한 식품!",
      contents: "농장 직배송으로 더욱 신선한 식료품을 만나보세요.",
    },
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [style, setStyle] = useState({
    transform: `translate(-${currentIdx}00%)`,
  });
  const IMAGE_SIZE = carouselInfo.length;
  const slideRef = useRef<HTMLDivElement>(null);

  const moveSlide = (i: number) => {
    let nextIndex = currentIdx + i;
    if (nextIndex < 0) nextIndex = IMAGE_SIZE - 1;
    else if (nextIndex >= IMAGE_SIZE) nextIndex = 0;
    setCurrentIdx(nextIndex);
  };

  const handleDot = (i: number) => {
    setCurrentIdx(i);
    setStyle({ transform: `translate(-${i}00%)` });
  };

  useEffect(() => {
    setStyle({ transform: `translate(-${currentIdx}00%)` });
  }, [currentIdx]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev === IMAGE_SIZE - 1 ? 0 : prev + 1));
    }, 4000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container>
        <Window ref={slideRef}>
          <Prev role="button" onClick={() => moveSlide(-1)}>
            ◀
          </Prev>
          {carouselInfo.map((item) => (
            <Images imageURL={item.src} key={item.src} style={style}>
              <Shortcuts
                header={item.header}
                contents={item.contents}
                category={item.category}
              />
            </Images>
          ))}
          <Next role="button" onClick={() => moveSlide(1)}>
            ▶
          </Next>
        </Window>
        <DotContainer>
          <DotUl>
            {carouselInfo.map((item, idx) => {
              return (
                <li
                  role="button"
                  onClick={(e) => handleDot(idx)}
                  key={item.src + "_" + idx}
                  className={currentIdx === idx ? "dot-selected" : ""}
                ></li>
              );
            })}
          </DotUl>
        </DotContainer>
      </Container>
    </>
  );
};

const Container = styled.section`
  width: 100%;
  height: 80vh;
  min-height: 200px;
  background-color: white;
  position: relative;

  @media (max-width: 1025px) {
    height: 50vh;
  }

  @media (max-width: 768px) {
    height: 30vh;
  }
`;

const Window = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
`;

const Images = styled.div<ImageProps>`
  background-image: url(${(props) => props.imageURL});
  width: 100%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  flex: none;
  transition: 0.3s;
  color: white;
`;

const Prev = styled.div`
  width: 32px;
  height: 100%;
  color: #c0c0c0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  cursor: pointer;
  transition: 0.3s;
  z-index: 99;

  &:hover {
    background-color: rgba(121, 121, 121, 0.3);
  }
`;

const Next = styled(Prev)`
  left: unset;
  right: 0;
`;

const DotContainer = styled.div`
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DotUl = styled.ul`
  display: flex;
  li {
    border: 5px solid white;
    border-radius: 50%;
    background-color: #ffffff;
    box-shadow: 1px 1px 2px #000000e6;
    opacity: 0.5;
    margin: 8px;
    cursor: pointer;
  }

  .dot-selected {
    opacity: 1;
  }

  @media (max-width: 768px) {
    scale: 0.8;
  }
`;
