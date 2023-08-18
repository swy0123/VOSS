import axios from "axios";
import { privateApi } from ".";

const BASE_URL = "https://i9b106.p.ssafy.io:8080";

export const registVoiceFile = async ( blobURL: string ) => {
    const response = await fetch(blobURL);
    const blobData = await response.blob();
    let data = new FormData();
    const blob = new Blob([blobData], {type: "audio/webm;codecs=opus"})
    data.append('file', blob, "test.webm");
    let config = {
        method: 'post',
        url: `${BASE_URL}/game/upload?type=MEMBER`,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        data: data,
    }

    const res = await axios.request(config)
    .catch (err => {
        console.log("uploadFile catch: ", err);
        return false;
    });
    if(res) {
        console.log("uploadFile then: ", res)
        return res;
    }
    return false;
}

export const getGame = async () => {
    const res = await privateApi.get(`/game/10`)
    .catch(err => {
        console.log("getProfile catch: ", err)
    })
    if (res) {
        console.log("getProfile then: ", res.data)
        return res.data
    };
    return false
};