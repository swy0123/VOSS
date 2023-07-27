import {AxiosResponse} from "axios";
import { privateApi } from ".";

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

export const getVideo = async (id:number) => {
  try{
    const response:AxiosResponse<ScriptData> = await privateApi.get(`/practice/dub/${id}`)
    console.log(response)
    return response.data
  }
  catch (error){
    console.log(error)
  }
}


