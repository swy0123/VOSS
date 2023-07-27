import {AxiosResponse} from "axios";
import { privateApi } from ".";

interface Video {
  id: number;
  category: string;
  title: string;
  durationInSec: number;
  videoUrl: string;
  roleCnt: number;
}

export const getVideoList = async () => {
  try{
    const response:AxiosResponse<Video[]> = await privateApi.get("/practice/dub")
    // console.log(response)
    return response.data
  }
  catch (error){
    console.log(error)
  }
}