import styled from "styled-components";

const BackDrop = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: rgba(1, 1, 1, 0.2);
  border: solid 5px yellow;
  `;

const ModalContainer = styled.div`
  display: flex;
  margin: auto;
  padding: 30px 50px;
  width: 300px;
  height: 190px;
  border-radius: 10px;
  background-color: white;
  `;

const ModalImage = styled.div`
  width: 350px;
  height: 50px;
  background-color: white;
  border: solid 2px red;
`;


function SmallWarningModal() {
  return (
    <BackDrop>
    <ModalContainer>

    <ModalImage>

    </ModalImage>

    </ModalContainer>
    </BackDrop>
  );
}

export default SmallWarningModal;
