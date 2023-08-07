import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { ChangeEvent, useEffect, useState } from "react";
import UserVideoComponent from "./UserVideoComponent";
import { MeetRoomData, MeetingProps, joinMeet } from "../../../api/meeting";

import { useRecoilValue } from "recoil";
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
} from "./MeetJoin.style";
import ChatComponent, { ChatProps } from "./ChatComponent";
import ToolbarComponent from "./ToolbarComponent";
// import { VedioInnerDiv } from "./UserVideoComponent.style";

export interface streamContainerProps {
  curCount: number;
  bottomOn: boolean;
}
//https://i9b106.p.ssafy.io/openvidu/api/sessions/ses_GseS0kJaEF/connection"
const MeetJoin = ({ props }: { props: MeetingProps }) => {
  const navigate = useNavigate();
  const currentUser = useRecoilValue(CurrentUserAtom);
  const [mySessionId, setMySessionId] = useState(currentUser.userId);
  const [myUserName, setMyUserName] = useState(currentUser.nickname);
  const [session, setSession] = useState<any>(undefined);
  const [publisher, setPublisher] = useState<any>(undefined);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [chatActive, setChatActive] = useState(true);
  const [messageReceived, setMessageReceived] = useState(false);

  const [connectionId, setConnectionId] = useState("");
  const [nickname, setNickname] = useState(currentUser.nickname);
  const [videoActive, setVideoActive] = useState(true);
  const [audioActive, setAudioActive] = useState(true);
  const [streamManagerTmp, setStreamManagerTmp] = useState<any>(undefined);
  const [curCount, setCurCount] = useState(0);

  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", onbeforeunload);
      window.addEventListener("popstate", popstateHandler);
    })();
    joinSession();

    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
      window.removeEventListener("popstate", popstateHandler);
    };
  }, []);

  // useEffect(() => {
  //   if (messageReceived && chatDisplay === "none") {
  //     setMessageReceived(false);
  //   }
  // }, [messageReceived, chatDisplay]);

  useEffect(() => {
    setCurCount(subscribers.length + 1)
  }, [subscribers]);

  const onbeforeunload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    alert("onbeforeunload");
    leaveSession();
  };

  const popstateHandler = () => {
    alert("popstateHandler");
    leaveSession();
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
      console.log(token);

      await mySession.connect(token, { clientData: myUserName });

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

      await mySession.publish(newPublisher);
      // await mySession.publish(newPublisher).then(() => {
      //   updateSubscribers();
      //   localUserAccessAllowed = true;
      //   if (this.props.joinSession) {
      //     this.props.joinSession();
      //   }
      // });

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
    // sendSignalUserChanged({ isVideoActive: videoActive });
  };

  const micStatusChanged = () => {
    setAudioActive(!audioActive);
    console.log(audioActive);
    publisher.publishAudio(audioActive);
    // sendSignalUserChanged({ isAudioActive: audioActive });
  };

  const nicknameChanged = (nickname: string) => {
    setNickname(nickname);
    sendSignalUserChanged({ nickname: nickname });
  };

  //-----------------------------------

  const getToken = async () => {
    console.log("getToken call postMeetJoin : ");
    const res = await joinMeet(props);
    if (res.message !== undefined) alert(res.message);
    return res.token;
  };

  // const chatProps: ChatProps = {
  //   connectionIdProps: connectionId,
  //   nicknameProps: nickname,
  //   streamManagerProps: streamManagerTmp,
  //   chatDisplayProps: chatDisplay,
  //   // close: toggleChat,
  //   messageReceived: checkNotification,
  // };


  const streamContainerProps: streamContainerProps = {
    curCount: curCount,
    bottomOn: props.bottomOn,
  }

  return (
    <Container>
      <Header id="session-header">
        <span>{curCount} : {props.bottomOn}</span>
        <span>{mySessionId}</span>
      </Header>
      {session !== undefined ? (
        <Session id="session" $chatActive={chatActive}>
          <VideoContainer>
            {publisher !== undefined ? (
              <StreamContainer $streamContainerProps={streamContainerProps}>
                <UserVideoComponent streamManager={publisher} />
              </StreamContainer>
            ) : null}
            {subscribers.map((sub, i) => (
              <StreamContainer key={i} $streamContainerProps={streamContainerProps}>
                <UserVideoComponent streamManager={sub} />
              </StreamContainer>
            ))}
          </VideoContainer>
        </Session>
      ) : (
        <button onClick={joinSession}></button>
      )}
      {session !== undefined ? (
        <ChatBox $chatActive={chatActive}>
          {streamManagerTmp !== undefined ? <ChatComponent chatProps={{
            connectionIdProps: connectionId,
            nicknameProps: nickname,
            streamManagerProps: streamManagerTmp,
          }} /> : publisher !== undefined ? <ChatComponent chatProps={{
            connectionIdProps: connectionId,
            nicknameProps: nickname,
            streamManagerProps: publisher,
          }} /> : <></>}
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
    </Container>
  );
};

export default MeetJoin;
