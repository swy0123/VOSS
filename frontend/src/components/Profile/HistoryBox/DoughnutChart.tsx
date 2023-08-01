import React from 'react';
import { styled } from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['성별, 연령', '연기', '발음',],
  datasets: [
    {
      label: 'history',
      data: [150, 70, 100],
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
      labels: {
        color: '#FFF', // 라벨의 색상을 흰색(#FFF)으로 설정
        usePointStyle: true, // 라벨 모양을 원으로 설정
      },
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return context.label + " 연습 " + context.raw + " 회"; // "연령: " + 라벨 텍스트로 수정
        },
      },
    },
  },
  elements: {
    arc: {
      borderWidth: 2, // 원그래프 부분의 테두리 두께를 조절
      borderColor: 'white', // 원그래프 부분의 테두리 색상을 설정
      // innerWidth: '15vw',
      // innerWidth: '15vw',
    },
  },
};

export default function DoughnutChart() {
  return (
      <Pie data={data } options={options}/>
  );
};