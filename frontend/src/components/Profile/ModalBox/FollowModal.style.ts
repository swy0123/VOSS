import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  `;

export const ModalContent = styled.div`
  /* border: solid 2px red; */
  background-color: white;
  padding: 5px 0;
  border-radius: 8px;
  width: 30%;
  height: 70%;
  overflow-y: auto;
  scrollbar-width: 1vw;
  position: relative;
  
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);

  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
  `;

export const ModalUser = styled.div`
  /* border: solid 2px orange; */
  display: flex;
  align-items: center;
  margin: 0 3px;
  height: 4vh;
  font-weight: bold;
  font-size: 1.3vw;
  background-color: white;
  padding: 1vw 0.7vw;
  
  img {
    height: 3vh;
  }
`;

export const TabContainer = styled.div`
  /* border: solid 2px green; */
  border-bottom: solid 1px #132B31;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  `;


interface TabProps {
  active: boolean;
}
export const Tab = styled.div<TabProps>`
  padding: 10px;
  width: 50%;
  text-align: center;
  font-size: 1.1vw;
  cursor: pointer;
  border-bottom: ${({ active }) => (active ? '2px solid #132B31' : 'none')};
  font-weight: ${({ active }) => (active ? 'bold' : 'none')};
  `;