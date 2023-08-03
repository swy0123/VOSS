import { AxiosResponse } from "axios"
import { privateApi } from "."

type AsyncFunction = (
  genderSelected: string, 
  ageSelected: string) => Promise<any>;

export const makeAnalysisScript: AsyncFunction = async(genderSelected,ageSelected) => {
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

export const makeAccentScript: AsyncFunction = async(categorySelected) => {
  try{
    const response: AxiosResponse<string> = await privateApi.get<string>(
      `/practice/diction/script?cmd=${categorySelected}을 카테고리로 대사 60자 이내로 작성해줘`
    )
    return response.data
  }
  catch (error){
    console.log(error)
  }
}

