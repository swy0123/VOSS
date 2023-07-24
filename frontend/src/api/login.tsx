
import { axiosInstance, axiosWithAccessToken } from "./";
import axios from "axios";
import { setCookie } from "./cookie";

interface LoginProps {
    email: string,
    password: string
}

export const testLogin = async () => {
    const response = await axios.get("http://wonyoung210.p-e.kr:8080/auth/test");

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
//     // const response = await axios.post("http://wonyoung210.p-e.kr:8080/auth/login", {
//     //     email: "new@naver.com",
//     //     password: "1234"
//     // });

//     try {
//         // POST 요청은 body에 실어 보냄
//         await axios.post("http://wonyoung210.p-e.kr:8080/auth/login", {
//             email: "new@naver.com",
//             password: "1234"
//         });
//     } catch (e) {
//         console.error(e);
//     }
//     // console.log(response.headers);
// }

export const postTest = async () => {
    const tmp = {
        "name" : "ttt",
        "age" : 12
    }
    const response = await axios.post("http://wonyoung210.p-e.kr:8080/auth/post-test", tmp);

    console.log(response);
}

export const getLogin = async (user: LoginProps) => {
    console.log(" !!! " + user.email+" "+user.password);
    console.log(" !--! " + JSON.stringify(user));
    const tmp =  JSON.stringify(user);
    const response = await axios.post("http://wonyoung210.p-e.kr:8080/auth/login", tmp);
    alert(response.headers);
    console.log(response.headers);
}

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