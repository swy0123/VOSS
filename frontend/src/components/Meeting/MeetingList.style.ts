import { styled } from "styled-components";

export const ListBox = styled.div`
  height: 90%;
`;

export const MeetingRoom = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  height: 25%;
  background-color: #efefef;
  border-style: solid;
  border-radius: 10px;
  padding: 10px 15px 0px 15px;
  float: left;

  &:hover{
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

export const Category = styled.p`
  font-size: 11px;
  margin: 0px;
`
export const Title = styled.p`
  font-size: 20px;
  font-weight: 800;
  margin: 0px;
`
export const CountSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
`
export const Count = styled.p`
  font-size: 10px;
  margin: 0px;
`
export const CountImg = styled.img`
  height: 18px;
  width: 18px;
  margin-left: 8px;
`
