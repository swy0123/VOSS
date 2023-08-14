import { AxiosResponse } from "axios";
import { privateApi } from ".";
import { RecordingInfo } from "../type/hw_type";

export const postStartRecording = async (info:RecordingInfo) => {
  try{
    const response:AxiosResponse<string> = await privateApi.post("/meet/group-recording",info)
    return response
  }
  catch (error){
    console.log(error)
  }
}
