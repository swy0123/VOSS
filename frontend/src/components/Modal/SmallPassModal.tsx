import styled from "styled-components";

const BackDrop = styled.div`
  width: 100;
  height: 100;
  background-color: rgba(1, 1, 1, 0,1);
`


function SmallPassModal() {
  return (
    <BackDrop></BackDrop>
  );
}

export default SmallPassModal;
