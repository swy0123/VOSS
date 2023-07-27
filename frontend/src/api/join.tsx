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

export const postTest = async (user:JoinProps) => {
    const tmp = {
        "name" : user.nickname,
        "age" : 12
    }
    const response = await publicApi.post("/auth/post-test", tmp);

    console.log(response);
}