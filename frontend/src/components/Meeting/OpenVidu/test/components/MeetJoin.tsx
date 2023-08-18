import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
// import ChatComponent from './chat/ChatComponent';
// import DialogExtensionComponent from './dialog-extension/DialogExtension';
// import StreamComponent from './stream/StreamComponent';
// import UserModel from '../models/user-model';
// import ToolbarComponent from './toolbar/ToolbarComponent';

interface Props {
  sessionName?: string;
  user?: string;
  token?: string;
  error?: Function;
  joinSession?: Function;
  leaveSession?: Function;
  room: string;
}

interface UserModel {
  connectionId: string;
  audioActive: boolean;
  videoActive: boolean;
  // screenShareActive;
  nickname: string;
  streamManager: any;
  type: string;
}


const MeetingJoi: React.FC<Props> = (props) => {
  const [hasBeenUpdated, setHasBeenUpdated] = useState(false);
  const [sessionName, setSessionName] = useState(props.sessionName ? props.sessionName : 'SessionA');
  const [userName, setUserName] = useState(props.user ? props.user : 'OpenVidu_User' + Math.floor(Math.random() * 100));
  const [remotes, setRemotes] = useState([]);
  const [localUserAccessAllowed, setLocalUserAccessAllowed] = useState(false);
  const [mySessionId, setMySessionId] = useState(sessionName);
  const [myUserName, setMyUserName] = useState(userName);
  const [session, setSession] = useState<any>(null);
  const [localUserState, setLocalUserState] = useState<any>(null);
  const [subscribers, setSubscribers] = useState([]);
  const [chatDisplay, setChatDisplay] = useState('none');
  const [currentVideoDevice, setCurrentVideoDevice] = useState<any>(null);
  // const [showExtensionDialog, setShowExtensionDialog] = useState(false);
  const [messageReceived, setMessageReceived] = useState(false);

  const [audioActive, setAudioActive] = useState(false);
  const [videoActive, setVideoActive] = useState(false);
  const [connectionId, setConnectionId] = useState('');
  const [nickname, setNickname] = useState('');
  const [streamManager, setStreamManager] = useState<any>(null);
  const [type, setType] = useState('local');


  var localUser: UserModel = {
    connectionId: connectionId,
    audioActive: audioActive,
    videoActive: videoActive,
    nickname: nickname,
    streamManager: streamManager,
    type: type,
  };

  useEffect(() => {
    window.addEventListener('beforeunload', onbeforeunload);

    joinSession();

    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
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
      publishAudio: audioActive,
      publishVideo: videoActive,
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

    setNickname(myUserName);
    setConnectionId(session.connection.connectionId);
    setStreamManager(publisher);
    subscribeToUserChanged();
    subscribeToStreamDestroyed();
    setCurrentVideoDevice(videoDevices[0]);
    setLocalUserState({
      connectionId: connectionId,
      audioActive: audioActive,
      videoActive: videoActive,
      nickname: nickname,
      streamManager: streamManager,
      type: type,
    });

    publisher.on('streamPlaying', (e) => {
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
      });
    }
  };

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }

    setHasBeenUpdated(false);
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
    const userStream = remoteUsers.filter((user) => user.streamManager.stream === stream)[0];
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
        subscriber.videos[0].video.parentElement.classList.remove('custom-class');
      });
      const newUser = new UserModel();

      var newUser: UserModel = {
        connectionId: event.stream.connection.connectionId,
        audioActive: audioActive,
        videoActive: videoActive,
        nickname: event.stream.connection.data.split('%')[0],
        streamManager: subscriber,
        type: 'remote',
      };
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
      event.preventDefault();
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
        }
      });
      setSubscribers(remoteUsers);
    });
  };

  const sendSignalUserChanged = (data) => {
    const signalOptions = {
      data: JSON.stringify(data),
      type: 'userChanged',
    };
    session.signal(signalOptions);
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

  const closeDialogExtension = () => {
    setShowExtensionDialog(false);
  };

  const getToken = async () => {
    console.log("getToken call postMeetJoin : ");
    const res = await joinMeet(props);
    if (res.message !== undefined) alert(res.message);
    return res.token;
  };

  const toggleChat = () => {
    const display = chatDisplay === 'none' ? 'block' : 'none';
    setChatDisplay(display);
  };

  return (
    <div id="container">
      {/* <ToolbarComponent
        camStatusChanged={camStatusChanged}
        micStatusChanged={micStatusChanged}
        nicknameChanged={nicknameChanged}
        switchCamera={switchCamera}
        localUser={localUserState}
        chatDisplay={chatDisplay}
        toggleChat={toggleChat}
      />
      <DialogExtensionComponent
        showDialog={showExtensionDialog}
        closeDialogExtension={closeDialogExtension}
        localUser={localUserState}
      /> */}
      <div id="layout" className="bounds">
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
        {/* <ChatComponent
          chatDisplay={chatDisplay}
          localUser={localUserState}
          room={props.room}
          setChatDisplay={setChatDisplay}
          messageReceived={messageReceived}
          setMessageReceived={setMessageReceived}
        /> */}
      </div>
    </div>
  );
};

export default MeetingJoin;
