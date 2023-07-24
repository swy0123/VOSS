import axios from "axios";
//수정
const BASE_URL = "http://wonyoung210.p-e.kr:8080";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

const token = localStorage.getItem("token") || "";
console.log(token);

const axiosWithAccessToken = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Token": token,
  },
});

export { axiosInstance, axiosWithAccessToken };