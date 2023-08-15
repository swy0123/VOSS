import { useState, useContext } from 'react';
import { GameMainContainer } from '../GameMain/GameMain.style';
import { useReactMediaRecorder } from 'react-media-recorder';
import { useNavigate } from 'react-router-dom';
import quotes from './ReadSentence';
import { registVoiceFile } from '/src/api/game';
import AlertContext from '/src/context/alert/AlertContext';
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
  RegistBtn,
  FinishExplain,
  FinishBtn,
  Waves,
} from './RegistVoice.style';
import GameTitleImg from '/src/assets/Game/GameTitleImg.png';
import StartBtnImg from '/src/assets/Training/restartbtn.png';
import StopBtnImg from '/src/assets/Training/stopbtn.png';

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

export interface GameMainProps {
  SetPageMain: () => void;
}

function RegistVoice(props:GameMainProps) {
  const navigate = useNavigate();
  const goGame = () => {
    navigate('/game');
    location.reload();
  };
  const [readMessage, setReadMessage] = useState<string[]>([]);
  const { alert: alertComp } = useContext(AlertContext);

  const onAlertClick = async (text: string) => {
    const result = await alertComp(text);
    console.log('custom', result);
  };
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

  const { startRecording, stopRecording, clearBlobUrl, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });
  const [ViewRecordVoice, setViewRecordVoice] = useState(true);
  const [CurrentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [blob, setBlob] = useState<string>('');

  const recordBtnToggle = () => {
    if (isRecording) {
      stopRecording();
      setIsShown(true);
    } else {
      startRecording();
      setIsShown(false);
    }
    setIsRecording(!isRecording);
  };
  const handleRecordButtonClick = () => {
    setViewRecordVoice(false);
  };

  const handleRecorBtnonClick = async () => {
    if (CurrentSentenceIndex < sentence.length - 1) {
      setCurrentSentenceIndex(CurrentSentenceIndex + 1);
    } else {
      // setViewRecordVoice(true);
      setIsFinish(true);
      setCurrentSentenceIndex(0);
    }
    setIsShown(false);
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
            {' '}
            {isFinish ? (
              <div>
                <FinishExplain>
                  등록이 완료되었습니다!
                  <br />
                  등록된 목소리는 Voss 사용자의 목소리로 사용됩니다.
                </FinishExplain>
                {/* <FinishBtn onClick={() => HandlePageState(0)}> */}
                <FinishBtn 
                  // onClick={() => goGame()}>메인으로
                  onClick={props.SetPageMain}>메인으로
                </FinishBtn>
              </div>
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
                {isShown ? (
                  <audio
                    controls
                    src={mediaBlobUrl}
                    style={{
                      width: '300px',
                    }}
                  />
                ) : (
                  <audio
                    controls
                    src={''}
                    style={{
                      width: '300px',
                    }}
                  />
                )}

                <ButtonContainer>
                  <RegistBtn
                    onClick={() => {
                      if (mediaBlobUrl) {
                        console.log(mediaBlobUrl);
                        registVoiceFile(mediaBlobUrl)
                          .then((response) => {
                            if (response) {
                              onAlertClick('등록에 성공했습니다.');
                              clearBlobUrl();
                              setIsShown(false);
                            } else {
                              onAlertClick('등록에 실패했습니다.');
                            }
                          })
                          .catch((error) => {
                            console.error('등록 실패', error);
                          });
                      } else {
                        onAlertClick('목소리를 녹음해 주세요.');
                      }
                    }}
                  >
                    <b>등록하기</b>
                  </RegistBtn>
                  <RecordBtn
                    onClick={() => {
                      recordBtnToggle(), clearBlobUrl();
                    }}
                  >
                    {!isRecording ? (
                      <img
                        src={StartBtnImg}
                        style={{
                          width: '100px',
                        }}
                      />
                    ) : (
                      <>
                        <img
                          src={StopBtnImg}
                          style={{
                            width: '100px',
                          }}
                        />
                        <Waves />
                      </>
                    )}
                  </RecordBtn>
                  <NextBtn
                    onClick={
                      !isRecording
                        ? () => {
                            handleRecorBtnonClick();
                            clearBlobUrl();
                          }
                        : undefined
                    }
                  >
                    <b>넘어가기</b>
                  </NextBtn>
                </ButtonContainer>
              </RecordContainer>
            )}
          </div>
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
