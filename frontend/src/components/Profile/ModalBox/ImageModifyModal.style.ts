import styled, { css } from "styled-components";

type Gender = "man" | "woman";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;


export const ModalContent = styled.div`
  display:flex;
  flex-direction: column;
  width: 25rem;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;

  .image-options {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .tabs-component [role="tablist"] {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border-bottom: 1px solid #dee2e6;
    position: relative;
  }
  
  .tabs-component [role="tablist"] button {
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: flex;
    padding: 0.5rem 1rem;
    cursor: pointer;
    margin: 0 1px;
    outline: none;
    background-color: #fff;
    transition: border 0.2s ease-in-out 0s;
  }
  
  .tabs-component [role="tablist"] button.active,
  .tabs-component [role="tablist"] button:focus,
  .tabs-component [role="tablist"] button:hover {
    border-width: 1px;
    border-color: #e9ecef #e9ecef #6b6b6b;
  }
  
  .tabs-component [role="tablist"] button.active {
    color: #495057;
    background-color: #f8f8f8;
  }
  
  .tabs-component [role="tabpanel"] {
    text-align: left;
    padding: 1rem;
    background-color: #f8f8f8;
    box-shadow: 1px 1px 2px rgb(204 204 204 / 75%);
  }
  
  .tabs-component.vertical {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
  }
  
  .tabs-component.vertical [role="tablist"] {
    flex-direction: column;
  }
  
  .tabs-component.vertical [role="tabpanel"] {
    flex: 1;
  }
  
  .tabs-component [role="tablist"] button {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    margin: 0;
  }
  
  .tabs-component.vertical [role="tablist"] button.active,
  .tabs-component.vertical [role="tablist"] button:focus,
  .tabs-component.vertical [role="tablist"] button:hover {
    border-color: #e9ecef transparent #e9ecef #767875;
  }
`;

export const ToggleButton = styled.button<{ gender: Gender }>`
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 14px;

  ${(props) =>
    props.gender === "man"
      ? css`
          background-color: #53b594;

          &:hover {
            background-color: #388f72;
          }
        `
      : css`
          background-color: #c271d9;

          &:hover {
            background-color: #aa55c2;
          }
        `}
`;


export const CompleteButton = styled.button`
  background-color: transparent;
  color: black;
  border: 1px solid #999;
  font-size: 16px;
  padding: 5px 14px;
  border-radius: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:hover {
    background-color: #666;
    color: white;
    border-color: #666;
  }
`;

export const CancelButton = styled.button`
  background-color: transparent;
  color: #AAAAAA;
  border: 1px solid #AAAAAA;
  font-size: 16px;
  padding: 5px 14px;
  border-radius: 20px;
  margin-top: 20px;
  margin-right: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:hover {
    background-color: #ccc;
    color: white;
    border-color: #ccc;
  }
`;



