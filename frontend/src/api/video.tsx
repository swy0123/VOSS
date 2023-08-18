import {AxiosResponse} from "axios";
import { privateApi } from ".";
import { ScriptData, Video } from "../type/type";

export const getVideo = async (id:number) => {
  try{
    const response:AxiosResponse<ScriptData> = await privateApi.get(`/practice/dub/${id}`)
    // console.log(response)
    return response.data
  }
  catch (error){
    console.log(error)
  }
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