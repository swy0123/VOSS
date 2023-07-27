import {AxiosResponse} from "axios";
import { privateApi } from ".";
import { ScriptData } from "../type/type";

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


