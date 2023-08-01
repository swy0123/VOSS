import axios from 'axios';
import { publicApi, privateApi } from ".";

export const getPostList = async (page: number ) => {
    const res = await privateApi.get(`/freeboard?page=${page}`)
    .catch(err => {
        console.log("getPostList catch: ", err)
    })
    if (res) {
        console.log("getPostList then: ", res.data)
        return(res.data)
    }
    return false
};