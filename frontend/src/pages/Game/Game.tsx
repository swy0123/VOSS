import { BackGroundImg } from '/src/components/BackGroundImg';
import Messenger from '/src/components/Message/Messenger';
import Header from '../../components/Header/Header';
import { Title } from '../MeetingBoard/MeetingBoard.style';
import GameMain from '../../components/Game/GameMain/GameMain';
import { useEffect, useState } from 'react';
import GameContents from '../../components/Game/GameContents/VoiceMafia';
import { Container } from './Game.style';
import RegistVoice from '../../components/Game/GameContents/RegistVoice';

function Game() {
  const [pageState, setPageState] = useState<number>(0);

  useEffect(() => {
    setPageState(0);
  }, []);

  const HandlePageState = (state: number) => {
    console.log(
      'statestatestatestatestatestatestatestatestatestatestatestatestate'
    );
    console.log(state);
    setPageState(state);
  };

  return (
    <BackGroundImg style={{ overflow: 'hidden' }}>
      <Header />
      <Container>
        {pageState == 0 ? (
          <GameMain
            SetPageMafia={() => HandlePageState(1)}
            SetPageRegist={() => HandlePageState(2)}
          />
        ) : pageState == 1 ? (
          <GameContents 
            SetPageMain={() => HandlePageState(0)}/>
        ) : pageState == 2 ? (
          <RegistVoice
            SetPageMain={() => HandlePageState(0)} />
        ) : (
          ""
        )}
      </Container>

      <Messenger />
    </BackGroundImg>
  );
}
export default Game;
