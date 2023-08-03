import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { ChangeEvent, useEffect, useState } from "react";
import UserVideoComponent from "./UserVideoComponent";
import { MeetRoomData, MeetingProps, joinMeet } from "../../../api/meeting";

import { useRecoilValue } from "recoil";
import { CurrentUserAtom } from "../../../recoil/Auth";
import { useNavigate } from "react-router-dom";
import {
  Container, Header, StudyTitle, Middle, Left, Right, Chat, VideoContainer, StreamContainerWrapper
  , StreamContainer, Bottom, BottomBox, Icon, ChatIconBox
} from "./MeetJoin.style";
import ChatComponent, { ChatProps } from "./ChatComponent";

//https://i9b106.p.ssafy.io/openvidu/api/sessions/ses_GseS0kJaEF/connection"
const MeetJoin = ({ props }: { props: MeetingProps }) => {

  const navigate = useNavigate();
  const currentUser = useRecoilValue(CurrentUserAtom);
  const [mySessionId, setMySessionId] = useState(currentUser.userId);
  const [myUserName, setMyUserName] = useState(currentUser.nickname);
  const [session, setSession] = useState<any>(undefined);
  const [publisher, setPublisher] = useState<any>(undefined);
  const [subscribers, setSubscribers] = useState<any[]>([]);

  const [chatDisplay, setChatDisplay] = useState('display');
  const [messageReceived, setMessageReceived] = useState(false);

  const [connectionId, setConnectionId] = useState('');
  const [nickname, setNickname] = useState(currentUser.nickname);
  const [streamManagerTmp, setStreamManagerTmp] = useState<any>(undefined);


  useEffect(() => {
    // joinSession();
    (() => {
      window.addEventListener("beforeunload", onbeforeunload);
      window.addEventListener('popstate', popstateHandler);
    })();

    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
      window.removeEventListener('popstate', popstateHandler);
    };
  }, []);

  useEffect(() => {
    if (messageReceived && chatDisplay === 'none') {
      setMessageReceived(false);
    }
  }, [messageReceived, chatDisplay]);



  const onbeforeunload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    alert("onbeforeunload")
    leaveSession();
  };

  const popstateHandler = () => {
    alert("popstateHandler")
    leaveSession();
  };

  const toggleChat = (property: string|undefined) => {
    let display = property;

    if (display === undefined) {
      display = chatDisplay === 'none' ? 'block' : 'none';
    }
    if (display === 'block') {
      setChatDisplay(display);
      setMessageReceived(false);
    } else {
      console.log('chat', display);
      setChatDisplay(display);
    }
  }

  const checkNotification = () => {
    setMessageReceived(chatDisplay === 'none');
  }

  const deleteSubscriber = (streamManager: any) => {
    setSubscribers((prevSubscribers) => prevSubscribers.filter((sub) => sub !== streamManager));
  };

  const goMeetingBoard = () => { navigate("/meeting") }

  const joinSession = async () => {

    // --- 1) Get an OpenVidu object ---
    const OV = new OpenVidu();

    // --- 2) Init a session ---
    const mySession = OV.initSession();
    setSession(mySession);

    // --- 3) Specify the actions when events take place in the session ---
    mySession.on("streamCreated", (event) => {
      const subscriber = mySession.subscribe(event.stream, "");
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
      setConnectionId(event.stream.connection.connectionId);
      setStreamManagerTmp(subscriber);
      console.log("subscriber");
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
      const token = await getToken();
      // const token = "wss://i9b106.p.ssafy.io?sessionId=ses_UXKcN5AQPf&token=tok_ONEYdWpP5SvF0VEX";

      console.log("token : 동기화 문제 확인 이전");
      console.log(token);

      // await mySession.connect(token, { clientData: myUserName });
      await mySession.connect(token, { clientData: myUserName });

      console.log("token : 동기화 문제 확인 이후");
      console.log(token);

      const devices = await OV.getDevices();
      console.log("devices");
      console.log(devices);
      const videoDevices = devices.filter((device) => device.kind === "videoinput");

      // --- 5) Get your own camera stream ---
      const newPublisher = OV.initPublisher("", {
        videoSource: videoDevices[1]?.deviceId,
        publishAudio: true,
        publishVideo: true,
        mirror: false,
      });

      await mySession.publish(newPublisher);

      setPublisher(newPublisher);
    } catch (error: any) {
      console.log("There was an error connecting to the session:", error.code, error.message);
      leaveSession();
    }
  };

  const leaveSession = () => {
    alert("leaveSession");
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    if (session) {
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

  const switchCamera = async () => {
    try {
      const OV = new OpenVidu();
      const devices = await OV.getDevices();
      const videoDevices = devices.filter((device) => device.kind === "videoinput");

      if (videoDevices.length > 1) {
        const newVideoDevice = videoDevices.find(
          (device) =>
            device.deviceId !==
            publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId
        );

        if (newVideoDevice) {
          const newPublisher = OV.initPublisher("", {
            videoSource: newVideoDevice.deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          await session.unpublish(publisher);
          await session.publish(newPublisher);

          setPublisher(newPublisher);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getToken = async () => {
    console.log("getToken call postMeetJoin : ");
    const res = await joinMeet(props);
    if (res.message !== undefined) alert(res.message);
    return res.token;
  };

  const chatProps: ChatProps = {
    connectionIdProps: connectionId,
    nicknameProps: nickname,
    streamManagerProps: streamManagerTmp,
    chatDisplayProps: chatDisplay,
    close: toggleChat,
    messageReceived: checkNotification,
  }

  return (
    <Container>
      <Header>
        <StudyTitle>{currentUser.nickname}의 방</StudyTitle>
      </Header>

      <button onClick={joinSession}></button>
      {session !== undefined ? (

        <div id="session">
          <div id="session-header">
            <h1 id="session-title">{mySessionId}</h1>
            <input
              className="btn btn-large btn-danger"
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="Leave session"
            />
          </div>

          <VideoContainer>
            {publisher !== undefined ? (
              <StreamContainerWrapper
              >
                <UserVideoComponent streamManager={publisher} />
              </StreamContainerWrapper>
            ) : null}
            {subscribers.map((sub, i) => (
              <StreamContainer
                key={i}
                className="stream-container col-md-6 col-xs-6"
              >
                <UserVideoComponent streamManager={sub} />
              </StreamContainer>
            ))}
          </VideoContainer>
          <div>
          {
              (streamManagerTmp !== undefined) ? <ChatComponent chatProps={chatProps} /> :
             <>zzzzzzzzzzzzzzzzzzzzzzzz</>
            }
          </div>
        </div>
      ) : (<div onClick={goMeetingBoard}>이전 화면으로 돌아가기</div>)}
    </Container>
  );
};

export default MeetJoin;
