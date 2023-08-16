import { useEffect, useState } from "react";
import { GameMainContainer } from "../GameMain/GameMain.style"
import { GameExplain, GameNoticeDiv, GameTitle, StartButton, ReplayButton } from "./VoiceMafia.style"
import GameTitleImg from "/src/assets/Game/GameTitleImg.png"
import { getGame } from "/src/api/game";
import GuessBoard from "./GuessBoard";
import ResultBoard from "./ResultBoad";

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

function VoiceMafia(props:GameMainProps) {
    const [StartGame, setStartGame] = useState(true);
    const [CurrentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [ShowResult, setShowResult] = useState(false);
    const [GameContents, setGameContents] = useState([]);
    const [CurrentScore, setCurrentScore] = useState(0);
    const [Discreption, setDiscreption] = useState("음성을 재생하여 들어보세요");
    const [SelectPossible, setSelectPossible] = useState(true);

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
        getGameContents();
        setCurrentScore(0);
        setStartGame(true);
        setShowResult(false);
        setCurrentSentenceIndex(0);
    };

    const handleScore = (input:string) => {
        let disc = "";
        if (input === GameContents[CurrentSentenceIndex].type) {
            setCurrentScore(CurrentScore+1);
            disc = "정답입니다!";

        } else {
            let answer = GameContents[CurrentSentenceIndex].type === "MEMBER" ? "Voss 회원" : GameContents[CurrentSentenceIndex].type === "ACTOR" ? "전문 성우" : "AI"
            disc = "틀렸습니다. 정답은 " + answer + " 목소리입니다";
        }
        
        setDiscreption(disc);
        setSelectPossible(false); 

        setTimeout(() => {
            setSelectPossible(true); 
            handleOptionButtonClick();
            setDiscreption("음성을 재생하여 들어보세요");
        }, 1500);
    }

    return (
        <GameMainContainer>
            <GameNoticeDiv>
                <GameTitle 
                    src={GameTitleImg}
                    onClick={props.SetPageMain} />
                <div>
                    {StartGame ? (
                        <GameExplain>
                            다음 들려주는 목소리를 듣고,<br/>
                            전문 성우 목소리, 생성 AI 목소리, Voss 사용자 목소리인지 맞혀주세요!<br/>
                            총 10문제이고, 각 선택 기회는 한 번입니다<br/>
                        </GameExplain>
                    ) : !ShowResult ?(
                        <GuessBoard currIdx={CurrentSentenceIndex} handleScore={handleScore} discreption={Discreption} selectPossible={SelectPossible} audioUrl={GameContents[CurrentSentenceIndex].fileName}/>
                    ) : <></>}
                    {StartGame && GameContents.length>0 ? (
                        <StartButton onClick={handleStartButtonClick}>
                            시작하기
                        </StartButton>
                    ): <></>}
                    {ShowResult && (
                        <ResultBoard 
                        SetPageMain={props.SetPageMain}
                        score={CurrentScore} handleReplayButtonClick={handleReplayButtonClick} />
                    )}
                </div>
            </GameNoticeDiv>
        </GameMainContainer>
    )
}

export default VoiceMafia;