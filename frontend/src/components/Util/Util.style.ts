import { styled } from "styled-components";

//배경 클릭 시 나와야 되나?

export const DialogContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  z-index: 100;

  .overlay {
    width: 100%;
    height: 100%;
  }

  .dialog {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, 0);

    width: 400px;
    padding: 20px;
    border-radius: 8px;
    background-color: white;
    /* background-color: rgba(0, 0, 0, 0.8); */
    /* backdrop-filter: blur(5px); */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

    .title {
      margin: 0 0 20px 0;
    }

    .input {
      width: 100%;
      padding: 10px;
      border-radius: 8px;
      border: 2px solid #ccc;
      font-size: 1em;
      font-family: inherit;
      box-sizing: border-box;
      margin-top: 10px;
    }

    .buttons {
      margin-top: 20px;
      float: right;
    }

    .buttons button {
      border: 1px solid #6c6c6c;  
      background-color: white;
      color: #6c6c6c;
      text-transform: uppercase;
      transition: all 0.2s;
      font-weight: bold;
      margin: 0 5px;
      width: 70px;
      height: 28px;
      cursor: pointer;
    }

    .buttons button:hover {
      
      background-color: #6c6c6c;
      color: white;
      border: 1px solid #6c6c6c;
    }

    .buttons button:focus {
      border: 1px solid #6c6c6c;
      border-radius: 4px;  
    }
  }
`;
