import React from 'react';
import OpenViduVideoComponent from './OvVideo';
// import './UserVideo.css';
import { useRecoilValue } from "recoil";
import { CurrentUserAtom } from "../../../recoil/Auth";
import { VedioInnerDiv, VedioOuterDiv } from './UserVideoComponent.style';


const UserVideoComponent = (props:any) => {
  const currentUser = useRecoilValue( CurrentUserAtom )
  const getNicknameTag = () => {
    console.log(currentUser.userid)
    return currentUser.userid;
  };

  return (
    <div>
      {props.streamManager !== undefined ? (
        <VedioOuterDiv className="streamcomponent">
          <VedioInnerDiv>sssssss</VedioInnerDiv>
          <OpenViduVideoComponent streamManager={props.streamManager} />
        </VedioOuterDiv>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;