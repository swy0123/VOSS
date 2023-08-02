import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import ChatComponent from './chat/ChatComponent';
import DialogExtensionComponent from './dialog-extension/DialogExtension';
import StreamComponent from './stream/StreamComponent';
// import './VideoRoomComponent.css';

// import OpenViduLayout from '../layout/openvidu-layout';
import UserModel from '../models/user-model';
import ToolbarComponent from './toolbar/ToolbarComponent';

var localUser = new UserModel();
// const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000/';

const VideoRoomComponent = (props) => {
  const [hasBeenUpdated, setHasBeenUpdated] = useState(false);
  const [layout, setLayout] = useState(null);
  const [sessionName, setSessionName] = useState(props.sessionName ? props.sessionName : 'SessionA');
  const [userName, setUserName] = useState(props.user ? props.user : 'OpenVidu_User' + Math.floor(Math.random() * 100));
  const [remotes, setRemotes] = useState([]);
  const [localUserAccessAllowed, setLocalUserAccessAllowed] = useState(false);
  const [mySessionId, setMySessionId] = useState(sessionName);
  const [myUserName, setMyUserName] = useState(userName);
  const [session, setSession] = useState(null);
  const [localUserState, setLocalUserState] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [chatDisplay, setChatDisplay] = useState('none');
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
  const [showExtensionDialog, setShowExtensionDialog] = useState(false);
  const [messageReceived, setMessageReceived] = useState(false);

  useEffect(() => {
    // const openViduLayoutOptions = {
    //   maxRatio: 3 / 2,
    //   minRatio: 9 / 16,
    //   fixedRatio: false,
    //   bigClass: 'OV_big',
    //   bigPercentage: 0.8,
    //   bigFixedRatio: false,
    //   bigMaxRatio: 3 / 2,
    //   bigMinRatio: 9 / 16,
    //   bigFirst: true,
    //   animate: true,
    // };

    // setLayout(new OpenViduLayout());
    window.addEventListener('beforeunload', onbeforeunload);
    // window.addEventListener('resize', updateLayout);
    // window.addEventListener('resize', checkSize);

    joinSession();

    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
    //   window.removeEventListener('resize', updateLayout);
    //   window.removeEventListener('resize', checkSize);
      leaveSession();
    };
  }, []);

  useEffect(() => {
    if (messageReceived && chatDisplay === 'none') {
      setMessageReceived(false);
    }
  }, [messageReceived, chatDisplay]);

  const onbeforeunload = (event) => {
    leaveSession();
  };

  const joinSession = () => {
    const OV = new OpenVidu();

    setSession(OV.initSession());

    subscribeToStreamCreated();
    connectToSession();
  };

  const connectToSession = async () => {
    if (props.token !== undefined) {
      console.log('token received: ', props.token);
      connect(props.token);
    } else {
      try {
        var token = await getToken();
        console.log(token);
        connect(token);
      } catch (error) {
        console.error('There was an error getting the token:', error.code, error.message);
        if (props.error) {
          props.error({ error: error.error, messgae: error.message, code: error.code, status: error.status });
        }
        alert('There was an error getting the token:', error.message);
      }
    }
  };

  const connect = (token) => {
    session
      .connect(
        token,
        { clientData: myUserName },
      )
      .then(() => {
        connectWebCam();
      })
      .catch((error) => {
        if (props.error) {
          props.error({ error: error.error, messgae: error.message, code: error.code, status: error.status });
        }
        alert('There was an error connecting to the session:', error.message);
        console.log('There was an error connecting to the session:', error.code, error.message);
      });
  };

  const connectWebCam = async () => {
    await session.getUserMedia({ audioSource: undefined, videoSource: undefined });
    var devices = await session.getDevices();
    var videoDevices = devices.filter(device => device.kind === 'videoinput');

    let publisher = session.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: videoDevices[0].deviceId,
      publishAudio: localUser.isAudioActive(),
      publishVideo: localUser.isVideoActive(),
      resolution: '640x480',
      frameRate: 30,
      insertMode: 'APPEND',
    });

    if (session.capabilities.publish) {
      publisher.on('accessAllowed', () => {
        session.publish(publisher).then(() => {
          updateSubscribers();
          setLocalUserAccessAllowed(true);
          if (props.joinSession) {
            props.joinSession();
          }
        });
      });
    }

    localUser.setNickname(myUserName);
    localUser.setConnectionId(session.connection.connectionId);
    localUser.setScreenShareActive(false);
    localUser.setStreamManager(publisher);
    subscribeToUserChanged();
    subscribeToStreamDestroyed();
    sendSignalUserChanged({ isScreenShareActive: localUser.isScreenShareActive() });

    setCurrentVideoDevice(videoDevices[0]);
    setLocalUserState(localUser);

    publisher.on('streamPlaying', (e) => {
      updateLayout();
      publisher.videos[0].video.parentElement.classList.remove('custom-class');
    });
  };

  const updateSubscribers = () => {
    var subscribers = remotes;
    setSubscribers(subscribers);
    if (localUserState) {
      sendSignalUserChanged({
        isAudioActive: localUserState.isAudioActive(),
        isVideoActive: localUserState.isVideoActive(),
        nickname: localUserState.getNickname(),
        isScreenShareActive: localUserState.isScreenShareActive(),
      });
    }
    updateLayout();
  };

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }

    setHasBeenUpdated(false);
    setLayout(null);
    setSession(null);
    setSubscribers([]);
    setMySessionId('SessionA');
    setMyUserName('OpenVidu_User' + Math.floor(Math.random() * 100));
    setLocalUserState(null);

    if (props.leaveSession) {
      props.leaveSession();
    }
  };

  const camStatusChanged = () => {
    localUserState.setVideoActive(!localUserState.isVideoActive());
    localUserState.getStreamManager().publishVideo(localUserState.isVideoActive());
    sendSignalUserChanged({ isVideoActive: localUserState.isVideoActive() });
    setLocalUserState(localUserState);
  };

  const micStatusChanged = () => {
    localUserState.setAudioActive(!localUserState.isAudioActive());
    localUserState.getStreamManager().publishAudio(localUserState.isAudioActive());
    sendSignalUserChanged({ isAudioActive: localUserState.isAudioActive() });
    setLocalUserState(localUserState);
  };

  const nicknameChanged = (nickname) => {
    localUserState.setNickname(nickname);
    setLocalUserState(localUserState);
    sendSignalUserChanged({ nickname: localUserState.getNickname() });
  };

  const deleteSubscriber = (stream) => {
    const remoteUsers = subscribers;
    const userStream = remoteUsers.filter((user) => user.getStreamManager().stream === stream)[0];
    let index = remoteUsers.indexOf(userStream, 0);
    if (index > -1) {
      remoteUsers.splice(index, 1);
      setSubscribers(remoteUsers);
    }
  };

  const subscribeToStreamCreated = () => {
    session.on('streamCreated', (event) => {
      const subscriber = session.subscribe(event.stream, undefined);
      subscriber.on('streamPlaying', (e) => {
        checkSomeoneShareScreen();
        subscriber.videos[0].video.parentElement.classList.remove('custom-class');
      });
      const newUser = new UserModel();
      newUser.setStreamManager(subscriber);
      newUser.setConnectionId(event.stream.connection.connectionId);
      newUser.setType('remote');
      const nickname = event.stream.connection.data.split('%')[0];
      newUser.setNickname(JSON.parse(nickname).clientData);
      setRemotes((prevRemotes) => [...prevRemotes, newUser]);
      if (localUserAccessAllowed) {
        updateSubscribers();
      }
    });
  };

  const subscribeToStreamDestroyed = () => {
    session.on('streamDestroyed', (event) => {
      deleteSubscriber(event.stream);
      setTimeout(() => {
        checkSomeoneShareScreen();
      }, 20);
      event.preventDefault();
      updateLayout();
    });
  };

  const subscribeToUserChanged = () => {
    session.on('signal:userChanged', (event) => {
      let remoteUsers = subscribers;
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
      setSubscribers(remoteUsers);
      checkSomeoneShareScreen();
    });
  };

  const updateLayout = () => {
    setTimeout(() => {
      layout.updateLayout();
    }, 20);
  };

  const sendSignalUserChanged = (data) => {
    const signalOptions = {
      data: JSON.stringify(data),
      type: 'userChanged',
    };
    session.signal(signalOptions);
  };

  const toggleFullscreen = () => {
    const document = window.document;
    const fs = document.getElementById('container');
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (fs.requestFullscreen) {
        fs.requestFullscreen();
      } else if (fs.msRequestFullscreen) {
        fs.msRequestFullscreen();
      } else if (fs.mozRequestFullScreen) {
        fs.mozRequestFullScreen();
      } else if (fs.webkitRequestFullscreen) {
        fs.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  const switchCamera = async () => {
    try {
      const devices = await session.getDevices();
      var videoDevices = devices.filter(device => device.kind === 'videoinput');

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(device => device.deviceId !== currentVideoDevice.deviceId)

        if (newVideoDevice.length > 0) {
          var newPublisher = session.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: localUserState.isAudioActive(),
            publishVideo: localUserState.isVideoActive(),
            mirror: true
          });

          newPublisher.once("accessAllowed", async () => {
            await session.unpublish(localUserState.getStreamManager());
            await session.publish(newPublisher);
            localUserState.setStreamManager(newPublisher);
            setCurrentVideoDevice(newVideoDevice[0]);
            setLocalUserState(localUserState);
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const screenShare = () => {
    const videoSource = navigator.userAgent.indexOf('Firefox') !== -1 ? 'window' : 'screen';
    const publisher = session.initPublisher(
      undefined,
      {
        videoSource: videoSource,
        publishAudio: localUserState.isAudioActive(),
        publishVideo: localUserState.isVideoActive(),
        mirror: false,
      },
      (error) => {
        if (error && error.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
          setShowExtensionDialog(true);
        } else if (error && error.name === 'SCREEN_SHARING_NOT_SUPPORTED') {
          alert('Your browser does not support screen sharing');
        } else if (error && error.name === 'SCREEN_EXTENSION_DISABLED') {
          alert('You need to enable screen sharing extension');
        } else if (error && error.name === 'SCREEN_CAPTURE_DENIED') {
          alert('You need to choose a window or application to share');
        }
      },
    );

    publisher.once('accessAllowed', () => {
      session.unpublish(localUserState.getStreamManager());
      localUserState.setStreamManager(publisher);
      session.publish(localUserState.getStreamManager()).then(() => {
        localUserState.setScreenShareActive(true);
        setLocalUserState(localUserState);
        sendSignalUserChanged({ isScreenShareActive: localUserState.isScreenShareActive() });
      });
    });

    publisher.on('streamPlaying', () => {
      updateLayout();
      publisher.videos[0].video.parentElement.classList.remove('custom-class');
    });
  };

  const closeDialogExtension = () => {
    setShowExtensionDialog(false);
  };

  const stopScreenShare = () => {
    session.unpublish(localUserState.getStreamManager());
    connectWebCam();
  };

  const checkSomeoneShareScreen = () => {
    let isScreenShared;
    isScreenShared = subscribers.some((user) => user.isScreenShareActive()) || localUserState.isScreenShareActive();
    const openviduLayoutOptions = {
      maxRatio: 3 / 2,
      minRatio: 9 / 16,
      fixedRatio: isScreenShared,
      bigClass: 'OV_big',
      bigPercentage: 0.8,
      bigFixedRatio: false,
      bigMaxRatio: 3 / 2,
      bigMinRatio: 9 / 16,
      bigFirst: true,
      animate: true,
    };
    layout.setLayoutOptions(openviduLayoutOptions);
    updateLayout();
  };

  const getToken = async () => {
    const data = await axios.post(
      `${APPLICATION_SERVER_URL}api/get-token`,
      {
        sessionName: mySessionId,
        userName: myUserName,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return data.data.token;
  };

  const toggleChat = () => {
    const display = chatDisplay === 'none' ? 'block' : 'none';
    setChatDisplay(display);
  };

  const checkSize = () => {
    const o = document.getElementById('layout');
    const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (w <= 700) {
      if (layout) {
        layout.setLayoutOptions({
          maxRatio: 3 / 2,
          minRatio: 9 / 16,
          fixedRatio: false,
          bigClass: 'OV_big',
          bigPercentage: 0.8,
          bigFixedRatio: false,
          bigMaxRatio: 3 / 2,
          bigMinRatio: 9 / 16,
          bigFirst: true,
          animate: true,
        });
      }
      o.classList.add('OV_mobile');
    } else {
      if (layout) {
        layout.setLayoutOptions({
          maxRatio: 3 / 2,
          minRatio: 9 / 16,
          fixedRatio: false,
          bigClass: 'OV_big',
          bigPercentage: 0.8,
          bigFixedRatio: false,
          bigMaxRatio: 3 / 2,
          bigMinRatio: 9 / 16,
          bigFirst: true,
          animate: true,
        });
      }
      o.classList.remove('OV_mobile');
    }
    updateLayout();
  };

  return (
    <div id="container">
      <ToolbarComponent
        camStatusChanged={camStatusChanged}
        micStatusChanged={micStatusChanged}
        nicknameChanged={nicknameChanged}
        toggleFullscreen={toggleFullscreen}
        switchCamera={switchCamera}
        screenShare={screenShare}
        stopScreenShare={stopScreenShare}
        localUser={localUserState}
        chatDisplay={chatDisplay}
        toggleChat={toggleChat}
      />
      <DialogExtensionComponent
        showDialog={showExtensionDialog}
        closeDialogExtension={closeDialogExtension}
        localUser={localUserState}
      />
      <div id="layout" className="bounds">
        <OpenViduLayout
          layout={layout}
          streamManager={localUserState ? localUserState.getStreamManager() : null}
          showNotification={props.showNotification}
          localUser={localUserState}
          setLocalUser={setLocalUserState}
          room={props.room}
          leaveSession={leaveSession}
          user={props.user}
          nickName={myUserName}
          subscribers={subscribers}
          chatDisplay={chatDisplay}
          setChatDisplay={setChatDisplay}
          messageReceived={messageReceived}
          setMessageReceived={setMessageReceived}
          hasBeenUpdated={hasBeenUpdated}
          setHasBeenUpdated={setHasBeenUpdated}
        />
        {subscribers.map((sub, i) => (
          <StreamComponent
            key={i}
            streamManager={sub.getStreamManager()}
            user={sub}
            localUser={localUserState}
            room={props.room}
            nickName={sub.getNickname()}
            chatDisplay={chatDisplay}
            messageReceived={messageReceived}
            setMessageReceived={setMessageReceived}
          />
        ))}
        <ChatComponent
          chatDisplay={chatDisplay}
          localUser={localUserState}
          room={props.room}
          setChatDisplay={setChatDisplay}
          messageReceived={messageReceived}
          setMessageReceived={setMessageReceived}
        />
      </div>
    </div>
  );
};

export default VideoRoomComponent;
