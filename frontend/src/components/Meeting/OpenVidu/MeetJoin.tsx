import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { useCallback, useEffect, useState } from "react";
import UserVideoComponent from "./UserVideoComponent";
import { MeetRoomData, MeetingProps, getBadgeList, joinMeet } from "../../../api/meeting";

import { useRecoilState, useRecoilValue } from "recoil";
import { CurrentUserAtom } from "../../../recoil/Auth";
import { useNavigate } from "react-router-dom";
import {
  Container,
  // Chat,
  VideoContainer,
  // StreamContainerWrapper,
  StreamContainer,
  ChatBox,
  Session,
  ToolBar,
  Header,
  VedioInnerDiv,
  HeaderText,
} from "./MeetJoin.style";
import ChatComponent, { ChatProps } from "./ChatComponent";
import ToolbarComponent from "./ToolbarComponent";
import BadgeModal from "./BadgeModal";
import { MeetDubRecordState, meetDubSelectState, meetDubUserState } from "/src/recoil/HW_Atom";
// import { VedioInnerDiv } from "./UserVideoComponent.style";

export interface streamContainerProps {
  curCount: number;
  bottomOn: boolean;
}


export interface ModalDefaultType {
  onClickToggleModal: () => void;
  badgeList: BadgeData[] | undefined;
}

export interface BadgeData {
  id: number;
  name: string;
}

