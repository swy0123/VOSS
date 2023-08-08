import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { postRractice } from '/src/api/profile';
import { 
  Accent,
  AllBoard,
  AllCategory, 
  AllSinglePractice, 
  Cartegory_units, 
  Community, 
  Description, 
  Dubbing, 
  Free, 
  Icon, 
  MainImg, 
  Meeting, 
  MeetingEnter, 
  MeetingEnterIcon, 
  Record, 
  Title, 
  Training,
  UnSkew,
  VoiceAnalysis} from './SelectCategory.style';

function SelectCategory () {
  const [TrainIsShown, setTrainIsShown] = useState(false)
  const [MeetIsShown, setMeetIsShown] = useState(false)
  const [CommunityIsShown, setCommunityIsShown] = useState(false)

  // Router Link와 동일한 부분
  const navigate = useNavigate() 

  const goVoiceAnalysis = () => {
    void postRractice("ACT")
    navigate("/analysis")
  }
  const goDubbingList = () => {
    navigate("/dubbinglist")
    window.location.reload()
  }
  const goAccent = () => {
    void postRractice("DICTION")
    navigate("/accent")
  }
  const goFreeBoard = () => {
    navigate("/freeboard")
  }
  const goMeetingBoard = () => {
    navigate("/meeting")
  }
  const goAvatar = () => {
    navigate("/avatar")
  }

  return(
    <div>
      <MainImg>
        <AllCategory>
          
          <Training 
            onMouseEnter={() => setTrainIsShown(true)}
            onMouseLeave={() => setTrainIsShown(false)}
            >
            <Cartegory_units>  
              <Icon src="/src/assets/Category/Training.png"/>
              <Title>Training</Title>
              <Description>더빙 연습, 목소리 나이대 및 성별 분석, 발음교정 연습이 가능한 Private 연습공간</Description>
            </Cartegory_units>
            
            <AllSinglePractice $isShown={TrainIsShown}>
              <VoiceAnalysis onClick={goVoiceAnalysis}><UnSkew>목소리 분석</UnSkew></VoiceAnalysis>
              <Dubbing onClick={goDubbingList}><UnSkew>더빙 연습</UnSkew></Dubbing>
              <Accent onClick={goAccent}><UnSkew>발음 연습</UnSkew></Accent>
            </AllSinglePractice>
          </Training>
        
          <Meeting
            onMouseEnter={() => setMeetIsShown(true)}
            onMouseLeave={() => setMeetIsShown(false)}>
            <Cartegory_units>
              <Icon src="/src/assets/Category/Meeting.png"/>
              <Title>Meeting</Title>
              <Description>다른 유저들과 함께 연습 할 수 있는 Meeting Room</Description>
              <button style={{backgroundColor:"white"}}onClick={goAvatar}>아바타 쿠다사이!!</button>
            </Cartegory_units>
            
            <MeetingEnter $isShown={MeetIsShown}>
            <UnSkew><MeetingEnterIcon src="/src/assets/Category/EnterMeeting.png" onClick={goMeetingBoard}/></UnSkew>
            </MeetingEnter>
          </Meeting>

          <Community
            onMouseEnter={() => setCommunityIsShown(true)}
            onMouseLeave={() => setCommunityIsShown(false)}>
            <Cartegory_units>
              <Icon src="/src/assets/Category/Community.png"/>
              <Title>Community</Title>
              <Description>나만의 연습 방법을 공유하고, 연습 기록을 공유하는 게시판</Description>
            </Cartegory_units>

            <AllBoard $isShown={CommunityIsShown}>
              <Free onClick={goFreeBoard}><UnSkew>자유 게시판</UnSkew></Free>
              <Record><UnSkew>녹음 게시판</UnSkew></Record>
            </AllBoard>
          </Community>

        </AllCategory>
      </MainImg>
    </div>
  )
}

export default SelectCategory