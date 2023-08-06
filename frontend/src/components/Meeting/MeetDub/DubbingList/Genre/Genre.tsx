import { useState } from "react"
import { useRecoilState } from "recoil"
import { VideosType } from "/src/type/type"
import { 
  videoFilterState, 
  videoListState } from "/src/recoil/Training"
import { 
  GenreBox, 
  GenreButton } from "./Genre.style"



function Genre () {
  const [isGenreSelect,setIsGenreSelect] = useState<boolean[]>([])
  const [videoList] = useRecoilState<VideosType[]>(videoListState)
  const [videoFilter, setVideoFilter] = useRecoilState<VideosType[]>(videoFilterState)
  const genreOpt = [["영화","MOVIE"], ["드라마","DRAMA"], ["애니메이션","ANIMATION"], ["기타","ETC"]]

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
  return (
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
  )
}
export default Genre