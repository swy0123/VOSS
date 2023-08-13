import { useState } from 'react';
import { GameMainContainer } from '../GameMain/GameMain.style';
import {
  GameExplain,
  GameNoticeDiv,
  GameTitle,
  RecordButton,
  RecordExplain,
  RecordBtn,
  StyledDivWithText,
  NextBtn,
  ButtonContainer,
} from './RegistVoice.style';
import GameTitleImg from '/src/assets/Game/GameTitleImg.png';
import StartBtnImg from '/src/assets/Training/restartbtn.png';

const sentence = [
  '(1/10)',
  '(2/10)',
  '(3/10)',
  '(4/10)',
  '(5/10)',
  '(6/10)',
  '(7/10)',
  '(8/10)',
  '(9/10)',
  '(10/10)',
];

const readMessage = [
  '11111111111',
  '2222222222222',
  '33333333333',
  '4444444444444',
  '5555555555555',
  '6666666666666',
  '7777777777777',
  '8888888888888',
  '9999999999999',
  '10101010101010',
];

function RegistVoice() {
  const [ViewRecordVoice, setViewRecordVoice] = useState(true);
  const [CurrentSentenceIndex, setCurrentSentenceIndex] = useState(0);

  const handleRecordButtonClick = () => {
    setViewRecordVoice(false);
  };

  const handleRecorBtnonClick = async () => {
    if (CurrentSentenceIndex < sentence.length - 1) {
      setCurrentSentenceIndex(CurrentSentenceIndex + 1);
    } else {
      setViewRecordVoice(true);
      setCurrentSentenceIndex(0);
    }
  };

  return (
    <GameMainContainer>
      <GameNoticeDiv>
        <GameTitle src={GameTitleImg} />
        {ViewRecordVoice ? (
          <GameExplain>
            내 목소리를 보이스 마피아에 등록해보세요!
            <br />
            등록한 목소리는 인게임에서 랜덤하게 만나볼 수 있습니다.
          </GameExplain>
        ) : (
          <div>
            <RecordExplain>
              녹음 버튼을 누르고
              <br />
              아래 문장을 읽어주세요{sentence[CurrentSentenceIndex]}
            </RecordExplain>
            <StyledDivWithText>
              {readMessage[CurrentSentenceIndex]}
            </StyledDivWithText>
            <ButtonContainer>
              <RecordBtn onClick={handleRecorBtnonClick}>
                <img src={StartBtnImg}></img>
              </RecordBtn>
              <NextBtn onClick={handleRecorBtnonClick}>넘어가기</NextBtn>
            </ButtonContainer>
          </div>
        )}

        {ViewRecordVoice && (
          <RecordButton onClick={handleRecordButtonClick}>
            녹음하기
          </RecordButton>
        )}
      </GameNoticeDiv>
    </GameMainContainer>
  );
}

export default RegistVoice;
