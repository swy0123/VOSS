import { useState } from 'react';
import { GameMainContainer } from '../GameMain/GameMain.style';
import { useReactMediaRecorder } from 'react-media-recorder';
import quotes  from './ReadSentence';
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
  RecordContainer,
  RegistBtn
} from './RegistVoice.style';
import GameTitleImg from '/src/assets/Game/GameTitleImg.png';
import StartBtnImg from '/src/assets/Training/restartbtn.png';
import StopBtnImg from '/src/assets/Training/stopbtn.png'
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


function RegistVoice() {
  const [readMessage, setReadMessage] = useState<string[]>([]);

  const handleRandomQuotes = () => {
    const selectedQuotes: string[] = [];
    while (selectedQuotes.length < 10) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomIndex];
  
      if (!selectedQuotes.includes(randomQuote)) {
        selectedQuotes.push(randomQuote);
      }
    }
    setReadMessage(selectedQuotes);
  };

  const { 
    startRecording, 
    stopRecording, 
    clearBlobUrl,
    mediaBlobUrl } = useReactMediaRecorder({ audio: true });
  const [ViewRecordVoice, setViewRecordVoice] = useState(true);
  const [CurrentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const recordBtnToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
    setIsRecording(!isRecording);
  };

  const handleRecordButtonClick = () => {
    setViewRecordVoice(false);
  };

  const handleRecorBtnonClick = async () => {
    if (CurrentSentenceIndex < sentence.length - 1) {
      startRecording();
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
          <RecordContainer>
            <RecordExplain>
              녹음 버튼을 누르고
              <br />
              아래 문장을 읽어주세요{sentence[CurrentSentenceIndex]}
            </RecordExplain>
            <StyledDivWithText>
              {readMessage[CurrentSentenceIndex]}
            </StyledDivWithText>
            <audio
              controls
              src={mediaBlobUrl}
              style={{
                width: "300px",
              }}
            />
            <ButtonContainer>
              <RegistBtn>등록하기</RegistBtn>
              <RecordBtn onClick={() => {recordBtnToggle(), clearBlobUrl()}}>
                {!isRecording ? (
                  <img src={StartBtnImg} style={{
                    width: '100px'
                  }} />
                ) : (
                  <img src={StopBtnImg} style={{
                    width: '100px'
                  }}/>
                )}
              </RecordBtn>
              <NextBtn onClick={!isRecording ? () => {handleRecorBtnonClick(), clearBlobUrl()} : undefined}>넘어가기</NextBtn>
            </ButtonContainer>
          </RecordContainer>
        )}

        {ViewRecordVoice && (
          <RecordButton
            onClick={() => {
              handleRecordButtonClick(), handleRandomQuotes();
            }}
          >
            녹음하기
          </RecordButton>
        )}
      </GameNoticeDiv>
    </GameMainContainer>
  );
}

export default RegistVoice;
