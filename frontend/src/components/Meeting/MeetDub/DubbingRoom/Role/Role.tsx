import { Line } from "/src/type/type"
import { useRecoilState } from "recoil"
import { RoleModalState, userSelectRoleState } from "/src/recoil/HW_Atom"
import { 
  Container, 
  ModalBtn, 
  RoleItem, 
  RoleAndUser, 
  RolesSection, 
  UserName} from "./Role.style"

interface VideoProps {
  roles : string[]
}

function Role ({roles}: VideoProps) {
  const [roleModal, setRoleModal] = useRecoilState(RoleModalState)
  const [userSelectRole, setUserSelectRole] = useRecoilState<string[]>(userSelectRoleState)

  // rocoil로 유저 데이터 받아오기 
  const openModal = () => {
    setRoleModal(true)
  }

  return(
    <Container>
      <RolesSection>
        {roles.map((role,index) => (
          <RoleAndUser key={index}>
            <RoleItem>{role}</RoleItem>
            <UserName>{userSelectRole[index]}</UserName>
          </RoleAndUser>
        ))}
      </RolesSection>
      <ModalBtn onClick={openModal}>
        배역 바꾸기
      </ModalBtn>
    </Container>
  )
}
export default Role