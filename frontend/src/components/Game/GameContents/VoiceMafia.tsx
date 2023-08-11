import { GameMainContainer } from "../GameMain/GameMain.style"
import { GameExplain, GameNoticeDiv, GameTitle, StartButton } from "./VoiceMafia.style"
import GameTitleImg from "/src/assets/Game/GameTitleImg.png"

function VoiceMafia() {

    return (
        <GameMainContainer>
            <GameNoticeDiv>
                <GameTitle src={GameTitleImg} />
                <GameExplain>
                    다음 들려주는 목소리를 듣고,<br/>
                    전문 성우 목소리, 생성 AI 목소리, Voss 사용자 목소리인지 맞혀주세요!<br/>
                    총 10문제이고, 각 선택 기회는 한 번입니다<br/>

                </GameExplain>
                <StartButton>시작하기</StartButton>
                


            </GameNoticeDiv>


        </GameMainContainer>

    )



}

export default VoiceMafia