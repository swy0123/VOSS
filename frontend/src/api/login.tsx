// import { axiosInstance, axiosWithAccessToken } from "./";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
// import { setCookie } from "./cookie";

interface LoginProps {
  email: string;
  password: string;
}


export const testLogin = async () => {
  const response = await axios.get("http://wonyoung210.p-e.kr:8080/auth/test");
};

export const postTest = async (user: LoginProps) => {
  const tmp = {
    name: user.email,
    age: 12,
  };
  const response = await axios.post("http://wonyoung210.p-e.kr:8080/auth/post-test", tmp);

  console.log(response);
};

// export const postLogin = (user: LoginProps) => {
//   console.log(user + JSON.stringify(user));
//   console.log("login");
//   axios({ method: "post", url: "http://wonyoung210.p-e.kr:8080/member/login", data: user })
//     .then((res) => {
//       let returnMsg = "";
//       if (res.status === 200) {
//         console.log(res.data)
//         let accessToken = res.data.accessToken; // 응답헤더에서 토큰 받기
//         let refreshToken = res.data.refreshToken; // 응답헤더에서 토큰 받기
//         console.log("access 토큰 :", accessToken);
//         console.log("refresh 토큰 :", refreshToken);
//         returnMsg = ("로그인 되었습니다.");
//       }
//       console.log(returnMsg);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

export const postLogin = async (user: LoginProps) => {
  console.log(user + JSON.stringify(user));
  console.log("login");
  const res = await axios.post("http://wonyoung210.p-e.kr:8080/member/login", user);
  if (res.status === 200) {
    console.log(res.data);
    let accessToken = res.data.accessToken; // 응답헤더에서 토큰 받기
    let refreshToken = res.data.refreshToken; // 응답헤더에서 토큰 받기
    console.log("access 토큰 :", accessToken);
    console.log("refresh 토큰 :", refreshToken);
    return true;
  }
  else return false;

}

// let data = JSON.stringify({
//   "email": "new@naver.com",
//   "password": "1234"
// });

// let config = {
//   method: 'post',
//   maxBodyLength: Infinity,
//   url: 'http://wonyoung210.p-e.kr:8080/auth/login',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   data : data
// };

// export const getLogin = ()=>{
//     axios.request(config)
//     .then((response) => {
//       console.log(JSON.stringify(response.headers));
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

// export const getLogin = async (user: LoginProps) => {
//     console.log("getLogin")
//     console.log(user)
//     try {
//         const response = await axios.post("http://wonyoung210.p-e.kr:8080/auth/login", user);
//         const accessToken = response.headers.Authorization;
//         setCookie("isLogin", `${accessToken}`);
//         console.log(accessToken);
//         console.log(response);
//         // return response;
//     }
//     catch (error) {
//         console.log(error);
//     }
// }

// new@naver.com
