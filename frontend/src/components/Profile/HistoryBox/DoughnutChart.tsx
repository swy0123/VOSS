import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
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
  color: rgba(293, 293, 293, 0.8);
  p{
    font-size: 1.1vw;
  }
`;


ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart( totalCnt: number, dictionCnt: number, dubCnt: number, actCnt: number ) {
  const data = {
    labels: [ '발음', '연기', '성별, 연령'],
    datasets: [
      {
        label: 'history',
        data: [ dictionCnt, dubCnt, actCnt],
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
          label: function (context: any) {
            return context.label + " 연습 " + context.raw + " 회"; // "연령: " + 라벨 텍스트로 수정
          },
        },
      },
    },
    cutout: '40%',
  };

  return (
    <div  style={{width: '13vw', height: '13vw'}}>
      <Doughnut data={data} options={options} />
      <Count style={{ width: '4vw', height: '4vw'}}><p>{totalCnt} 회</p></Count>
    </div>
  );
};

export default DoughnutChart;