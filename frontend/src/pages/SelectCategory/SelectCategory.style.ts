import styled from 'styled-components';

export const MainImg = styled.div`
  background: url("/src/assets/main/mainimg.gif") no-repeat;
  background-position: center center;
  background-size: cover;
  position: fixed;
  height: 100vh;
  width: 100vw;
  
`;

export const AllCategory = styled.div`
  display: flex;
  position: absolute;
  margin-left: 6.5vw;
  transform: skew(-2.9deg);
  
`;

export const Category = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #242424;
  opacity: 80%;
  height: 100vh;
  width: 29vw;
  

  &:hover {
    background-color: #132B31;
  }
`;

export const Training = styled(Category)``
export const Meeting = styled(Category)``
export const Community = styled(Category)``

// Icon, Title, Description 감싸는 div
export const Cartegory_units = styled.div`
  margin: 35vh 30px 43px 30px;
  height: 27vh;
  transform: skew(2.9deg);
`

export const Icon = styled.img`
  height: 40px;
  width: 40px;
`;

export const Title = styled.h1`
  color: white;
  `;

export const Description = styled.div`
  color: white;
  `

export const AllSinglePractice = styled.div<{$isShown:boolean}>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 200px;
  visibility: ${props => props.$isShown ? "visible":"hidden"};
  `

export const SinglePractice = styled.div`
  background-color: #EFEFEF;
  border-radius: 3px;
  height: 18%;
  width: 80%;
  text-align: center;
  line-height: 38px;
  font-weight: bold;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  transform: skew(-2deg);
  cursor: pointer;
  
  &:hover{
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
  `

export const UnSkew = styled.div`
  transform: skew(4.9deg);
  `

export const VoiceAnalysis = styled(SinglePractice)``
export const Dubbing = styled(SinglePractice)``
export const Accent = styled(SinglePractice)``

export const MeetingEnter = styled.div<{$isShown:boolean}>`
  display: flex;
  justify-content: flex-end;
  height: 200px;
  visibility: ${props => props.$isShown ? "visible":"hidden"};
  
  `
export const MeetingEnterIcon = styled.img`
  height: 30px;
  width: 50px;
  margin-right: 30px;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.3);
    transition: .5s;
  }
  `
export const AllBoard = styled.div<{$isShown:boolean}>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 200px;
  visibility: ${props => props.$isShown ? "visible":"hidden"};
  `;

export const Free = styled(SinglePractice)``
export const Record = styled(SinglePractice)``