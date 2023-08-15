import { styled } from "styled-components";

export const MeetingListDiv = styled.div`
  height: 100%;
`;
export const ListBox = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: start;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`;

export const MeetingRoom = styled.div<{ $IsOnAir: boolean }>`
  position: relative;
  width: 48%;
  height: 18%;
  background-color: ${(props) => (props.$IsOnAir ? "#ABABAB" : "#efefef")};
  /* border-style: solid; */
  border-radius: 10px;
  margin-left: 1%;
  margin-bottom: 1%;
  cursor: ${(props) => (props.$IsOnAir ? "" : "pointer")};
  pointer-events: ${(props) => (props.$IsOnAir ? "none" : "")};

  &:hover {
    ${(props) =>
      props.$IsOnAir
        ? ""
        : "box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;"}
  }
`;

export const Category = styled.p`
  font-size: 11px;
  margin: 0px;
  position: absolute;
  top: 10%;
  left: 5%;
`;
export const Title = styled.p`
  font-size: 20px;
  font-weight: 800;
  position: absolute;
  left: 5%;
  top: 50%;
  transform: translate(0, -125%);
`;
export const CountSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  right: 5%;
  bottom: 10%;
  /* transform: translate(0, 0%); */
`;

export const Count = styled.p`
  font-size: 10px;
  margin: 0px;
`;

export const LockImg = styled.img`
  height: 17px;
  width: 17px;
  margin-right: 10%;
`;

export const OnAirImg = styled.img`
  height: 20px;
  width: 50px;
  margin-right: 5%;
`;

export const CountImg = styled.img`
  height: 17px;
  width: 17px;
  margin-left: 10%;
`;

export const PagingDiv = styled.div`
  margin-top: 20px;
`;

export const PageMoveBtnImg = styled.img`
  height: 17px;
  width: 17px;
  margin: 10px;
  cursor: pointer;
  &:hover {
    filter: drop-shadow(1px 1px 1px white);
  }
`;

export const PaginationWrapper = styled.ul`
  width: fit-content;
  display: flex;
  list-style: none;
  /* justify-content: center; */
  align-items: center;
  color: white;
  margin: 0 auto;
  padding: 0;
  position: relative;
  left: -1%;
`;
