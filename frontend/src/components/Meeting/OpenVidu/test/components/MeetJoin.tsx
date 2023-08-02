import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { ChangeEvent, useEffect, useState } from "react";
import UserVideoComponent from "./UserVideoComponent";
import { MeetRoomData, MeetingProps, joinMeet } from "../../../api/meeting";

import { useRecoilValue } from "recoil";
import { CurrentUserAtom } from "../../../recoil/Auth";
import { useNavigate } from "react-router-dom";

import UserModel from "./models/UserModel";

import {
  Container, Header, StudyTitle, Middle, Left, Right, Chat, VideoContainer, StreamContainerWrapper
  , StreamContainer, Bottom, BottomBox, Icon, ChatIconBox
} from "./MeetJoin.style";

let localUser = new UserModel();
//https://i9b106.p.ssafy.io/openvidu/api/sessions/ses_GseS0kJaEF/connection"
const MeetJoin = ({ props }: { props: MeetingProps }) => {

  const navigate = useNavigate();
  const currentUser = useRecoilValue(CurrentUserAtom);
  const [mySessionId, setMySessionId] = useState(currentUser.userId);
  const [myUserName, setMyUserName] = useState(currentUser.nickname);
  const [session, setSession] = useState<any>(undefined);
  const [publisher, setPublisher] = useState<any>(undefined);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [localUserState, setLocalUserState] = useState(undefined);
  const [chatDisplay, setChatDisplay] = useState('none');
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);
  const [showExtensionDialog, setShowExtensionDialog] = useState(false);
  const [messageReceived, setMessageReceived] = useState(false);

  const remotes = [];
  let localUserAccessAllowed = false;
  let OV;

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

  const onbeforeunload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    alert("onbeforeunload")
    leaveSession();
  };

  const popstateHandler = () => {
    alert("popstateHandler")
    leaveSession();
  };

  // useEffect(() => {
  //   const openViduLayoutOptions = {
  //     maxRatio: 3 / 2,
  //     minRatio: 9 / 16,
  //     fixedRatio: false,
  //     bigClass: 'OV_big',
  //     bigPercentage: 0.8,
  //     bigFixedRatio: false,
  //     bigMaxRatio: 3 / 2,
  //     bigMinRatio: 9 / 16,
  //     bigFirst: true,
  //     animate: true,
  //   };

  //   layout.initLayoutContainer(document.getElementById('layout'), openViduLayoutOptions);
  //   window.addEventListener('beforeunload', onbeforeunload);
  //   window.addEventListener('resize', updateLayout);
  //   window.addEventListener('resize', checkSize);
  //   joinSession();

  //   return () => {
  //     window.removeEventListener('beforeunload', onbeforeunload);
  //     window.removeEventListener('resize', updateLayout);
  //     window.removeEventListener('resize', checkSize);
  //     leaveSession();
  //   };
  // }, []);

  // const onbeforeunload = (event) => {
  //   leaveSession();
  // };



  const deleteSubscriber = (streamManager: any) => {
    setSubscribers((prevSubscribers) => prevSubscribers.filter((sub) => sub !== streamManager));
  };

  const goMeetingBoard = () => { navigate("/meeting") }

  const joinSession = async () => {

    // --- 1) Get an OpenVidu object ---
    OV = new OpenVidu();

    // --- 2) Init a session ---
    const mySession = OV.initSession();
    setSession(mySession);

    // --- 3) Specify the actions when events take place in the session ---
    mySession.on("streamCreated", (event) => {
      const subscriber = mySession.subscribe(event.stream, "");
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
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

      await OV.getUserMedia({ audioSource: undefined, videoSource: undefined });
      const devices = await OV.getDevices();
      console.log("devices");
      console.log(devices);
      const videoDevices = devices.filter((device) => device.kind === "videoinput");

      // --- 5) Get your own camera stream ---
      const newPublisher = OV.initPublisher(undefined, {
        audioSource: undefined,
        videoSource: videoDevices[0].deviceId,
        publishAudio: localUser.isAudioActive(),
        publishVideo: localUser.isVideoActive(),
        resolution: '640x480',
        frameRate: 30,
        insertMode: 'APPEND',
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

  //--------------------------------

  const camStatusChanged = () => {
    localUser.setVideoActive(!localUser.isVideoActive());
    localUser.getStreamManager().publishVideo(localUser.isVideoActive());
    this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
    this.setState({ localUser: localUser });
  }

  const micStatusChanged = () => {
    localUser.setAudioActive(!localUser.isAudioActive());
    localUser.getStreamManager().publishAudio(localUser.isAudioActive());
    this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
    this.setState({ localUser: localUser });
  }

  const nicknameChanged = (nickname) => {
    let localUser = this.state.localUser;
    localUser.setNickname(nickname);
    this.setState({ localUser: localUser });
    this.sendSignalUserChanged({ nickname: this.state.localUser.getNickname() });
  }

  const deleteSubscriber = (stream) => {
    const remoteUsers = this.state.subscribers;
    const userStream = remoteUsers.filter((user) => user.getStreamManager().stream === stream)[0];
    let index = remoteUsers.indexOf(userStream, 0);
    if (index > -1) {
      remoteUsers.splice(index, 1);
      this.setState({
        subscribers: remoteUsers,
      });
    }
  }

  const subscribeToStreamCreated = () => {
    this.state.session.on('streamCreated', (event) => {
      const subscriber = this.state.session.subscribe(event.stream, undefined);
      // var subscribers = this.state.subscribers;
      subscriber.on('streamPlaying', (e) => {
        this.checkSomeoneShareScreen();
        subscriber.videos[0].video.parentElement.classList.remove('custom-class');
      });
      const newUser = new UserModel();
      newUser.setStreamManager(subscriber);
      newUser.setConnectionId(event.stream.connection.connectionId);
      newUser.setType('remote');
      const nickname = event.stream.connection.data.split('%')[0];
      newUser.setNickname(JSON.parse(nickname).clientData);
      this.remotes.push(newUser);
      if (this.localUserAccessAllowed) {
        this.updateSubscribers();
      }
    });
  }

  const subscribeToStreamDestroyed = () => {
    // On every Stream destroyed...
    this.state.session.on('streamDestroyed', (event) => {
      // Remove the stream from 'subscribers' array
      this.deleteSubscriber(event.stream);
      setTimeout(() => {
        this.checkSomeoneShareScreen();
      }, 20);
      event.preventDefault();
      this.updateLayout();
    });
  }

  const subscribeToUserChanged = () => {
    this.state.session.on('signal:userChanged', (event) => {
      let remoteUsers = this.state.subscribers;
      remoteUsers.forEach((user) => {
        if (user.getConnectionId() === event.from.connectionId) {
          const data = JSON.parse(event.data);
          console.log('EVENTO REMOTE: ', event.data);
          if (data.isAudioActive !== undefined) {
            user.setAudioActive(data.isAudioActive);
          }
          if (data.isVideoActive !== undefined) {
            user.setVideoActive(data.isVideoActive);
          }
          if (data.nickname !== undefined) {
            user.setNickname(data.nickname);
          }
          if (data.isScreenShareActive !== undefined) {
            user.setScreenShareActive(data.isScreenShareActive);
          }
        }
      });
      this.setState(
        {
          subscribers: remoteUsers,
        },
        () => this.checkSomeoneShareScreen(),
      );
    });
  }

  // updateLayout() {
  //   setTimeout(() => {
  //     this.layout.updateLayout();
  //   }, 20);
  // }

  const sendSignalUserChanged = (data) => {
    const signalOptions = {
      data: JSON.stringify(data),
      type: 'userChanged',
    };
    this.state.session.signal(signalOptions);
  }

  // const toggleFullscreen() {
  //   const document = window.document;
  //   const fs = document.getElementById('container');
  //   if (
  //     !document.fullscreenElement &&
  //     !document.mozFullScreenElement &&
  //     !document.webkitFullscreenElement &&
  //     !document.msFullscreenElement
  //   ) {
  //     if (fs.requestFullscreen) {
  //       fs.requestFullscreen();
  //     } else if (fs.msRequestFullscreen) {
  //       fs.msRequestFullscreen();
  //     } else if (fs.mozRequestFullScreen) {
  //       fs.mozRequestFullScreen();
  //     } else if (fs.webkitRequestFullscreen) {
  //       fs.webkitRequestFullscreen();
  //     }
  //   } else {
  //     if (document.exitFullscreen) {
  //       document.exitFullscreen();
  //     } else if (document.msExitFullscreen) {
  //       document.msExitFullscreen();
  //     } else if (document.mozCancelFullScreen) {
  //       document.mozCancelFullScreen();
  //     } else if (document.webkitExitFullscreen) {
  //       document.webkitExitFullscreen();
  //     }
  //   }
  // }

  // async switchCamera() {
  //     try {
  //       const devices = await this.OV.getDevices()
  //       var videoDevices = devices.filter(device => device.kind === 'videoinput');

  //       if (videoDevices && videoDevices.length > 1) {

  //         var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

  //         if (newVideoDevice.length > 0) {
  //           // Creating a new publisher with specific videoSource
  //           // In mobile devices the default and first camera is the front one
  //           var newPublisher = this.OV.initPublisher(undefined, {
  //             audioSource: undefined,
  //             videoSource: newVideoDevice[0].deviceId,
  //             publishAudio: localUser.isAudioActive(),
  //             publishVideo: localUser.isVideoActive(),
  //             mirror: true
  //           });

  //           //newPublisher.once("accessAllowed", () => {
  //           await this.state.session.unpublish(this.state.localUser.getStreamManager());
  //           await this.state.session.publish(newPublisher)
  //           this.state.localUser.setStreamManager(newPublisher);
  //           this.setState({
  //             currentVideoDevice: newVideoDevice,
  //             localUser: localUser,
  //           });
  //         }
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }

  // screenShare() {
  //   const videoSource = navigator.userAgent.indexOf('Firefox') !== -1 ? 'window' : 'screen';
  //   const publisher = this.OV.initPublisher(
  //     undefined,
  //     {
  //       videoSource: videoSource,
  //       publishAudio: localUser.isAudioActive(),
  //       publishVideo: localUser.isVideoActive(),
  //       mirror: false,
  //     },
  //     (error) => {
  //       if (error && error.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
  //         this.setState({ showExtensionDialog: true });
  //       } else if (error && error.name === 'SCREEN_SHARING_NOT_SUPPORTED') {
  //         alert('Your browser does not support screen sharing');
  //       } else if (error && error.name === 'SCREEN_EXTENSION_DISABLED') {
  //         alert('You need to enable screen sharing extension');
  //       } else if (error && error.name === 'SCREEN_CAPTURE_DENIED') {
  //         alert('You need to choose a window or application to share');
  //       }
  //     },
  //   );

  //   publisher.once('accessAllowed', () => {
  //     this.state.session.unpublish(localUser.getStreamManager());
  //     localUser.setStreamManager(publisher);
  //     this.state.session.publish(localUser.getStreamManager()).then(() => {
  //       localUser.setScreenShareActive(true);
  //       this.setState({ localUser: localUser }, () => {
  //         this.sendSignalUserChanged({ isScreenShareActive: localUser.isScreenShareActive() });
  //       });
  //     });
  //   });
  //   publisher.on('streamPlaying', () => {
  //     this.updateLayout();
  //     publisher.videos[0].video.parentElement.classList.remove('custom-class');
  //   });
  // }

  const closeDialogExtension = () => {
    this.setState({ showExtensionDialog: false });
  }

  // stopScreenShare() {
  //   this.state.session.unpublish(localUser.getStreamManager());
  //   this.connectWebCam();
  // }

  // checkSomeoneShareScreen() {
  //   let isScreenShared;
  //   // return true if at least one passes the test
  //   isScreenShared = this.state.subscribers.some((user) => user.isScreenShareActive()) || localUser.isScreenShareActive();
  //   const openviduLayoutOptions = {
  //     maxRatio: 3 / 2,
  //     minRatio: 9 / 16,
  //     fixedRatio: isScreenShared,
  //     bigClass: 'OV_big',
  //     bigPercentage: 0.8,
  //     bigFixedRatio: false,
  //     bigMaxRatio: 3 / 2,
  //     bigMinRatio: 9 / 16,
  //     bigFirst: true,
  //     animate: true,
  //   };
  //   this.layout.setLayoutOptions(openviduLayoutOptions);
  //   this.updateLayout();
  // }

  const toggleChat = (property) => {
    let display = property;

    if (display === undefined) {
      display = this.state.chatDisplay === 'none' ? 'block' : 'none';
    }
    if (display === 'block') {
      this.setState({ chatDisplay: display, messageReceived: false });
    } else {
      console.log('chat', display);
      this.setState({ chatDisplay: display });
    }
    this.updateLayout();
  }

  const checkNotification(event) {
    this.setState({
      messageReceived: this.state.chatDisplay === 'none',
    });
  }
  // checkSize() {
  //   if (document.getElementById('layout').offsetWidth <= 700 && !this.hasBeenUpdated) {
  //     this.toggleChat('none');
  //     this.hasBeenUpdated = true;
  //   }
  //   if (document.getElementById('layout').offsetWidth > 700 && this.hasBeenUpdated) {
  //     this.hasBeenUpdated = false;
  //   }
  // }



  //--------------------------------



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
        </div>
      ) : (<div onClick={goMeetingBoard}>이전 화면으로 돌아가기</div>)}

      {/* <div color="inherit" onClick={()=>{toggleChat(props)}} id="navChatButton">
        <div title="Chat">
          chat
        </div>
      </div> */}

    </Container>
  );
};

export default MeetJoin;
