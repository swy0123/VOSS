import styled from 'styled-components';

const BackGroundImg = styled.img`
  height: 100vh;
  width: 100vw;
`;
const AllPractices = styled.div`
  display: flex;
  position: absolute;
`;

const Practice = styled.div`
  background-color: white;
  width: 100px;
`;

function SelectSinglePractice () {
  return(
    <div>
      <BackGroundImg src="/src/assets/background.jpg" alt="" />
      <AllPractices>
        <Practice></Practice>
        <Practice></Practice>
        <Practice></Practice>
      </AllPractices>
    </div>
  )
}

export default SelectSinglePractice