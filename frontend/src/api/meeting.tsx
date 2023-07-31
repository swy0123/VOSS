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
  console.log("getMeet@@@@@@@@@@@@@@");
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
      console.log(response.data);
      console.log([...response.data.content]);
      ttmp = [...response.data.content];
    })
    .catch((error) => {
      console.log(error);
      ttmp = [];
    });
  return ttmp;
};

export interface PostMeetJoinProps {
  password: string;
  meetRoomId: number;
}

export const joinMeet = async (postMeetJoinProps: any) => {
  console.log("postMeetJoin");
  console.log(postMeetJoinProps.props);
  const data = postMeetJoinProps.props.password ? {
    password: postMeetJoinProps.props.password,
    meetRoomId: postMeetJoinProps.props.meetRoomId
  } : {
    meetRoomId: postMeetJoinProps.props.meetRoomId
  }
  console.log(data);

  console.log("되라");
  const res = await privateApi.post("/meet/join", data);
  console.log(res);
  if (res.data.status === "입장") {
    console.log("입장함");
    return res.data.token;
  }
  console.log("못함");
  return "false";
};

export const deleteMeet = async (postMeetJoinProps: any) => {
  console.log("deleteMeet");
  console.log(postMeetJoinProps.props.meetRoomId);
  const res = await privateApi.delete("/meet/" + postMeetJoinProps.props.meetRoomId);
  console.log("deleteMeet되라");
  console.log(res);
  if (res.data.status === "퇴장 성공") {
    console.log("퇴장 성공");
  }
  else console.log("퇴장 못함");
};




export interface addRoomData {
  title: string;
  maxCount: number;
  password: string;
  category: string;
}

export const createMeet = async ({ addRoomData }: { addRoomData: addRoomData }) => {
  console.log("createMeet");
  console.log(addRoomData)
  const addNewRoomData = (addRoomData.password==undefined) ? {
    title: addRoomData.title,
    maxCount: addRoomData.maxCount,
    password: addRoomData.password,
    category: addRoomData.category,
  } : {
    title: addRoomData.title,
    maxCount: addRoomData.maxCount,
    category: addRoomData.category,
  }
  console.log(addNewRoomData);
  const res = await privateApi.post("/meet", addNewRoomData);
  console.log("createMeet되라");
  console.log(res);
  return res.data.meetRoomId;
};

