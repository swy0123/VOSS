import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { useRecoilState } from "recoil";
import { CurrentUserAtom } from "../recoil/Auth";
//수정
const BASE_URL = "https://i9b106.p.ssafy.io:8080";
axios.defaults.withCredentials = true;


const token = localStorage.getItem("access_token");
console.log(token);

//토큰이 불필요한 경우
export const publicApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
});


//토큰이 필요한 api요청을 보내는 axios인스턴스
export const privateApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    // Authorization: `Bearer ${accessToken}`,
    
  },
});


//refresh token api
export async function postRefreshToken() {
  //주소 변경 필요
  const response = await publicApi.post('/api/v1/auth/refresh', {
    refreshToken: localStorage.getItem('refresh_token'),
  });
  return response;
}

privateApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  config.headers.Authorization = 'Bearer ' + token;

  return config;
});

//토큰을 함께보내는 privateApi에 interceptor를 적용합니다
privateApi.interceptors.response.use(
  // 200번대 응답이 올때 처리
  (response) => {
    console.log("response")
    return response;
  },
  // 200번대 응답이 아닐 경우 처리
  async (error) => {
    console.log("error")
    const {
      config,
      status : status,
    } = error;

    //토큰이 만료되을 때
    if (status === 403) {
      console.log("response.status === 403");
      if (error.response.data.message === 'Unauthorized') {
        console.log("error.response.data.message === 'Unauthorized'");
        const originRequest = config;
        //리프레시 토큰 api
        const response = await postRefreshToken();
        //리프레시 토큰 요청이 성공할 때
        if (response.status === 200) {
          console.log("response.status === 200");
          const newAccessToken = response.data.accessToken;
          localStorage.setItem('access_token', response.data.accessToken);
          localStorage.setItem('refresh_token', response.data.refreshToken);
          const [currentUser, setCurrentUser] = useRecoilState(CurrentUserAtom);
          setCurrentUser((prev) => ({
            ...prev,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          }));
          axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          //진행중이던 요청 이어서하기
          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originRequest);
          //리프레시 토큰 요청이 실패할때(리프레시 토큰도 만료되었을때 = 재로그인 안내)
        } else if (response.status === 404) {
          console.log("response.status === 404");
          // alert(LOGIN.MESSAGE.EXPIRED);
          alert("재로그인");
          window.location.replace('/sign-in');
        } else {
          console.log("response.status === 200");
          // alert(LOGIN.MESSAGE.ETC);
          alert("LOGIN.MESSAGE.ETC");
        }
      }
    }
    return Promise.reject(error);
  },
);
