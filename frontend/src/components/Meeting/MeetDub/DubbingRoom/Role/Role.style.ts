import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 550px;

`

export const RolesSection = styled.div`
  display: flex;
  flex-wrap : wrap;
  width: 550px;
  margin-top: 5px;
`

export const RoleAndUser = styled.div`
  display : flex;
  align-items: center;
  margin-right: 10px;
`

export const RoleItem = styled.button`
  background-color: transparent;
  border-radius: 15px;
  border: 1px solid white;
  width: 95px;
  height: 34px;
  color: white;
  font-size: 15px;
  text-align: center;
  line-height: 34px;
  margin: 0px 10px 9px 10px;
  cursor: pointer;
  
`

export const UserName = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  font-size: 14px;
  text-align: center;
  line-height: 27px;
  color: white;
  height: 27px;
  width: 150px;
  margin: 0px 0px 9px 0px;
`

export const ModalBtn = styled.button`
  background-color: rgba(34, 80, 91, 0.7);
  border-radius: 15px;
  border: none;
  font-size: 16px;
  color: white;
  height: 40px;
  width: 100px;
  cursor: pointer;
`