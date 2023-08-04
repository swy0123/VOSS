import { AxiosResponse } from "axios"
import { privateApi } from "."

type AsyncFunction = (
  genderSelected: string, 
  ageSelected: string) => Promise<any>;

export const makeAnalysisScript: AsyncFunction = async(genderSelected,ageSelected) => {
  try{
    const response: AxiosResponse<string> = await privateApi.get<string>(
      `/practice/diction/script?cmd=${ageSelected} ${genderSelected} 성우지망생이 연습할 더빙 대사 60자 이내로 작성해줘`
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
      `/practice/diction/script?cmd=성우지망생이 연습할 ${categorySelected} 카테고리의 대사 60자 이내로 작성해줘`
    )
    return response.data
  }
  catch (error){
    console.log(error)
  }
}

