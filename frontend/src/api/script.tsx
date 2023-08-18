import { AxiosResponse } from "axios"
import { privateApi } from "."

type AsyncFunction = (
  genderSelected: string, 
  ageSelected: string) => Promise<any>;

export const makeAnalysisScript: AsyncFunction = async(genderSelected,ageSelected) => {
  try{
    const response: AxiosResponse<string> = await privateApi.get<string>(
      `/practice/diction/script?cmd=${genderSelected} ${ageSelected} 배역의 영화, 드라마, tv 프로그램 등에서 나왔던 30초 분량의 대사 한 개 만들어줘.`
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
      `/practice/diction/script?cmd=${categorySelected} 분야에서 사용하는 30초 분량의 문장이나 대사 또는 해설 한 개 만들어줘.`
    )
    return response.data
  }
  catch (error){
    console.log(error)
  }
}