// export interface MeetJoinProps {
//   token: string;
//   bottomOn: boolean;
// }
// {props}:{props:MeetJoinProps}
//https://i9b106.p.ssafy.io/openvidu/api/sessions/ses_GseS0kJaEF/connection"
const MeetJoin = (props: any) => {
  const navigate = useNavigate();
  const currentUser = useRecoilValue(CurrentUserAtom);
  const [mySessionId, setMySessionId] = useState(currentUser.userId);
  const [myUserName, setMyUserName] = useState(currentUser.nickname);
  const [userEmail, setUserEmail] = useState("");
  const [session, setSession] = useState<any>(undefined);
  const [publisher, setPublisher] = useState<any>(undefined);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [meetDubUser, setMeetDubUser] = useRecoilState<number>(meetDubUserState);
  const [chatActive, setChatActive] = useState(false);

  const [connectionId, setConnectionId] = useState("");
  const [nickname, setNickname] = useState(currentUser.nickname);
  const [videoActive, setVideoActive] = useState(true);
  const [audioActive, setAudioActive] = useState(true);
  const [streamManagerTmp, setStreamManagerTmp] = useState<any>(undefined);
  const [curCount, setCurCount] = useState(0);

  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [badgeList, setBadgeList] = useState<BadgeData[]>();

  const [time, setTime] = useState(0);
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  const [meetDubSelect, setMeetDubSelect] = useRecoilState<number>(meetDubSelectState);
  const [meetDubRecord, setMeetDubRecord] = useRecoilState(MeetDubRecordState)

  //뒤로가기 새로고침
  useEffect(() => {
    console.log("MeetJoin------------");
    console.log(props.roomData.token);
    console.log(props.bottomOn);

    const prevPage = localStorage.getItem("prevPage");
    if (prevPage === "/meeting") {
      joinSession(); //이건 필요
    } else {
      leaveSession();
      navigate("/meeting");
    }

    (() => {
      // window.addEventListener("beforeunload", onbeforeunload);
      // window.addEventListener("popstate", popstateHandler);
    })();

    
    getBadge();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setTime(() => time + 1);
      setHour(Math.floor((time % 21600) / 3600));
      setMin(Math.floor((time % 3600) / 60));
      setSec(time % 60);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [time]);

  // useEffect(() => {
  //   if (messageReceived && chatDisplay === "none") {
  //     setMessageReceived(false);
  //   }
  // }, [messageReceived, chatDisplay]);

  useEffect(() => {
    setCurCount(subscribers.length + 1);
    setMeetDubUser(subscribers.length + 1);

    if (subscribers.length > 0) {
      session.on("signal:userChanged", (event: any) => {
        let remoteUsers = [...subscribers];
        console.log(remoteUsers);
        remoteUsers.forEach((user) => {
          if (user.stream.connection.connectionId === event.from.connectionId) {
            const data = JSON.parse(event.data);
            console.log("EVENTO REMOTE: ", event.data);
            if (data.isAudioActive !== undefined) {
              user.audioActive = (data.isAudioActive);
            }
            if (data.isVideoActive !== undefined) {
              user.videoActive = (data.isVideoActive);
            }
          }
        });

        console.log("remoteUsers 초 비사아아아아앙2222222");
        console.log(remoteUsers);
        setSubscribers(remoteUsers);
      });
    }


  }, [subscribers]);

  //뒤로가기 새로고침
  const onbeforeunload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    navigate("/meeting");
    leaveSession();
  };
  //뒤로가기 새로고침
  const popstateHandler = () => {
    navigate("/meeting");
    leaveSession();
  };

  const getBadge = async () => {
    const response = await getBadgeList();
    setBadgeList([...response]);
  };

  const toggleChat = () => {
    setChatActive(!chatActive);
  };

  const deleteSubscriber = (streamManager: any) => {
    setSubscribers((prevSubscribers) => prevSubscribers.filter((sub) => sub !== streamManager));
  };

  const goMeetingBoard = () => {
    navigate("/meeting");
  };

  const joinSession = async () => {
    // --- 1) Get an OpenVidu object ---
    const OV = new OpenVidu();

    // --- 2) Init a session ---
    const mySession = OV.initSession();
    setSession(mySession);

    // --- 3) Specify the actions when events take place in the session ---
    mySession.on("streamCreated", async (event) => {
      // event.stream.streamId = currentUser.email;
      const subscriber = mySession.subscribe(event.stream, "");

      console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
      console.log(subscriber);

      await setSubscribers((subscribers) => [...subscribers, subscriber]);
      setConnectionId(event.stream.connection.connectionId);

      console.log(subscriber);
    });

    mySession.on("streamDestroyed", (event) => {
      console.log("streamDestroyed");
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    console.log(mySession);

    // --- 4) Connect to the session with a valid user token ---
    try {
      // const token = await getToken();
      console.log(props.roomData.token);

      await mySession.connect(props.roomData.token, { clientData: currentUser.email });

      const devices = await OV.getDevices();
      console.log("devices");
      console.log(devices);
      const videoDevices = devices.filter((device) => device.kind === "videoinput");

      // --- 5) Get your own camera stream ---
      const newPublisher = OV.initPublisher("", {
        videoSource: videoDevices[1]?.deviceId,
        publishAudio: !audioActive,
        publishVideo: !videoActive,
        frameRate: 30,
        mirror: false,
        // insertMode: 'APPEND',
      });

      newPublisher.id = currentUser.email;
      await mySession.publish(newPublisher);
      setPublisher(newPublisher);
      console.log(newPublisher);
      // console.log(publisher);
      console.log(subscribers);
    } catch (error: any) {
      console.log("There was an error connecting to the session:", error.code, error.message);
      leaveSession();
    }
  };

  const leaveSession = () => {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    if (session) {
      setMeetDubSelect(0)
      setMeetDubRecord("")
      session.disconnect();
    }

    // Empty all properties...
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("SessionA");
    setMyUserName("Participant" + Math.floor(Math.random() * 100));
    setPublisher(undefined);
    goMeetingBoard();
  };

  // interface userChanged {}
  const sendSignalUserChanged = (data: any) => {
    const signalOptions = {
      data: JSON.stringify(data),
      type: "userChanged",
    };
    session.signal(signalOptions);
  };

  const camStatusChanged = () => {
    setVideoActive(!videoActive);
    console.log(videoActive);
    publisher.publishVideo(videoActive);
    sendSignalUserChanged({ isVideoActive: videoActive });
  };

  const micStatusChanged = () => {
    setAudioActive(!audioActive);
    console.log(audioActive);
    publisher.publishAudio(audioActive);
    sendSignalUserChanged({ isAudioActive: audioActive });
  };

  const nicknameChanged = (nickname: string) => {
    setNickname(nickname);
    sendSignalUserChanged({ nickname: nickname });
  };

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const streamContainerProps: streamContainerProps = {
    curCount: curCount,
    bottomOn: props.bottomOn,
  };

  return (
    <Container>
      <Header id="session-header">
        {props.roomData !== undefined ? (
          <>
            <HeaderText>{props.roomData.title} </HeaderText>{" "}
            <span style={{ fontSize: "10px", color: "gray" }}>
              &#40;{curCount}/{props.roomData.maxCount}&#41;
            </span>
          </>
        ) : (
          <></>
        )}
        <HeaderText>
          {hour.toString().length < 2 ? "0" + hour : hour}:
          {min.toString().length < 2 ? "0" + min : min}:
          {sec.toString().length < 2 ? "0" + sec : sec}
        </HeaderText>
      </Header>
      {session !== undefined ? (
        <Session id="session">
          <VideoContainer>
            {publisher !== undefined ? (
              <StreamContainer $streamContainerProps={streamContainerProps}>
                {/* <>{JSON.parse(publisher.connection.data).clientData}</> */}
                {/* <>{publisher.connection}</> */}
                <UserVideoComponent streamManager={publisher} videoActive={videoActive} />
              </StreamContainer>
            ) : null}
            {subscribers.map((sub, i) => (
              <StreamContainer key={i} $streamContainerProps={streamContainerProps}>
                {/* <>{JSON.parse(publisher.connection.data).clientData}</> */}
                {/* <>{sub.connection}</> */}
                <UserVideoComponent
                  streamManager={sub}
                  onClickToggleModal={onClickToggleModal}
                  isOpenModal={isOpenModal}
                  isAudioActive={sub.audioActive}
                  isVedioActive={sub.videoActive}
                />
              </StreamContainer>
            ))}
          </VideoContainer>
        </Session>
      ) : (
        <button onClick={joinSession}></button>
      )}
      {session !== undefined ? (
        <ChatBox $chatActive={chatActive}>
          {streamManagerTmp !== undefined ? (
            <ChatComponent
              chatProps={{
                connectionIdProps: connectionId,
                nicknameProps: nickname,
                streamManagerProps: streamManagerTmp,
                bottomOn: props.bottomOn,
              }}
            />
          ) : publisher !== undefined ? (
            <ChatComponent
              chatProps={{
                connectionIdProps: connectionId,
                nicknameProps: nickname,
                streamManagerProps: publisher,
                bottomOn: props.bottomOn,
              }}
            />
          ) : (
            <></>
          )}
        </ChatBox>
      ) : (
        <></>
      )}

      <ToolBar>
        <ToolbarComponent
          sessionId={mySessionId}
          audioActive={audioActive}
          videoActive={videoActive}
          chatActive={chatActive}
          // showNotification={messageReceived}
          camStatusChanged={camStatusChanged}
          micStatusChanged={micStatusChanged}
          toggleChat={toggleChat}
          // switchCamera={this.switchCamera}
          leaveSession={leaveSession}
        />
      </ToolBar>

      {isOpenModal && <BadgeModal onClickToggleModal={onClickToggleModal} badgeList={badgeList}>방 만들기</BadgeModal>}
    </Container>
  );
};

export default MeetJoin;
