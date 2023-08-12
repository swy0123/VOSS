import { AxiosResponse } from "axios"
import { privateApi } from "."
import { AlarmType } from "../type/hw_type"

export const recevieAlarm = async () => {
  try{
    const response:AxiosResponse<AlarmType[]> = await privateApi.get(`/notification`)
    return response.data
  }
  catch (error){
    console.log(error)
  }
}
