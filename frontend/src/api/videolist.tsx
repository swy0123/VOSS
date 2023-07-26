import axios, {AxiosResponse} from "axios";

interface Script {
  createdAt: string | null;
  updatedAt: string | null;
  id: number;
  category: string;
  title: string;
  durationInSec: number;
  videoUrl: string;
  roleCnt: number;
}

interface Line {
  id: number;
  name: string;
  content: string;
  startSec: number;
  endSec: number;
}

interface ScriptData {
  script: Script;
  roles: string[];
  lines: Line[];
}

export const getVideos = async () => {
  const config = {
    method: 'GET',
    url: 'https://i9b106.p.ssafy.io:8080/practice/dub/1',
    headers: { 
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTY5MDM1NjMxMSwiZW1haWwiOiJuZXdAbmF2ZXIuY29tIn0.vX4sdHDmLfnwdJ3Fnv5dqe2U4qP1ezF4xOUVlmYtFr1apKjwFYw_G4bJtybhrfgyt-qKUo1OqUl3gfJkFL_8-Q', 
    }
  };
  console.log("여기까지는 오나??")
  try{
    const response:AxiosResponse<ScriptData> = await axios.request(config)
    console.log(response)
  }
  catch (error){
    console.log(error)
  }
}


export const test = async () => {
  const config2 = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://i9b106.p.ssafy.io:8080/auth/jwt-test',
    headers: { 
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTY5MDM1NjMxMSwiZW1haWwiOiJuZXdAbmF2ZXIuY29tIn0.vX4sdHDmLfnwdJ3Fnv5dqe2U4qP1ezF4xOUVlmYtFr1apKjwFYw_G4bJtybhrfgyt-qKUo1OqUl3gfJkFL_8-Q', 
    }
  };
  try{
    const response = await axios.request(config2)
    console.log(response)
  }
  catch (error){
    console.log("catch야??")
    console.log(error)

  }
}

