import { privateApi } from ".";

interface RecordingInfo{
  meetRoomId: number,
  command : string
}

export const postStartRecording = async (info:RecordingInfo) => {
  try{
    const response = await privateApi.post("/meet/group-recording")
    console.log("화상 더빙 녹음")
  }
  catch (error){
    console.log(error)
  }
}
