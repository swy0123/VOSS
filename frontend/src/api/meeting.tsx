import { privateApi } from "./";

// /meet
// https://i9b106.p.ssafy.io:8080/meet?title=미팅&category=DUB&page=0&limit=10
export interface GetMeetProps {
  title: string;
  category: string;
  page: string;
  limit: string;
}

export const getMeet = async (getMeetProps: GetMeetProps) => {
  console.log("-----getMeet-----");
  console.log(getMeetProps);
  const URL =
    "/meet?title=" +
    getMeetProps.title +
    "&category=" +
    getMeetProps.category +
    "&page=" +
    getMeetProps.page +
    "&limit=" +
    getMeetProps.limit;
  console.log(URL);
  let config = {
    method: "get",
    url: URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  let ttmp: any = []
  await privateApi
    .request(config)
    .then((response) => {
      console.log("response.data!!!!!!!!");
      console.log([...response.data]);
      ttmp = [...response.data];
    })
    .catch((error) => {
      console.log(error);
      ttmp = [];
    });
  return ttmp;
};

export interface MeetingProps {
  password: string;
  meetRoomId: number;
}
export const joinMeet = async (postMeetJoinProps: MeetingProps) => {
  console.log("-----postMeetJoin-----");
  console.log(postMeetJoinProps);
  const data = (postMeetJoinProps.password !== undefined) ? {
    password: postMeetJoinProps.password,
    meetRoomId: postMeetJoinProps.meetRoomId
  } : {
    password: "",
    meetRoomId: postMeetJoinProps.meetRoomId
  }
  console.log(data);

  console.log("joinMeet되라");
  const res = await privateApi.post("/meet/join", data);
  console.log(res.data);
  if (res.data.status === "입장") {
    console.log("입장함");
    return res.data.token;
  }
  console.log("못함");
  return "false";
};

export interface MeetRoomData{
  category: string,
  createdAt: number,
  currentCount: number,
  maxCount: number,
  meetRoomId: number,
  password: string
  sessionId: string,
  title: string,
}

export interface addRoomData {
  title: string,
  maxCount:number,
  password: string,
  category: string
}

export const createMeet = async ({ addRoomData }: { addRoomData: addRoomData }) => {
  console.log("-----createMeet-----");
  const res = await privateApi.post("/meet", addRoomData);
  console.log("createMeet되라");
  console.log(res);
  return res.data.meetRoomId;
};

