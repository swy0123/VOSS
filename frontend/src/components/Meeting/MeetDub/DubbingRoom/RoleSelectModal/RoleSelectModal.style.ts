import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(0,0,0,0.6);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  position: absolute;
  width: 250px;
  z-index: 999;
  top: 58%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px 0px 10px 0px;
` 

export const RoleAndUser = styled.div`
  display : flex;
  align-items: center;
`

export const RoleItem = styled.div`
  background-color: transparent;
  border-radius: 15px;
  border: 1px solid white;
  width: 70px;
  height: 34px;
  color: white;
  font-size: 17px;
  text-align: center;
  line-height: 34px;
  margin: 0px 10px 9px 10px;
`

export const UserSelect = styled.select`
  background-color: #313131;
  border: none;
  border-radius: 10px;
  font-size: 11px;
  line-height: 28px;
  color: white;
  height: 28px;
  width: 80px;
  margin: 0px 0px 9px 0px;
  padding-left: 5px;

  &:focus{
    border-color: white;
  }
`

export const UserNanme = styled.option`
  font-size: 11px;
  border: none;
  &[value=""] {
      display: none;
    }
  
`

export const BtnSection = styled.div`
  display: flex;
`

export const Button = styled.button`
  background-color: transparent;
  border: 1px solid white;
  border-radius: 20px;
  margin: 10px 5px 10px 5px;
  font-size: 12px;
  color: white;
  width: 54px;
  height: 30px;
  cursor: pointer;

  &:hover {
    background-color: white;
    font-weight: 800;
    color: black;
  }
` 

export const CloseBtn = styled(Button)``
export const SaveBtn = styled(Button)``