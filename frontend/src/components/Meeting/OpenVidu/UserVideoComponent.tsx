import React from 'react';
import OpenViduVideoComponent from './OvVideo';
// import './UserVideo.css';
import { useRecoilValue } from "recoil";
import { CurrentUserAtom } from "../../../recoil/Auth";


const UserVideoComponent = (props:any) => {
  const currentUser = useRecoilValue( CurrentUserAtom )
  const getNicknameTag = () => {
    console.log(currentUser.userid)
    return currentUser.userid;
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