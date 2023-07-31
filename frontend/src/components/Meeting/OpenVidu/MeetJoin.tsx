import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { ChangeEvent, useEffect, useState } from "react";
import UserVideoComponent from "./UserVideoComponent";
import { PostMeetJoinProps, deleteMeet, joinMeet } from "../../../api/meeting";
import { privateApi } from "../../../api";

const OPENVIDU_SERVER_URL = "https://i9b106.p.ssafy.io";
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

//https://i9b106.p.ssafy.io/openvidu/api/sessions/ses_GseS0kJaEF/connection"
const MeetJoin = (props: any) => {

  const [mySessionId, setMySessionId] = useState("SessionA");
  const [myUserName, setMyUserName] = useState("Participant" + Math.floor(Math.random() * 100));
  const [mainStreamManager, setMainStreamManager] = useState<any>(undefined);
  const [session, setSession] = useState<any>(undefined);
  const [publisher, setPublisher] = useState<any>(undefined);
  const [subscribers, setSubscribers] = useState<any[]>([]);

  useEffect(() => {
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

  const handleChangeSessionId = (e: ChangeEvent<HTMLInputElement>) => {
    setMySessionId(e.target.value);
  };

  const handleChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setMyUserName(e.target.value);
  };

  const handleMainVideoStream = (stream: any) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  const deleteSubscriber = (streamManager: any) => {
    setSubscribers((prevSubscribers) => prevSubscribers.filter((sub) => sub !== streamManager));
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

      setMainStreamManager(newPublisher);
      setPublisher(newPublisher);
    } catch (error: any) {
      console.log("There was an error connecting to the session:", error.code, error.message);
    }
  };

  const leaveSession = async () => {
    console.log("leaveSession")
    console.log("Beforeunload : deleteMeet")
    await deleteMeet(props);
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    if (session) {
      session.disconnect();
    }

    // Empty all properties...
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("SessionA");
    setMyUserName("Participant" + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);
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

          setMainStreamManager(newPublisher);
          setPublisher(newPublisher);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getToken = async () => {
    console.log("getToken call postMeetJoin : ");
    console.log(props)
    const token = await joinMeet(props);
    return token;
  };

  // const createSession = async (sessionId: any) => {
  //   console.log("createSession(sessionId) : " + sessionId)
  //   try {
  //     const data = JSON.stringify({ customSessionId: sessionId });
  //     alert(data);
  //     const response = await axios.post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
  //     // const response = await axios.post("https://i9b106.p.ssafy.io/openvidu/api/sessions", data, {
  //       headers: {
  //         // Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
  //         //Authorization: `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)}`,
  //         "Authorization" : 'Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU',
  //         "Content-Type": "application/json",
  //         //withCredentials: true,
  //       },
  //       // credentials: 'include'

  //     });
  //     console.log("plzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
  //     console.log(response)

  //     return response.data.id;
  //   } catch (error: any) {
  //     if (error?.response?.status === 409) {
  //       return sessionId;
  //     } else {
  //       console.log(error);
  //       console.warn(
  //         "No connection to OpenVidu Server. This may be a certificate error at " +
  //           OPENVIDU_SERVER_URL
  //       );
  //       if (
  //         window.confirm(
  //           'No connection to OpenVidu Server. This may be a certificate error at "' +
  //             OPENVIDU_SERVER_URL +
  //             '"\n\nClick OK to navigate and accept it. ' +
  //             'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
  //             OPENVIDU_SERVER_URL +
  //             '"'
  //         )
  //       ) {
  //         window.location.assign(OPENVIDU_SERVER_URL + "/accept-certificate");
  //       }
  //     }
  //   }
  // };

  // const createToken = async (sessionId: string) => {
  //   console.log("createToken(sessionId) : "+sessionId);
  //   try {
  //     const data = {};
  //     const response = await privateApi.post(
  //       // OPENVIDU_SERVER_URL + "/openvidu/api/sessions/ses_Pf6cicF2xw/connection",
  //       OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection",
  //       data,
  //       {
  //         headers: {
  //           "withCredentials": false,
  //           "Authorization": "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     return response.data.token;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  return (
    <div className="container">
      {session === undefined ? (
        <div id="join">
          <div id="join-dialog" className="jumbotron vertical-center">
            <h1> Join a video session </h1>
            <form className="form-group" onSubmit={joinSession}>
              <p>
                <label>Participant: </label>
                <input
                  className="form-control"
                  type="text"
                  id="userName"
                  value={myUserName}
                  onChange={handleChangeUserName}
                  required
                />
              </p>
              <p>
                <label> Session: </label>
                <input
                  className="form-control"
                  type="text"
                  id="sessionId"
                  value={mySessionId}
                  onChange={handleChangeSessionId}
                  required
                />
              </p>
              <p className="text-center">
                <input
                  className="btn btn-lg btn-success"
                  name="commit"
                  type="submit"
                  value="JOIN"
                />
              </p>
            </form>
          </div>
        </div>
      ) : null}

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

          {mainStreamManager !== undefined ? (
            <div id="main-video" className="col-md-6">
              <UserVideoComponent streamManager={mainStreamManager} />
              <input
                className="btn btn-large btn-success"
                type="button"
                id="buttonSwitchCamera"
                onClick={switchCamera}
                value="Switch Camera"
              />
            </div>
          ) : null}
          <div id="video-container" className="col-md-6">
            {publisher !== undefined ? (
              <div
                className="stream-container col-md-6 col-xs-6"
                onClick={() => handleMainVideoStream(publisher)}
              >
                <UserVideoComponent streamManager={publisher} />
              </div>
            ) : null}
            {subscribers.map((sub, i) => (
              <div
                key={i}
                className="stream-container col-md-6 col-xs-6"
                onClick={() => handleMainVideoStream(sub)}
              >
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MeetJoin;
