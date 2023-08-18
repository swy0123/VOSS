import { useRecoilState } from "recoil"
import { 
  Container, 
  RoleItem, 
  RoleAndUser, 
  RolesSection, 
  UserName} from "./Role.style"
import { CurrentUserAtom } from "/src/recoil/Auth"
import { recieveMsg, sendMsg } from "/src/recoil/MeetDub";
import { useEffect } from "react";

interface VideoProps {
  roles : string[]
  userSelectRole: string[]; // 해당 부분 추가
  setUserSelectRole: (updatedRoles: string[]) => void;
}

function Role ({ roles, userSelectRole, setUserSelectRole }: VideoProps) {
  const [currentUser, setCurrentUser] = useRecoilState(CurrentUserAtom)
  const [send, setSend] = useRecoilState(sendMsg);
  const [recieve, setRecieve] = useRecoilState(recieveMsg);

  // 역할 선택
  const RoleSelecting = (role_Idx: number) => {
    setSend(`/selectrole${role_Idx}/${currentUser.nickname}`)
  }

  //이벤트 수신 감지
  useEffect(()=>{
    if(recieve.slice(0,11)=="/selectrole") {
      const role_Idx = parseInt(recieve.slice(11,12))
      const nickname = recieve.slice(13)
      const changeSelect = userSelectRole.map((selected,index)=>{

        // 선택 안된 역할
        if (index === role_Idx && !selected){
          const duplication = userSelectRole.filter((selected)=>
              selected===nickname).length
          if (duplication >= 1){return}
          return nickname
        }

        // 선택된 역할
        else if (index === role_Idx && selected === nickname){
          return ""
        }
        else {return selected }
      })
      setUserSelectRole(changeSelect)
      setRecieve("/none");
    }
  }, [recieve])

  return(
    <Container>
      <RolesSection>
        {roles.map((role,role_Idx) => (
          <RoleAndUser key={role_Idx}>
            <RoleItem onClick={() => RoleSelecting(role_Idx)}>{role}</RoleItem>
            <UserName>{userSelectRole[role_Idx]}</UserName>
          </RoleAndUser>
        ))}
      </RolesSection>
    </Container>
  )
}
export default Role
      
      

// const [roleModal, setRoleModal] = useRecoilState(RoleModalState)

// <ModalBtn onClick={openModal}>
//   배역 바꾸기
// </ModalBtn>

// // rocoil로 유저 데이터 받아오기 
// const openModal = () => {
//   setRoleModal(true)
// }