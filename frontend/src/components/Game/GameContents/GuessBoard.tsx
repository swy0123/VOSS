import { PropsWithChildren } from "react";
import { PlayExplain, StyledDivWithText, OptionButton, OptionButtonContainer } from "./VoiceMafia.style"

interface GuessBoardType {
    currIdx: number;
    handleScore: (input:string) => void;
    discreption:string;
    audioUrl: string;
    selectPossible: boolean;
}

const GuessBoard = ({ currIdx, handleScore, discreption, selectPossible, audioUrl }: PropsWithChildren<GuessBoardType>) => {
    const url = "https://b106-voss.s3.ap-northeast-2.amazonaws.com/" + audioUrl;
    return (
        <div style={{ justifyContent: "center", alignItems: "center", textAlign: "center"}}>
            <PlayExplain>
                누구의 목소리일까요? ({currIdx+1}/10)
            </PlayExplain>
            <audio src={url} controls style={{width :'70%', height : '40px', marginTop: '30px'}}/>
            <StyledDivWithText>
                {discreption}
            </StyledDivWithText>
            {selectPossible? <OptionButtonContainer>
                <OptionButton $IsColor={false} onClick={() => handleScore("MEMBER")}>
                    Voss 사용자
                </OptionButton>
                <OptionButton $IsColor={false} onClick={() => handleScore("ACTOR")}>
                    전문 성우
                </OptionButton>
                <OptionButton $IsColor={false} onClick={() => handleScore("AI")}>
                    AI
                </OptionButton>
            </OptionButtonContainer> : <></>
            }
        </div>
    )
}

export default GuessBoard;