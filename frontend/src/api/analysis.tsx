// import axios from "axios";

// const BASE_URL = "https://i9b106.p.ssafy.io:8080";

// export const startVoiceAnalysis = async (wavBlob: Blob) => {
//   try {
//     const formData = new FormData();
//     formData.append("file", wavBlob, 'output.wav');

//     const config = {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//         'Content-Type': 'multipart/form-data',

//       },
//     };
//     const response = await axios.post(`https://i9b106.p.ssafy.io:8080/practice/act/classify`, formData, config);
//     return response
//     // console.log('서버 응답:', response);
//   } catch (error) {
//     console.error('네트워크 오류:', error);
//   }
// }