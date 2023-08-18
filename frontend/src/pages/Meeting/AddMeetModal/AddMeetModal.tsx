import React, { PropsWithChildren, useState, ChangeEvent, useEffect, useContext } from "react";
import styled from "styled-components";
import ExitBox from "/src/assets/Messenger/ExitBox.png";
import ExitBoxHover from "/src/assets/Messenger/ExitBoxHover.png";
import ProfileImg from "../../assets/Messenger/profile.png";
import SendArrow from "../../assets/Messenger/SendArrow.png";
import { MeetingProps, createMeet, joinMeet } from "../../../api/meeting";
import { useNavigate } from "react-router-dom";
import {
  Backdrop,
  CategoryDiv,
  Checkbox,
  DialogBox,
  FlexDiv,
  HalfInDiv,
  Input,
  ModalContainer,
  Span,
  TagButton,
  Title,
  TmpBorder,
  TmpButton,
} from "./AddMeetModal.style";
import AlertContext from "/src/context/alert/AlertContext";

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

const AddMeetModal = ({ onClickToggleModal, children }: PropsWithChildren<ModalDefaultType>) => {
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setCheckBox] = useState(false);
  const [limit, setLimit] = useState(2);
  const TagName = ["더빙 연습", "기타"];
  const [selectedTag, setTag] = useState<boolean[]>([true, false, false]);
  const [selectedCategory, setCategory] = useState("DUB");
  const Category = ["DUB", "FREE"];
  const [exitBtnHover, setExitBtnHover] = useState(false);

  const { alert: alertComp } = useContext(AlertContext);
  const onAlertClick = async (text: string) => {
    const result = await alertComp(text);
    console.log("custom", result);
  };

  const navigate = useNavigate();
  //서버와 통신해서 해당 사용자의 친구목록 전부 표시 (이후 전역에 저장해 관리)
  //FriendsList
  useEffect(() => {}, []);

  const handleTagButton = (index: number) => {
    const newTagList = Array(TagName.length).fill(false);
    newTagList[index] = !newTagList[index];
    setCategory(Category[index]);
    setTag(newTagList);
  };

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const changeCheck = () => {
    setCheckBox(!isChecked);
    if (!isChecked) setPassword("");
  };
  const limitIncrease = () => {
    if (limit < 6) setLimit(limit + 1);
  };
  const limitDecrease = () => {
    if (limit > 2) setLimit(limit - 1);
  };

  
  const onClickOpenNewMeetRoom = async () => {
    const addRoomData = {
      title: title,
      maxCount: limit,
      password: password,
      category: selectedCategory,
    };
    console.log("title : " + title + ", password : " + password + ", limit : " + limit);
    console.log(", isChecked : " + isChecked + ", selectedTag : " + selectedTag);

    const meetRoomId = await createMeet({ addRoomData });
    console.log("방 생성 후 참가 시도");
    joinMeetingRoom(meetRoomId, password);
  };

  const joinMeetingRoom = async (meetRoomId: number, password: string) => {
    console.log("meetRoomId : " + meetRoomId + ", password : " + password + " 이동");
    try {
      const roomData = await getToken(password, meetRoomId);
      console.log(roomData);
      navigate(`/meeting/join`, {
        state: { password: password, meetRoomId: meetRoomId, roomData: roomData, category: selectedCategory},
      });
    } catch {
      console.log("joinMeetingRoom error");
    }
  };

  const getToken = async (password: string, meetRoomId: number) => {
    const props: MeetingProps = {
      password: password,
      meetRoomId: meetRoomId,
    };
    const res = await joinMeet(props);
    // setToken(res.token);
    if (res.message !== undefined) onAlertClick(res.message);
    // else onAlertClick(res);
    console.log(res);
    return res;
  };

  return (
    <ModalContainer>
      <DialogBox>
        <div>
          <Title>방만들기</Title>
          {/* <ExitImg
            src={exitBtnHover ? ExitBoxHover : ExitBox}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              if (onClickToggleModal) {
                onClickToggleModal();
              }
            }}
            onMouseEnter={() => setExitBtnHover(true)}
            onMouseLeave={() => setExitBtnHover(false)}
          /> */}
          <Span>카테고리</Span>
          <CategoryDiv>
            {TagName.map((data, index) => (
              <TagButton
                key={index}
                $IsClick={selectedTag[index]}
                onClick={() => handleTagButton(index)}
              >
                {data}
              </TagButton>
            ))}
          </CategoryDiv>

          <form>
            <Span>제목</Span>
            <Input className="input" type="text" onChange={handleTitle} value={title}></Input>

            <div>
              <Span>
                비밀번호
                <Checkbox type="checkbox" onClick={changeCheck} />
              </Span>
              <Span style={{ marginLeft: "48%" }}>인원</Span>
            </div>

            <FlexDiv>
              <HalfInDiv>
                {isChecked ? (
                  <Input
                    className="input"
                    type="text"
                    onChange={handlePassword}
                    value={password}
                  ></Input>
                ) : (
                  <Input
                    className="input"
                    type="text"
                    onChange={handlePassword}
                    value={password}
                    disabled
                    style={{ visibility: "hidden" }}
                  ></Input>
                )}
              </HalfInDiv>

              <HalfInDiv>
                <TmpBorder
                  style={{ border: "0px", cursor: "pointer", fontWeight: "bold" }}
                  onClick={limitDecrease}
                >
                  ━
                </TmpBorder>
                <TmpBorder>{limit}</TmpBorder>
                <TmpBorder
                  style={{ border: "0px", cursor: "pointer", fontWeight: "bold" }}
                  onClick={limitIncrease}
                >
                  ┼
                </TmpBorder>
              </HalfInDiv>
            </FlexDiv>
          </form>

          <FlexDiv style={{ justifyContent: "center" }}>
            <TmpButton onClick={onClickToggleModal}>취소</TmpButton>
            <TmpButton onClick={onClickOpenNewMeetRoom}>확인</TmpButton>
          </FlexDiv>
        </div>
      </DialogBox>
      <Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </ModalContainer>
  );
};
export default AddMeetModal;
