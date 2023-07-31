import { useState, useEffect } from "react"
import { BackGroundImg } from "../../components/BackGroundImg"
import Header from "../../components/Header/Header"
import Messenger from "../../components/Message/Messenger"
import { useRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"
import { getVideoList } from "../../api/videolist"
import { videoListState } from "../../recoil/Training"
import { Video } from "../../type/type"
import { 
  Container,
  TitleBox,
  MainTitle, 
  SubTitle, 
  DubbingBox,
  GenreBox,
  GenreButton,
  VideoBox,
  Thumbnail,
  VideoItem,
  Infos,
  Count,
  Time,
  Description,
  PracticeBtn,
  CountImg,
  TimeImg,} from "./DubbingList.style" 

function DubbingList() {
  const [videoList, setVideoList] = useRecoilState<Video[]>(videoListState)
  const [isGenreSelect,setIsGenreSelect] = useState<boolean[]>([])
  const genreOpt = ["영화", "드라마", "애니메이션", "기타"]
  const navigate = useNavigate()

  const handleGenreBtn = (index:number) => {
    const newGenderSelect = Array(genreOpt.length).fill(false)
    newGenderSelect[index] = !isGenreSelect[index]
    setIsGenreSelect(newGenderSelect)
  }

  const formatTime = (durationInSec: number) => {
    const minutes = Math.floor(durationInSec / 60)
    const second = Math.floor(durationInSec % 60)
    return `${minutes.toString().padStart(2, '0')}분 ${second.toString().padStart(2, '0')}초`
  }

  const goDubbing = (id:number) => {
    navigate(`/dubbing/${id}`)
    window.location.reload()
  }
  
  const axiosVideoList = async () => {
    try {
      const Videos: Video[] = await getVideoList() || [];
      setVideoList(Videos);
    } 
    catch (error) {
      console.log(error);
    }
  };
  
  // 여기서 부터 iframe player API
  const onYouTubeIframeAPIReady = () => {
    videoList.forEach((video, index) => {
      console.log("여기 오니?")
      new YT.Player(`player-${index}`, {
        videoId: video.videoUrl.slice(-11),
        events: {
          'onReady': onPlayerReadyMute,
        }
      });
    })
  }

  const onPlayerReadyMute = (event) => {
    event.target.playVideo();
    event.target.mute()
  }

  // index.html에 CDN을 동적으로 추가해주는 과정이라 생각하자
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  if (firstScriptTag && firstScriptTag.parentNode) {
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

  useEffect(() => {
    axiosVideoList();
  }, []);
  
  // useEffect(() => {
  //   onYouTubeIframeAPIReady();
  // }, [videoList]);
  
  return(
    <BackGroundImg>
      <Header/>

      <Container>
        <DubbingBox>
          <TitleBox>
            <MainTitle>더빙 연습</MainTitle>
            <SubTitle>더빙 영상 선택</SubTitle>
          </TitleBox>

          <GenreBox>
            {genreOpt.map((data,index) => (
              <GenreButton
                key={index}
                $IsClick={isGenreSelect[index]}
                onClick={()=>handleGenreBtn(index)}
                >{data}
              </GenreButton>
            ))}
          </GenreBox>

          <VideoBox>
            {videoList.map((video,index) => (
              <VideoItem key={index}>
                <Thumbnail 
                  key={`player-${index}`} 
                  id={`player-${index}`}></Thumbnail>
                <Infos>
                  <Count>
                    <CountImg src="/src/assets/Dubbing/count.png"/>
                    {video.roleCnt}인
                  </Count>
                  <Time>
                    <TimeImg src="/src/assets/Dubbing/time.png"/>
                    {formatTime(video.durationInSec)}
                  </Time>
                </Infos>

                <Description>{video.title}</Description>
                <PracticeBtn onClick={() => goDubbing(video.id)}>연습하기</PracticeBtn>
              </VideoItem>
            ))}
          </VideoBox>
        </DubbingBox>
      </Container>

      <Messenger/>
    </BackGroundImg>
  )
}
export default DubbingList