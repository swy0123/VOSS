import {
  EnterButton,
  GameMainCneterDiv,
  GameMainContainer,
  GameMainIcon,
  GameMainText,
} from './GameMain.style';
import GameMainTextImg from '/src/assets/Game/GameMainTextImg.png';
import { FlexDiv } from '/src/pages/Meeting/AddMeetModal/AddMeetModal.style';
import ColorTag from '/src/assets/Game/ColorTag.png';
import GameBoy from '/src/assets/Game/GameBoy.png';
import GroceryBox from '/src/assets/Game/GroceryBox.png';
import News from '/src/assets/Game/News.png';
import Robot from '/src/assets/Game/Robot.png';
import Support from '/src/assets/Game/Support.png';
import Target from '/src/assets/Game/Target.png';
import TeacherMan from '/src/assets/Game/TeacherMan.png';
import TimeCapsule from '/src/assets/Game/TimeCapsule.png';

export interface GameMainProps {
  SetPageMafia: () => void;
  SetPageRegist: () => void;
}
const GameMain = (props: GameMainProps) => {
  return (
    <GameMainContainer>
      <GameMainCneterDiv>
        <GameMainText src={GameMainTextImg} />
        <EnterButton $IsColor={true} onClick={props.SetPageMafia}>
          Voice Mafia 입장
        </EnterButton>
        <EnterButton $IsColor={false} onClick={props.SetPageRegist}>
          My Voice 등록하기
        </EnterButton>
        <GameMainIcon
          src={ColorTag}
          $Top={'-14%'}
          $Left={'95%'}
          $Animation={true}
          $Duration={'animation-duration: 1.4s;'}
        />
        <GameMainIcon
          src={GameBoy}
          style={{width:"80px", height:"90px"}}
          $Top={'90%'}
          $Left={'104%'}
          $Animation={true}
          $Duration={'animation-duration: 1s;'}
        />
        <GameMainIcon
          src={GroceryBox}
          $Top={'45%'}
          $Left={'-35%'}
          $Animation={true}
          $Duration={'animation-duration: 1.2s;'}
        />
        <GameMainIcon src={News} $Top={'-8%'} $Left={'7%'} $Animation={false} />
        <GameMainIcon
          src={Robot}
          $Top={'90%'}
          $Left={'-19%'}
          $Animation={false}
        />
        <GameMainIcon
          src={Support}
          $Top={'45%'}
          $Left={'110%'}
          $Animation={false}
        />
        <GameMainIcon
          src={Target}
          $Top={'45%'}
          $Left={'8%'}
          $Animation={false}
        />
        <GameMainIcon
          src={TeacherMan}
          $Top={'-12%'}
          $Left={'-30%'}
          $Animation={false}
        />
        <GameMainIcon
          src={TimeCapsule}
          $Top={'15%'}
          $Left={'69%'}
          $Animation={false}
        />
      </GameMainCneterDiv>
    </GameMainContainer>
  );
};

export default GameMain;
