import { AxiosResponse } from "axios"
import { privateApi } from "."

type AsyncFunction = (
  genderSelected: string, 
  ageSelected: string) => Promise<any>;

export const makeAnalysisScript: AsyncFunction = async(genderSelected,ageSelected) => {
  try{
    const response: AxiosResponse<string> = await privateApi.get<string>(
      `/practice/diction/script?cmd=성별이${ageSelected}이고 ${genderSelected}인 스크립트를 15초 내외 분량으로 무조건 특수기호 없이 그리고 무조건 스크립트라는 설명없이 작성해줘`
    )
    console.log(genderSelected)
    console.log(ageSelected)
    console.log(response)
    return response.data
  }
  catch (error){
    console.log(error)
  }
}

export const makeAccentScript: AsyncFunction = async(categorySelected) => {
  try{
    console.log(categorySelected+"    api")
    const response: AxiosResponse<string> = await privateApi.get<string>(
      `/practice/diction/script?cmd=${categorySelected} 와 관련된 스크립트를 꼭 15초 이내 분량으로 무조건 특수기호 없이 그리고 무조건 스크립트라는 설명없이 작성해줘. 실제 대본처럼 작성해줘`
    )
    return response.data
  }
  catch (error){
    console.log(error)
  }
}

