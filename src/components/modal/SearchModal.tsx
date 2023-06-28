import styled from "styled-components";
import { darkModeAtom, searchAtom } from "../../recoil/Atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { searchData } from "../../recoil/FetchSelector";
import { useNavigate } from "react-router-dom";

interface MapType {
  id: number;
  title: string;
}

export const SearchModal = () => {
  const isDarkMode = useRecoilValue(darkModeAtom);
  const searchList = useRecoilValue(searchData);
  const navigation = useNavigate();
  const setSearchText = useSetRecoilState(searchAtom);

  const handleItemClick = (item: MapType) => {
    setSearchText("");
    navigation("/product", {
      state: {
        item: item,
      },
    });
  };

  return (
    <>
      {searchList.length !== 0 && (
        <Modal isDarkMode={isDarkMode}>
          <ItemList isDarkMode={isDarkMode}>
            {searchList.map((item: MapType) => {
              return (
                <li key={item.id} onClick={() => handleItemClick(item)}>
                  {item.title}
                </li>
              );
            })}
          </ItemList>
        </Modal>
      )}
    </>
  );
};

const Modal = styled.section<{ isDarkMode: boolean }>`
  position: absolute;
  background-color: ${(props) => (props.isDarkMode ? "#52545a" : "white")};
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  width: 227px;
  max-height: 400px;
  right: 174px;
  top: 62px;
  overflow: auto;

  /* 스크롤바 설정*/
  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
    border: 7px solid rgba(68, 78, 110, 0.5);
  }
  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const ItemList = styled.ul<{ isDarkMode: boolean }>`
  width: 100%;
  height: 80%;

  li {
    border-top: 1px solid #a9b2be;
    padding: 12px;
    cursor: pointer;
    :hover {
      background-color: ${(props) =>
        props.isDarkMode ? "#1d2027" : "#bfc5d3"};
    }
  }
`;
