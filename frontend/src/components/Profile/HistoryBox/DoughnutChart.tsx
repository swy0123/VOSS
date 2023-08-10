import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useRecoilValue } from 'recoil';
import { ProfileState } from '/src/recoil/Auth';
import { styled } from "styled-components";

const Count = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6.5vw;
  height: 6.5vw;
  color: rgba(293, 293, 293, 0.8) ;

  p{
    font-size: 1.1vw;
  }
`;


ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart() {
  const profile = useRecoilValue(ProfileState);

  const data = {
    labels: [ '발음', '연기', '성별, 연령'],
    datasets: [
      {
        label: 'history',
        data: [ profile.dictionCnt, profile.dubCnt, profile.actCnt],
        backgroundColor: [
          '#ABF9A9',
          '#C3DAFF',
          '#FFF8B7',
        ],
        borderColor: [
          '#FFFFFF',
          '#FFFFFF',
          '#FFFFFF',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.label + " 연습 " + context.raw + " 회"; // "연령: " + 라벨 텍스트로 수정
          },
        },
      },
    },
    cutout: '40%',
  };

  return (
    <div>
      <Doughnut style={{width: '16vw', height: '16vw'}} data={data} options={options}/>
      <Count style={{width: '16vw'}}><p>{profile.totalCnt} 회</p></Count>
    </div>
  );
};

export default DoughnutChart;