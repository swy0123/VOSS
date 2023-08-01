import { styled } from "styled-components";

const Count = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -35%);
  width: 6.5vw;
  height: 6.5vw;
  border: solid 2px black;
  border-radius: 50%;
  background-color: white;
  z-index: 100;
`;

function DoughnutCount() {
  return (
    <Count></Count>
  );
};

export default DoughnutCount;