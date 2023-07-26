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
    url: 'http://i9b106.p.ssafy.io:8080/practice/dub/1',
    maxBodyLength: Infinity,
    headers: {
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTY5MDI5OTUyNCwiZW1haWwiOiJuZXdAbmF2ZXIuY29tIn0.yzMH-OXzz0uzdNJBsixPmfrsSMnoe-kho1edhrW4a0EyobvtMtWaL4YPAZGRglK6yNpmNxNAIub151G81d6Oow'
    }
  };

  try{
    const response:AxiosResponse<ScriptData> = await axios.request(config)
    console.log(response)
  }
  catch (error){
    console.log(error)
  }
}
