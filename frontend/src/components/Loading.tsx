import { BackGroundImg } from "./BackGroundImg"
import Header from "./Header/Header"
import Messenger from "./Message/Messenger"

function Loading () {
  return(
    <BackGroundImg>
      <Header/>
      <Messenger/>
    </BackGroundImg>
  )
}
export default Loading