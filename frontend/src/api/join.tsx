import axios from "axios";
import { publicApi } from ".";

interface JoinProps {
    email: string,
    password: string,
    nickname: string
}
// http://i9b106.p.ssafy.io:8080/
// http://wonyoung210.p-e.kr:8080/member
export const postJoin = async (user:JoinProps) => {
    console.log(user + JSON.stringify(user));
    console.log("join");
    const response = await publicApi.post("/member", user);
    console.log(response.data);
    return response.data;
}

export const authEmail = async (email:string) => {
    const user = {email:email};
    console.log(user);
    const response = await publicApi.post("/auth/email", user);
    console.log(response.data.sendSuccess);
    return response.data.sendSuccess;
}

export interface ConfirmProps {
    email: string,
    token: string,
}
export const authEmailConfirm = async (confirm:ConfirmProps) => {
    console.log(confirm);
    const response = await publicApi.post("/auth/email/confirm", confirm);
    console.log(response.data.confirmed);
    return response.data.confirmed;
}



export const postTest = async (user:JoinProps) => {
    const tmp = {
        "name" : user.nickname,
        "age" : 12
    }
    const response = await publicApi.post("/auth/post-test", tmp);

    console.log(response);
}