import { AxiosResponse } from "axios"
import { privateApi } from "."

type AsyncFunction = (
  genderSelected: string, 
  ageSelected: string) => Promise<any>;

export const makeRandomScript: AsyncFunction = async(genderSelected,ageSelected) => {
  try{
    const response: AxiosResponse<string> = await privateApi.get<string>(
      `/practice/diction/script?cmd=${ageSelected} ${genderSelected}에게 어울리는 말 60자 이내로 작성해줘`
    )
    return response.data
  }
  catch (error){
    console.log(error)
  }
}