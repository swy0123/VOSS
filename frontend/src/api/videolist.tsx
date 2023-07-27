import {AxiosResponse} from "axios";
import { privateApi } from ".";
import { Video } from "../type/type";

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