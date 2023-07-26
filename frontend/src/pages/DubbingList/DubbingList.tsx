import React, { useState, useEffect } from "react"
import { styled } from "styled-components"
import { BackGroundImg } from "../../components/BackGroundImg"
import Header from "../../components/Header/Header"
import Messenger from "../../components/Message/Messenger"
import { getVideos } from "../../api/videolist"
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

const tmp = {
  result : [
    {
    script: {
        "createdAt": null,
        "updatedAt": null,
        "id": 1,
        "category": "DRAMA",
        "title": "[거침없이 하이킼] 7부 몰아보기",
        "durationInSec": 661,
        "imageUrl": "https://img.youtube.com/vi/1iwhi9EykjQ/mqdefault.jpg",
        "videoUrl": "https://www.youtube.com/embed/1iwhi9EykjQ",
        "roleCnt": 2
    },
    roles: [
        "은조",
        "현우"
    ],
    lines: [
        {
            "id": 1,
            "name": "은조",
            "content": "대사대사",
            "startSec": 1,
            "endSec": 2
        },
        {
            "id": 2,
            "name": "현우",
            "content": "두번째",
            "startSec": 3,
            "endSec": 4
        },
        {
            "id": 3,
            "name": "은조",
            "content": "삼삼",
            "startSec": 5,
            "endSec": 6
        }
    ] 
    },
    {
    script: {
        "createdAt": null,
        "updatedAt": null,
        "id": 2,
        "category": "DRAMA",
        "title": "[무한도전] 장마철 라이브 스트리밍",
        "durationInSec": 661,
        "imageUrl": "https://img.youtube.com/vi/iCaY92oVVmI/mqdefault.jpg",
        "videoUrl": "https://www.youtube.com/embed/iCaY92oVVmI",
        "roleCnt": 2
    },
    roles: [
        "은조",
        "현우"
    ],
    lines: [
        {
            "id": 1,
            "name": "은조",
            "content": "대사대사",
            "startSec": 1,
            "endSec": 2
        },
        {
            "id": 2,
            "name": "현우",
            "content": "두번째",
            "startSec": 3,
            "endSec": 4
        },
        {
            "id": 3,
            "name": "은조",
            "content": "삼삼",
            "startSec": 5,
            "endSec": 6
        }
    ] 
    },
    {
    script: {
        "createdAt": null,
        "updatedAt": null,
        "id": 3,
        "category": "DRAMA",
        "title": "레이스 고백장면",
        "durationInSec": 661,
        "imageUrl": "https://img.youtube.com/vi/mzickrfK0Co/mqdefault.jpg",
        "videoUrl": "https://www.youtube.com/embed/mzickrfK0Co",
        "roleCnt": 2
    },
    roles: [
        "은조",
        "현우"
    ],
    lines: [
        {
            "id": 1,
            "name": "은조",
            "content": "대사대사",
            "startSec": 1,
            "endSec": 2
        },
        {
            "id": 2,
            "name": "현우",
            "content": "두번째",
            "startSec": 3,
            "endSec": 4
        },
        {
            "id": 3,
            "name": "은조",
            "content": "삼삼",
            "startSec": 5,
            "endSec": 6
        }
    ] 
    },
    {
      script: {
          "createdAt": null,
          "updatedAt": null,
          "id": 4,
          "category": "DRAMA",
          "title": "[무한도전] 장마철 라이브 스트리밍",
          "durationInSec": 661,
          "imageUrl": "https://img.youtube.com/vi/iCaY92oVVmI/mqdefault.jpg",
          "videoUrl": "https://www.youtube.com/embed/iCaY92oVVmI",
          "roleCnt": 2
      },
      roles: [
          "은조",
          "현우"
      ],
      lines: [
          {
              "id": 1,
              "name": "은조",
              "content": "대사대사",
              "startSec": 1,
              "endSec": 2
          },
          {
              "id": 2,
              "name": "현우",
              "content": "두번째",
              "startSec": 3,
              "endSec": 4
          },
          {
              "id": 3,
              "name": "은조",
              "content": "삼삼",
              "startSec": 5,
              "endSec": 6
          }
      ] 
      },
      {
      script: {
          "createdAt": null,
          "updatedAt": null,
          "id": 5,
          "category": "DRAMA",
          "title": "레이스 고백장면",
          "durationInSec": 661,
          "imageUrl": "https://img.youtube.com/vi/mzickrfK0Co/mqdefault.jpg",
          "videoUrl": "https://www.youtube.com/embed/mzickrfK0Co",
          "roleCnt": 2
      },
      roles: [
          "은조",
          "현우"
      ],
      lines: [
          {
              "id": 1,
              "name": "은조",
              "content": "대사대사",
              "startSec": 1,
              "endSec": 2
          },
          {
              "id": 2,
              "name": "현우",
              "content": "두번째",
              "startSec": 3,
              "endSec": 4
          },
          {
              "id": 3,
              "name": "은조",
              "content": "삼삼",
              "startSec": 5,
              "endSec": 6
          }
      ] 
      }
  ]
}

function DubbingList() {
  const [videoList, setVideoList] = useState([])
  const [isGenreSelect,setIsGenreSelect] = useState<boolean[]>([])
  const genreOpt = ["영화/드라마", "애니메이션", "기타"]

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

  useEffect(()=>{
    setVideoList(tmp.result)
  },[])
  useEffect(() => {
    const fetchData  = async () => {
      try{
        const response = await getVideos();
        setVideoList(response.data)
      }
      catch(err){
        console.log("Error fetching videos",err)
      }
    }
    fetchData()
  },[])

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
                <Thumbnail src={video.script.videoUrl}></Thumbnail>
                <Infos>
                  <Count>
                    <CountImg src="/src/assets/Dubbing/count.png"/>
                    {video.script.roleCnt}인
                  </Count>
                  <Time>
                    <TimeImg src="/src/assets/Dubbing/time.png"/>
                    {formatTime(video.script.durationInSec)}
                  </Time>
                </Infos>
                <Description>{video.script.title}</Description>
                <PracticeBtn>연습하기</PracticeBtn>
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