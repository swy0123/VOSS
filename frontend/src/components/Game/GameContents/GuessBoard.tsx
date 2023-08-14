import { PropsWithChildren } from "react";
import { PlayExplain, StyledDivWithText, OptionButton, OptionButtonContainer } from "./VoiceMafia.style"

interface ModalDefaultType {
    handleScore: (input:string) => void;
    discreption:string;
    audioUrl: string;
}

const GuessBoard = ({ handleScore, discreption, audioUrl }: PropsWithChildren<ModalDefaultType>) => {
    const url = "https://b106-voss.s3.ap-northeast-2.amazonaws.com/" + audioUrl;
    return (
        <div>
            <PlayExplain>
                누구의 목소리일까요? {discreption}
            </PlayExplain>
            <audio src={url} controls style={{width :'70%', height : '40px',}}/>
            <StyledDivWithText>
                목소리 재생중입니다...
            </StyledDivWithText>
            <OptionButtonContainer>
                <OptionButton $IsColor={false} onClick={() => handleScore("MEMBER")}>
                    Voss 사용자
                </OptionButton>
                <OptionButton $IsColor={false} onClick={() => handleScore("ACTOR")}>
                    전문 성우
                </OptionButton>
                <OptionButton $IsColor={false} onClick={() => handleScore("AI")}>
                    AI
                </OptionButton>
            </OptionButtonContainer>
        </div>
    )
}

export default GuessBoard;