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
  const [isGenreSelect,setIsGenreSelect] = useState<boolean[]>([true,false,false,false,false])
  const [videoList] = useRecoilState<VideosType[]>(videoListState)
  const [videoFilter, setVideoFilter] = useRecoilState<VideosType[]>(videoFilterState)
  const genreOpt = [["전체","TOTAL"],["영화","MOVIE"], ["드라마","DRAMA"], ["애니메이션","ANIMATION"], ["기타","ETC"]]

  const handleGenreBtn = (index:number) => {
    const changeGenre = isGenreSelect.map((_, G_idx) => (G_idx === index))
    setIsGenreSelect(changeGenre)

    if (index && changeGenre[index]===true) {
      setVideoFilter(videoList.filter((video) => (video.category===genreOpt[index][1])))
    }
    
    else if(!index && changeGenre[index]===true){
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