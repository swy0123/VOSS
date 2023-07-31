import React from 'react';
import OpenViduVideoComponent from './OvVideo';
// import './UserVideo.css';

const UserVideoComponent = (props:any) => {
  const getNicknameTag = () => {
    // Gets the nickName of the user
    //return JSON.parse(props.streamManager.stream.connection.data).clientData;
    console.log(props)
    return "wonyoung";
  };

  return (
    <div>
      {props.streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={props.streamManager} />
          <div>
            <p>{getNicknameTag()}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;