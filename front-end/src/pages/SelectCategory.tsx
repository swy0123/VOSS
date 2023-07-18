import styled from 'styled-components';

const BackGroundImage = styled.div`
  background: url("/src/assets/background.jpg") no-repeat;
  background-size: cover;
  background-position: center center;
  height: 100vh;
  width: 100vw;
`;

const AllCategory = styled.div`
  display: flex;
  margin-left: 6.5vw;
`;

const Category = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #242424;
  opacity: 80%;
  height: 100vh;
  width: 29vw;
  transform: skew(-2deg);
  transition: skew(-2deg);

  &:hover {
    background-color: #132B31;
  }
`;

const Training = styled(Category)``
const Meeting = styled(Category)``
const Community = styled(Category)``

const Cartegory_units = styled.div`
  margin: 35vh 30px 43px 30px;
`

const Icon = styled.img`
  height: 40px;
  width: 40px;
`;

const Title = styled.h1`
  color: white;
  font-family: 'Inter', sans-serif;
  font-style: normal;
`;

const Description = styled.div`
  color: white;
  font-family: 'Inter', sans-serif;
  font-style: normal;
`

const AllSinglePractice = styled.div`
  height: 200px;
`
const SinglePractice = styled.div`
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
  transform: skew(-7deg);
  transition: skew(-7deg);

  &:hover {
    background-color: #af000f;
  }
`

const VoiceAnalysis = styled(SinglePractice)``
const Dubbing = styled(SinglePractice)``
const Accent = styled(SinglePractice)``

function SelectCategory () {
  return(
    <div>
      <BackGroundImage>
        <AllCategory>

          <Training>
            <Cartegory_units>  
              <Icon src="/src/assets/Training.png"></Icon>
              <Title>Training</Title>
              <Description>더빙 연습, 목소리 나이대 및 성별 분석, 발음교정 연습이 가능한 Private 연습공간</Description>
            </Cartegory_units>
            
            <AllSinglePractice>
              <VoiceAnalysis>목소리 분석</VoiceAnalysis>
              <Dubbing>더빙 연습</Dubbing>
              <Accent>발음 연습</Accent>
            </AllSinglePractice>
          </Training>
        
          <Meeting>
            <Cartegory_units>
              <Icon src="/src/assets/Meeting.png"></Icon>
              <Title>Meeting</Title>
              <Description>다른 유저들과 함께 연습 할 수 있는 Meeting Room</Description>
            </Cartegory_units>
          </Meeting>

          <Community>
            <Cartegory_units>
              <Icon src="/src/assets/Community.png"></Icon>
              <Title>Community</Title>
              <Description>나만의 연습 방법을 공유하고, 연습 기록을 공유하는 게시판</Description>
            </Cartegory_units>
          </Community>

        </AllCategory>
      </BackGroundImage>
    </div>
  )
}

export default SelectCategory

