import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { useRecoilState } from "recoil";
import { CurrentUserAtom } from "../recoil/Auth";
//수정
const BASE_URL = "https://i9b106.p.ssafy.io:8080";
axios.defaults.withCredentials = true;

export const publicApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
});


export const privateApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

privateApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  config.headers.Authorization = 'Bearer ' + token;

  return config;
});


export async function postRefreshToken() {
  console.log("리프레시 토큰으로 액세스 재발급");
  const headers = {
    'Authorization-refresh': "Bearer " + localStorage.getItem('refresh_token'),
  };
  
  const response = await publicApi.post('/auth/refresh', null, { headers });
  return response;
}

privateApi.interceptors.response.use(
  (response) => {
    console.log("response")
    return response;
  },

  async (error) => {
    const {
      config
    } = error;

    if (error.response.status === 403) {
      console.log("인터셉터 시작 =============");
      if (error.response.data.message === '유효하지 않은 토큰') {
        const originRequest = config;
        const response = await postRefreshToken();

        if (response.status === 200) {
          console.log("인터셉터 중간 시작 =============" + originRequest.headers.Authorization);
          const newAccessToken = response.headers["authorization"];
          localStorage.setItem('access_token', response.headers["authorization"]);
          localStorage.setItem('refresh_token', response.headers["authorization-refresh"]);
          // const [currentUser, setCurrentUser] = useRecoilState(CurrentUserAtom);
          // setCurrentUser((prev: any) => ({
          //   ...prev,
          //   accessToken: response.headers["authorization"],
          //   refreshToken: response.headers["authorization-refresh"],
          // }));
          axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          console.log("인터셉터 끝 =============" + originRequest.headers.Authorization);
          return axios(originRequest);

        } else {
          alert("다시 로그인하세요");
          window.location.replace('/');
          
        }
      }
    }
    return Promise.reject(error);
  },
);
