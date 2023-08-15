import axios from "axios";
import { privateApi } from ".";
import { PostFilesType } from "../type/FreeBoard";

const BASE_URL = "https://i9b106.p.ssafy.io:8080";


export const getRecords = async ( sort: string, cond: string, input: string, page: number) => {
  let sortinput = ""
  let condinput = ""
  if (sort !== "1") {
      if (sort === "2") { sortinput = "sort=hit&" } 
      else { sortinput = "sort=like&" }         
  }
  if (input.length > 0) {
      if (cond === "1") { condinput = `description=${input}&` }
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


export const uploadRecord = async (files: any) => {
    let data = new FormData();
    data.append('files', files[0]);
    let config = {
        method: 'post',
        url: `${BASE_URL}/recordboard/upload`,
        headers: { 
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        data: data,
    }

    const res = await axios.request(config)
    .catch (err => {
        console.log("uploadRecord catch: ", err);
        return false
    });
    if (res) {
        console.log("uploadRecord then: ", res.data)
        return res.data
    }
    return false
};


export const createRecord = async ( description: string, file: PostFilesType ) => {
    const res = await privateApi.post(`/recordboard`, {description, file})
    .catch(err => {
        console.log("createRecord catch: ", err)
    })
    if (res) {
        console.log("createRecord then: ", res.data)
        return true
    }
    return false
};


export const playRecord = async ( recordId: number) => {
    const res = await privateApi.put(`/recordboard/${recordId}/play`)
    .catch(err => {
        console.log("playRecord catch: ", err)
    })
    if (res) {
        console.log("playRecord then: ", res.data)
        return(res.data)
    }
    return false
};


export const deleteRecord = async ( recordId: number) => {
    const res = await privateApi.delete(`/recordboard/${recordId}`)
    .catch(err => {
        console.log("deleteRecord catch: ", err)
    })
    if (res) {
        console.log("deleteRecord then: ", res.data)
        return(res.data)
    }
    return false
};


export const recordLike = async ( recordId: number ) => {
    const res = await privateApi.post(`/recordboard/${recordId}/like`, )
    .catch(err => {
        console.log("recordLike catch: ", err)
    })
    if (res) {
        console.log("recordLike then: ", res.data)
        return(res.data)
    }
    return false
};


export const deleteLike = async ( recordId: number ) => {
    const res = await privateApi.delete(`/recordboard/${recordId}/like`, )
    .catch(err => {
        console.log("deleteLike catch: ", err)
    })
    if (res) {
        console.log("deleteLike then: ", res.data)
        return(res.data)
    }
    return false
};


export const getMyRecords = async (memberId: number, page: number) => {
    const res = await privateApi.get(`/recordboard/user-record/${memberId}?page=${page-1}`)
    .catch(err => {
        console.log("getMyRecords catch: ", err)
    })
    if (res) {
        console.log("getMyRecords then: ", res.data)
        return(res.data)
    }
    return false
};