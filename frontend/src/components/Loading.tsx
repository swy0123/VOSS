import { BackGroundImg } from "./BackGroundImg"
import Header from "./Header/Header"
import Messenger from "./Message/Messenger"
import Loading1 from '/src/components/Loading1';
import Loading2 from '/src/components/Loading2';
import Loading3 from '/src/components/Loading3';

function Loading () {
  return(
    <BackGroundImg>
      <Header/>
        <Loading1/>
        <Loading2/>
        <Loading3/>
      <Messenger/>
    </BackGroundImg>
  )
}
export default Loading