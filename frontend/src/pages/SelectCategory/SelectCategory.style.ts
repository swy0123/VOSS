import styled from 'styled-components';

export const MainImg = styled.div`
  background: url("/src/assets/main/MainImg.jpg") no-repeat;
  background-size: cover;
  background-position: center center;
  height: 100vh;
  width: 100vw;
`;

export const AllCategory = styled.div`
  display: flex;
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
  font-family: 'Inter', sans-serif;
  font-style: normal;
`;

export const Description = styled.div`
  color: white;
  font-family: 'Inter', sans-serif;
  font-style: normal;
`

export const AllSinglePractice = styled.div<{$isShown:boolean}>`
  height: 200px;
  visibility: ${props => props.$isShown ? "visible":"hidden"};
`

export const SinglePractice = styled.div`
  background-color: #EFEFEF;
  border-radius: 3px;
  margin : 10px 30px 20px 30px;
  height: 18%;
  width: 80%;
  text-align: center;
  line-height: 38px;
  font-weight: bold;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  transform: skew(-2deg);
  cursor: pointer;

  &:hover {
    background-color: #af000f;
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
  
  &:hover {
    transform: scale(1.3);
    transition: .5s;
  }
`
export const AllBoard = styled.div<{$isShown:boolean}>`
  height: 200px;
  visibility: ${props => props.$isShown ? "visible":"hidden"};
`;

export const Free = styled(SinglePractice)``
export const Record = styled(SinglePractice)``