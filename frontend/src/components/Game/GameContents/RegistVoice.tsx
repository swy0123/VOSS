import { GameMainContainer } from '../GameMain/GameMain.style';

import {
  GameExplain,
  GameNoticeDiv,
  GameTitle,
  RecordButton,
} from './RegistVoice.style';
import GameTitleImg from '/src/assets/Game/GameTitleImg.png';

function RegistVoice() {
  return (
    <GameMainContainer>
      <GameNoticeDiv>
        <GameTitle src={GameTitleImg} />
        <GameExplain>
          내 목소리를 보이스 마피아에 등록해보세요!
          <br />
          등록한 목소리는 인게임에서 랜덤하게 만나볼 수 있습니다.
        </GameExplain>
        <RecordButton>녹음하기</RecordButton>
      </GameNoticeDiv>
    </GameMainContainer>
  );
}

export default RegistVoice;
