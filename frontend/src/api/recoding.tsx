<<<<<<< HEAD
import { AxiosResponse } from "axios";
import { privateApi } from ".";
import { RecordingInfo } from "../type/hw_type";

export const postStartRecording = async (info:RecordingInfo) => {
  try{
    const response:AxiosResponse<string> = await privateApi.post("/meet/group-recording",info)
    return response
=======
import { privateApi } from ".";

interface RecordingInfo{
  meetRoomId: number,
  command : string
}

export const postStartRecording = async (info:RecordingInfo) => {
  try{
    const response = await privateApi.post("/meet/group-recording")
    console.log("화상 더빙 녹음")
>>>>>>> 068c072821e1461cd73b020380c845c7ba8531b7
  }
  catch (error){
    console.log(error)
  }
}
