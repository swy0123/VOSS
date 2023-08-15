import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';


//수정
const BASE_URL = 'https://i9b106.p.ssafy.io:8080';
// const navigate = useNavigate();
// const [currentUser, setCurrentUser] = useRecoilState(CurrentUserAtom)
// const [isLogin, setLoginState] = useRecoilState(LoginState)
axios.defaults.withCredentials = true;

export const publicApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const privateApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  },
});

privateApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  config.headers.Authorization = 'Bearer ' + token;

  return config;
});

export async function postRefreshToken() {
  console.log('리프레시 토큰으로 액세스 재발급');
  const headers = {
    'Authorization-refresh': 'Bearer ' + localStorage.getItem('refresh_token'),
  };

  const response = await publicApi.post('/auth/refresh', null, { headers });
  return response;
}

privateApi.interceptors.response.use(
  (response) => {
    console.log('response');
    return response;
  },

  async (error) => {
    const { config } = error;

    if (error.response.status === 403) {
      if (error.response.data.message === '유효하지 않은 토큰') {
        const originRequest = config;
        try {
          const response = await postRefreshToken();
          const newAccessToken = response.headers['authorization'];
          localStorage.setItem(
            'access_token',
            response.headers['authorization']
          );
          localStorage.setItem(
            'refresh_token',
            response.headers['authorization-refresh']
          );
          axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originRequest);
        } catch {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = ("/");
        }
      }
    }
    return Promise.reject(error);
  }
);
