import { useState, useEffect } from "react"
import { BackGroundImg } from "../../components/BackGroundImg"
import Header from "../../components/Header/Header"
import Messenger from "../../components/Message/Messenger"
import { useRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"
import { getVideoList } from "../../api/video"
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
  const [videoFilter, setVideoFilter] = useState<Video[]>([])
  const [isGenreSelect,setIsGenreSelect] = useState<boolean[]>([])
  const genreOpt = [["영화","MOVIE"], ["드라마","DRAMA"], ["애니메이션","ANIMATION"], ["기타","ETC"]]
  const navigate = useNavigate()

  const handleGenreBtn = (index:number) => {
    const newGenderSelect = Array(genreOpt.length).fill(false)
    newGenderSelect[index] = !isGenreSelect[index]
    setIsGenreSelect(newGenderSelect)

    if (newGenderSelect[index]===true) {
      setVideoFilter(videoList.filter((video) => (video.category===genreOpt[index][1])))
    }
    else if(newGenderSelect[index]===false){
      setVideoFilter(videoList)
    }
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
  
  useEffect(() => {
    const axiosVideoList = async () => {
      try {
        const Videos: Video[] = await getVideoList() || [];
        setVideoList(Videos);
        setVideoFilter(Videos)
      } 
      catch (error) {
        console.log(error);
      }
    };
    axiosVideoList();
  }, []);

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
                >{data[0]}
              </GenreButton>
            ))}
          </GenreBox>

          <VideoBox>
            {videoFilter.map((video,index) => (
              <VideoItem key={index}>
                <Thumbnail src={`https://www.youtube.com/embed/${video.videoUrl.slice(-11)}`}></Thumbnail>
                {/* <Thumbnail 
                  key={`player-${index}`} 
                  id={`player-${index}`}></Thumbnail> */}
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