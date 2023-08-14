import { AxiosResponse } from "axios"
import { privateApi } from "."

type AsyncFunction = (
  genderSelected: string, 
  ageSelected: string) => Promise<any>;

export const makeAnalysisScript: AsyncFunction = async(genderSelected,ageSelected) => {
  try{
    const response: AxiosResponse<string> = await privateApi.get<string>(
      `/practice/diction/script?cmd=성별이${ageSelected}이고 ${genderSelected}인 더빙 대사를 실제 드라마나 영화 애니메이션 등에 사용되었던 스크립트로 20자 이상 60자 이내로 작성해줘`
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
      `/practice/diction/script?cmd=${categorySelected} 의 해당하는 대사를 실제 영화나 드라마에 다왔던 대사 한 줄글로 내놔 어떤 스크립트인지는 알려주지 말고 ':' 표시 없고 특수문자 없이 40자 이상 60자 이내로`
    )
    return response.data
  }
  catch (error){
    console.log(error)
  }
}

