import { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
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
  VoiceAnalysis,
} from './SelectCategory.style';
import Header from '/src/components/SelectCategotyHeader/Header';

function SelectCategory() {
  const [TrainIsShown, setTrainIsShown] = useState(false);
  const [MeetIsShown, setMeetIsShown] = useState(false);
  const [CommunityIsShown, setCommunityIsShown] = useState(false);
  const [, setMicrophonePermission] = useState<boolean | null>(null);
  const [, setCameraPermission] = useState<boolean | null>(null);

  // Router Link와 동일한 부분
  const navigate = useNavigate();

  const goVoiceAnalysis = () => {
    void postRractice('ACT');
    navigate('/analysis');
  };
  const goDubbingList = () => {
    navigate('/dubbinglist');
    window.location.reload();
  };
  const goAccent = () => {
    void postRractice('DICTION');
    navigate('/accent');
  };
  const goFreeBoard = () => {
    navigate('/freeboard');
  };
  const goMeetingBoard = () => {
    navigate('/meeting');
  };
  const goGame = () => {
    navigate('/game');
  };
  const goRecordBoard = () => {
    navigate("/recordboard")
  };

  useEffect(() => {
    async function requestMediaPermissions() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });

        setMicrophonePermission(true);
        setCameraPermission(true);

        stream.getTracks().forEach((track) => track.stop());
      } catch (error) {
        setMicrophonePermission(false);
        setCameraPermission(false);
      }
    }

    requestMediaPermissions();
  }, []);

  return (
    <div>
      <MainImg>
        <Header />
        <AllCategory>
          <Training
            onMouseEnter={() => setTrainIsShown(true)}
            onMouseLeave={() => setTrainIsShown(false)}
          >
            <Cartegory_units>
              <Icon src="/src/assets/Category/Training.png" />
              <Title>Training</Title>
              <Description>
                더빙 연습, 목소리 연령 및 성별 분석, 발음 교정 연습이 가능한 개인 연습 공간
              </Description>
            </Cartegory_units>

            <AllSinglePractice $isShown={TrainIsShown}>
              <VoiceAnalysis onClick={goVoiceAnalysis}>
                <UnSkew>목소리 분석</UnSkew>
              </VoiceAnalysis>
              <Dubbing onClick={goDubbingList}>
                <UnSkew>더빙 연습</UnSkew>
              </Dubbing>
              <Accent onClick={goAccent}>
                <UnSkew>발음 연습</UnSkew>
              </Accent>
            </AllSinglePractice>
          </Training>

          <Meeting
            onClick={goMeetingBoard}
            onMouseEnter={() => setMeetIsShown(true)}
            onMouseLeave={() => setMeetIsShown(false)}
          >
            <Cartegory_units>
              <Icon src="/src/assets/Category/Meeting.png" />
              <Title>Meeting</Title>
              <Description>
                다른 유저들과 함께 더빙 연습을 할 수 있는 화상 공간
              </Description>
            </Cartegory_units>

            <MeetingEnter $isShown={MeetIsShown}>
              <UnSkew>
                <MeetingEnterIcon
                  src="/src/assets/Category/EnterMeeting.png"
                  onClick={goMeetingBoard}
                />
              </UnSkew>
            </MeetingEnter>
          </Meeting>

          <Community
            onMouseEnter={() => setCommunityIsShown(true)}
            onMouseLeave={() => setCommunityIsShown(false)}
          >
            <Cartegory_units>
              <Icon src="/src/assets/Category/Community.png" />
              <Title>Playground</Title>
              <Description>
                다른 유저들과 자유롭게 정보를 공유하고 소통하거나 게임을 즐길 수 있는 공간
              </Description>
            </Cartegory_units>

            <AllBoard $isShown={CommunityIsShown}>
              <Free onClick={goFreeBoard}>
                <UnSkew>자유 게시판</UnSkew>
              </Free>
              <Record>
                <UnSkew onClick={goRecordBoard}>녹음 게시판</UnSkew>
              </Record>
              <Free onClick={goGame}>
                <UnSkew>목소리 마피아</UnSkew>
              </Free>
            </AllBoard>
          </Community>
        </AllCategory>
      </MainImg>
    </div>
  );
}

export default SelectCategory;
