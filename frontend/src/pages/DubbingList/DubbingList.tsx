import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { VideosType } from "/src/type/type"
import { getVideoList } from "../../api/video"
import { BackGroundImg } from "../../components/BackGroundImg"
import Header from "../../components/Header/Header"
import Messenger from "../../components/Message/Messenger"
import Title from "/src/components/DubbingList/Title/Title"
import Genre from "/src/components/DubbingList/Genre/Genre"
import Video from "/src/components/DubbingList/Video/Video"
import { 
  videoFilterState, 
  videoListState } from "../../recoil/Training"
import { 
  OverflowHeaderHidden,
  Container,
  DubbingBox,} from "./DubbingList.style" 
import Loading from "/src/components/Loading"

function DubbingList() {
  const [videoList, setVideoList] = useRecoilState<VideosType[]>(videoListState)
  const [videoFilter, setVideoFilter] = useRecoilState<VideosType[]>(videoFilterState)
  
  const axiosVideoList = async ():Promise<void> => {
    try {
      const Videos: VideosType[] = await getVideoList();
      setVideoList(Videos);
      setVideoFilter(Videos)
    } 
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    void axiosVideoList();
  }, []);

  // 로딩 페이지가 하나 더 있으면 좋겠다.
  if (!videoList) {return <Loading/>;}

  return(
    <BackGroundImg>
      <Header/>
      <OverflowHeaderHidden>
      <Container>
        <DubbingBox>
          <Title/>
          <Genre/>
          <Video/>
        </DubbingBox>
      </Container>
      </OverflowHeaderHidden>
      <Messenger/>
    </BackGroundImg>
  )
}
export default DubbingList