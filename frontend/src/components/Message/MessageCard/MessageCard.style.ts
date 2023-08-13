import { styled } from "styled-components";

export const MessageCardDiv = styled.div`
  width: 95%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  /* border: solid 1px red; */
  &:hover {
    background-color: #efefef;
  }
`;

export const MessageTitle = styled.div`
  font-size: 15px;
  margin: 3%;
`;

export const MessageChecked = styled.img`
  float: right;
  margin: 5px;
  width: 8px;
`;