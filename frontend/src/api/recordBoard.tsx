import axios from "axios";
import { privateApi } from ".";
const BASE_URL = "https://i9b106.p.ssafy.io:8080";


export const getRecords = async ( sort: string, cond: string, input: string, page: number) => {
  let sortinput = ""
  let condinput = ""
  if (sort !== "1") {
      if (sort === "2") { sortinput = "sort=hit&" } 
      else { sortinput = "sort=like&" }         
  }
  if (input.length > 0) {
      if (cond === "1") { condinput = `title=${input}&` }
      else if (cond === "2") { condinput = `content=${input}&`}
      else { condinput = `nickname=${input}&` }
  }

  const res = await privateApi.get(`/recordboard?${sortinput}${condinput}page=${page-1}`)
  .catch(err => {
      console.log("getRecords catch: ", err)
  })
  if (res) {
      console.log("getRecords then: ", res.data)
      return(res.data)
  }
  return false
};