import { useState } from "react";
import { GameMainContainer } from "../GameMain/GameMain.style"
import { GameExplain, GameNoticeDiv, GameTitle, StartButton, PlayExplain, StyledDivWithText, OptionButton, OptionButtonContainer } from "./VoiceMafia.style"
import GameTitleImg from "/src/assets/Game/GameTitleImg.png"

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

const option = [
    '전문 성우',
    'AI',
    'Voss 사용자',
];

function VoiceMafia() {
    const [StartGame, setStartGame] = useState(true);
    const [CurrentSentenceIndex, setCurrentSentenceIndex] = useState(0);

    const handleStartButtonClick = () => {
        setStartGame(false);
    };

    const handleOptionButtonClick = () => {
        // 정답 체크

        if (CurrentSentenceIndex < sentence.length - 1) {
            setCurrentSentenceIndex(CurrentSentenceIndex + 1);
        }
    };

    return (
        <GameMainContainer>
            <GameNoticeDiv>
                <GameTitle src={GameTitleImg} />
                {StartGame ? (
                    <GameExplain>
                        다음 들려주는 목소리를 듣고,<br/>
                        전문 성우 목소리, 생성 AI 목소리, Voss 사용자 목소리인지 맞혀주세요!<br/>
                        총 10문제이고, 각 선택 기회는 한 번입니다<br/>
    
                    </GameExplain>
                    ) : (
                        <div>
                            <PlayExplain>
                                누구의 목소리일까요? {sentence[CurrentSentenceIndex]}
                            </PlayExplain>
                            <StyledDivWithText>
                                목소리 재생중입니다...
                            </StyledDivWithText>
                            <OptionButtonContainer>
                                <OptionButton $IsColor={false} onClick={handleOptionButtonClick}>
                                    {option[0]}
                                </OptionButton>
                                <OptionButton $IsColor={false} onClick={handleOptionButtonClick}>
                                    {option[1]}
                                </OptionButton>
                                <OptionButton $IsColor={false} onClick={handleOptionButtonClick}>
                                    {option[2]}
                                </OptionButton>
                            </OptionButtonContainer>
                        </div>
                    )}
                    {StartGame && (
                        <StartButton onClick={handleStartButtonClick}>
                            시작하기
                        </StartButton>
                    )}

            </GameNoticeDiv>


        </GameMainContainer>

    )



}

export default VoiceMafia