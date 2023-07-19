import { useState } from 'react';
import styled from 'styled-components';

const BackGroundImage = styled.div`
  background: url("/src/assets/background.jpg") no-repeat;
  background-size: cover;
  background-position: center center;
  height: 100vh;
  width: 100vw;
`;

const AllCategory = styled.div`
  display: flex;
  margin-left: 6.5vw;
  transform: skew(-2.9deg);

`;

const Category = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #242424;
  opacity: 80%;
  height: 100vh;
  width: 29vw;

  &:hover {
    background-color: #132B31;
  }
`;

const Training = styled(Category)``
const Meeting = styled(Category)``
const Community = styled(Category)``

// Icon, Title, Description 감싸는 div
const Cartegory_units = styled.div`
  margin: 35vh 30px 43px 30px;
  height: 27vh;
`

const Icon = styled.img`
  height: 40px;
  width: 40px;
`;

const Title = styled.h1`
  color: white;
  font-family: 'Inter', sans-serif;
  font-style: normal;
`;

const Description = styled.div`
  color: white;
  font-family: 'Inter', sans-serif;
  font-style: normal;
`

const AllSinglePractice = styled.div<{$isShown:boolean}>`
  height: 200px;
  visibility: ${props => props.$isShown ? "visible":"hidden"};
`

const SinglePractice = styled.div`
  background-color: #EFEFEF;
  border-radius: 3px;
  margin : 10px 30px 20px 30px;
  height: 18%;
  width: 80%;
  text-align: center;
  line-height: 38px;
  font-weight: bold;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  transform: skew(-7deg);
  transition: skew(-7deg);

  &:hover {
    background-color: #af000f;
  }
`

const VoiceAnalysis = styled(SinglePractice)``
const Dubbing = styled(SinglePractice)``
const Accent = styled(SinglePractice)``

const MeetingEnter = styled.div<{$isShown:boolean}>`
  display: flex;
  justify-content: flex-end;
  height: 200px;
  visibility: ${props => props.$isShown ? "visible":"hidden"};

`

const MeetingEnterIcon = styled.img`
  height: 30px;
  width: 50px;
  margin-right: 30px;
  
  &:hover {
    transform: scale(1.3);
    transition: .5s;
  }
`

const AllBoard = styled.div<{$isShown:boolean}>`
  height: 200px;
  visibility: ${props => props.$isShown ? "visible":"hidden"};
`;

const Board = styled(SinglePractice)``;

const Free = styled(Board)``
const Record = styled(Board)``

function SelectCategory () {
  const [TrainIsShown, setTrainIsShown] = useState(false)
  const [MeetIsShown, setMeetIsShown] = useState(false)
  const [CommunityIsShown, setCommunityIsShown] = useState(false)

  return(
    <div>
      <BackGroundImage>
        <AllCategory>
          <Training 
            onMouseEnter={() => setTrainIsShown(true)}
            onMouseLeave={() => setTrainIsShown(false)}
            >
            <Cartegory_units>  
              <Icon src="/src/assets/Training.png"/>
              <Title>Training</Title>
              <Description>더빙 연습, 목소리 나이대 및 성별 분석, 발음교정 연습이 가능한 Private 연습공간</Description>
            </Cartegory_units>
            
            <AllSinglePractice $isShown={TrainIsShown}>
              <VoiceAnalysis>목소리 분석</VoiceAnalysis>
              <Dubbing>더빙 연습</Dubbing>
              <Accent>발음 연습</Accent>
            </AllSinglePractice>
          </Training>
        
          <Meeting
            onMouseEnter={() => setMeetIsShown(true)}
            onMouseLeave={() => setMeetIsShown(false)}>
            <Cartegory_units>
              <Icon src="/src/assets/Meeting.png"/>
              <Title>Meeting</Title>
              <Description>다른 유저들과 함께 연습 할 수 있는 Meeting Room</Description>
            </Cartegory_units>
            
            <MeetingEnter $isShown={MeetIsShown}>
              <MeetingEnterIcon src="/src/assets/EnterMeeting.png"/>
            </MeetingEnter>
          </Meeting>

          <Community
            onMouseEnter={() => setCommunityIsShown(true)}
            onMouseLeave={() => setCommunityIsShown(false)}>
            <Cartegory_units>
              <Icon src="/src/assets/Community.png"/>
              <Title>Community</Title>
              <Description>나만의 연습 방법을 공유하고, 연습 기록을 공유하는 게시판</Description>
            </Cartegory_units>

            <AllBoard $isShown={CommunityIsShown}>
              <Free>자유 게시판</Free>
              <Record>녹음 게시판</Record>
            </AllBoard>
          </Community>
        </AllCategory>
      </BackGroundImage>
    </div>
  )
}

export default SelectCategory