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

export const CheckAllAlarm = async () => {
  try{
    await privateApi.delete(`/notification`)
  }
  catch (error){
    console.log(error)
  }
}

export const CheckDetailAlarm = async (notiId:numeber) => {
  try{
    await privateApi.delete(`/notification/${notiId}`)
  }
  catch (error){
    console.log(error)
  }
}
