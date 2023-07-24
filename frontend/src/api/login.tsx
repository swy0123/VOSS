// import { axiosInstance, axiosWithAccessToken } from "./";
import axios from "axios";
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
//       if (res.status === 200) {
//         let accessToken = res.headers["authorization"]; // 응답헤더에서 토큰 받기
//         let refreshToken = res.headers["authorization-refresh"]; // 응답헤더에서 토큰 받기
//         console.log("access 토큰 :", accessToken);
//         console.log("refresh 토큰 :", refreshToken);
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

export const postLogin = async (user: LoginProps) => {
    console.log(user + JSON.stringify(user));
    console.log("login");
    const res = await axios.post("http://wonyoung210.p-e.kr:8080/member/login", user);
    console.log(res.data);
    console.log(res.headers['Authorization']);
    console.log(res.headers['Authorization-refresh']);
    console.log(res.headers['authorization']);
    console.log(res.headers['authorization-refresh']);

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
