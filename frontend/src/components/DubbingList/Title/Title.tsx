import { useEffect,useState } from 'react'

import {
  TitleBox, 
  MainTitle, 
  SubTitle
  } from "./Title.style"


function Title() {
  // const [x,setX] = useState(0)
  // const [y,setY] = useState(0)

  // const handleResize = () => {
  //   console.log(`브라우저 화면 사이즈 x: ${window.innerWidth}, y: ${window.innerHeight}`)
  //   setX(window.innerWidth)
  //   setY(window.innerHeight)
  // }

  // useEffect(()=>{
  //   window.addEventListener('resize', handleResize)
  //   return () => {
  //     window.removeEventListener('resize',handleResize)
  //   }
  // },[])

  return ( 
    <TitleBox>
      <MainTitle>더빙 연습</MainTitle>
      <SubTitle>더빙 영상 선택</SubTitle>
      {/* <span>=======</span>
      <span>X:{x} , Y:{y}</span> */}
    </TitleBox>
  )
}
export default Title