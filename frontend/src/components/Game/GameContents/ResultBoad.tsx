import { PropsWithChildren } from "react";
import { FinishButton, ReplayButton } from "./VoiceMafia.style"
import Pencil from '/src/assets/Game/Pencil.png';
import ResultBackground from '/src/assets/Game/ResultBackground.png';
import { GameMainIcon } from "../GameMain/GameMain.style";

interface ResultBoardType {
    handleReplayButtonClick: () => void;
    score: number;
    SetPageMain: () => void;
}

const ResultBoard = ({ handleReplayButtonClick, score ,SetPageMain}: PropsWithChildren<ResultBoardType>) => {
    return (
        <div style={{ marginTop: "10px", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
            <div
                style={{
                    marginTop: "5%",
                    position: "relative",
                    width: "100%",
                    height: "300px",
                }}
            >
                <img
                    src={ResultBackground}
                    style={{
                        paddingTop: "40px",
                        width: "70%",
                        height: "70%",
                        objectFit: "cover",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "50%", // 이미지의 중앙에 위치
                        left: "50%", // 이미지의 중앙에 위치
                        transform: "translate(-50%, -50%)", // 중앙으로 정렬
                        color: "black",
                        fontSize: "24px",
                        fontWeight: "bold",
                    }}
                >
                    10문제 중 {score}문제 맞히셨습니다
                </div>
                <div
                    style={{
                        width: "50%",
                        height: "50%",
                        background: `url(${Pencil}) no-repeat center/contain`, // 이미지를 배경 이미지로 설정
                        top: "10%",
                        left: "55%",
                        animation: "rotate 2s linear infinite",
                        position: "absolute", // 위치 조절을 위해 position 추가
                    }}
                />
            </div>
            <ReplayButton onClick={handleReplayButtonClick}>
                다시하기
            </ReplayButton>
            <FinishButton onClick={SetPageMain}>
                메인으로
            </FinishButton>
            <style>
                {`
          @keyframes rotate {
            0% {
              transform: rotate(25deg);
            }
            50% {
              transform: rotate(-25deg);
            }
            100% {
              transform: rotate(25deg);
            }
          }
        `}
            </style>
        </div>
    )
}

export default ResultBoard;