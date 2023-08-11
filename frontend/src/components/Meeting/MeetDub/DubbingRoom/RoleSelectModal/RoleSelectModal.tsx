import { useState } from "react";
import { useRecoilState } from "recoil"

// 리코일
import { 
  RoleModalState, 
  userSelectRoleState } from "/src/recoil/HW_Atom"
import { 
  BtnSection, 
  CloseBtn, 
  Container, 
  RoleItem, 
  RoleAndUser, 
  SaveBtn, 
  UserSelect,
  UserNanme} from "./RoleSelectModal.style";

interface VideoProps {
  roles : string[]
}

function RoleSelectModal ({roles}: VideoProps) {
  const userInfo = ["김준섭","정현우","이원영","이시영","이승종","김수연"]
  const [roleModal, setRoleModal] = useRecoilState(RoleModalState)
  const [selectTmp, setSelectTmp] = useState<string[]>(Array(userInfo.length).fill("선택해"))
  const [userSelectRole, setUserSelectRole] = useRecoilState<string[]>(userSelectRoleState)
  
  const closeModal = () => {
    setRoleModal(false);
  };
  
  const userSelecting = (event: Event | undefined,role_Idx: number) => {
    const changeSelect = selectTmp.map((selected,index)=> {
      if (index === role_Idx){
        return event?.target.value
      }
      else {return selected}
    })
    console.log(changeSelect)
    setSelectTmp(changeSelect)
  }

  const userSelectSave = () => {
    for (let i = 0; i < selectTmp.length; i++) {
      if (selectTmp[i]=="선택해") {
        alert("역할을 선택해 주세요")
        return
      }
      else if (selectTmp.indexOf(selectTmp[i]) !== i) {
        alert("역할이 중복됐어요")
        return
      }
    }
    setUserSelectRole(selectTmp)
  }
  return (
    <Container>

      {roles.map((role,role_Idx) => (
        <RoleAndUser key={role_Idx}>
          <RoleItem>{role}</RoleItem>

          <UserSelect 
            name="user"
            onChange={()=>userSelecting(event,role_Idx)}>
            <UserNanme value="">선택</UserNanme>
            {userInfo.map((user,user_idx) => (
              <UserNanme
                key={user_idx}
                value={user}>{user}</UserNanme>
            ))}
          </UserSelect>

        </RoleAndUser>
      ))}

      <BtnSection>
        <CloseBtn 
          onClick={closeModal}>취소</CloseBtn>
        <SaveBtn 
          onClick={() => {
            closeModal()
            userSelectSave()}}>저장</SaveBtn>
      </BtnSection>
    
    </Container>
  )
}
export default RoleSelectModal