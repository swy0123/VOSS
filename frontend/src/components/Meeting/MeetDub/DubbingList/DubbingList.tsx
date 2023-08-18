import { useEffect } from "react" 
import { useRecoilState } from "recoil"
import { getVideoList } from "/src/api/video"
import { VideosType } from "/src/type/type"
import Genre from "./Genre/Genre"
import Video from "./Video/Video"
import { 
  videoFilterState, 
  videoListState } from "/src/recoil/Training"
import { 
  Container, 
  DubbingBox } from "./DubbingList.style"

function DubbingList({meetRoomId}:number) {
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

  return (
    <Container>
      <DubbingBox>
        <Genre/>
        <Video meetRoomId={meetRoomId}/>
      </DubbingBox>
    </Container>
  )
}
export default DubbingList