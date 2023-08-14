import { useEffect, useState } from "react";
import { GameMainContainer } from "../GameMain/GameMain.style"
import { GameExplain, GameNoticeDiv, GameTitle, StartButton, ReplayButton } from "./VoiceMafia.style"
import GameTitleImg from "/src/assets/Game/GameTitleImg.png"
import { getGame } from "/src/api/game";
import GuessBoard from "./GuessBoard";

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

function VoiceMafia() {
    const [StartGame, setStartGame] = useState(true);
    const [CurrentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [ShowResult, setShowResult] = useState(false);
    const [GameContents, setGameContents] = useState([]);
    const [CurrentScore, setCurrentScore] = useState(0);

    useEffect(() => {
        getGameContents();
    }, [])

    const getGameContents = async () => {
        const gameContents = await getGame();
        setGameContents(gameContents);
    }

    const handleStartButtonClick = () => {
        setStartGame(false);
    };

    const handleOptionButtonClick = async () => {
        if (CurrentSentenceIndex < sentence.length - 1) {
            setCurrentSentenceIndex(CurrentSentenceIndex + 1);
        } else {
            setShowResult(true);
        }
    };

    const handleReplayButtonClick = () => {
        setStartGame(true);
        setShowResult(false);
        setCurrentSentenceIndex(0);
    };

    const handleScore = (input:string) => {
        if (input === GameContents[CurrentSentenceIndex].type) {
            setCurrentScore(CurrentScore+1);
        }
        handleOptionButtonClick();
        console.log(CurrentSentenceIndex + "=" + CurrentScore);
    }

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
                    ) : !ShowResult ?(
                        <GuessBoard handleScore={handleScore} discreption={sentence[CurrentSentenceIndex]} audioUrl={GameContents[CurrentSentenceIndex].fileName}/>
                    ) : <></>}
                    {StartGame && GameContents.length>0 ? (
                        <StartButton onClick={handleStartButtonClick}>
                            시작하기
                        </StartButton>
                    ): <></>}
                    {ShowResult && (
                        <ReplayButton onClick={handleReplayButtonClick}>
                            다시하기
                        </ReplayButton>
                    )}
            </GameNoticeDiv>
        </GameMainContainer>
    )
}

export default VoiceMafia