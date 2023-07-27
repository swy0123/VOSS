import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BackGroundImg } from "../BackGroundImg";
import Header from "../Header/Header";
import Messenger from "../Message/Messenger";
import BasicBox from "./BasicBox/BasicBox";
import BadgeBox from "./BasicBox/BasicBox";
import HistoryBox from "./HistoryBox/HistoryBox";
// recoil
import { useRecoilState } from "recoil";
import { TempUserListAtom } from "../../recoil/Auth";
// // style
import {
  ProfileDesign,
  ProfileSpace1,
  ProfileSpace2,
} from "./Profile.style";



function Profile() {
  const id = parseInt(useParams().id || "");
  const [userList, setUserList] = useRecoilState(TempUserListAtom);
  const profile = userList.find(user => user.userid == id)
    
  return (
    <BackGroundImg>
    <Header/>
    <ProfileDesign>

    <ProfileSpace1>
    <BasicBox>
    </BasicBox>
    <h1 style={{color: "white"}}>{profile.nickname} 님의 프로필</h1>
    </ProfileSpace1>
    
    <ProfileSpace2>
    <BadgeBox></BadgeBox>
    <HistoryBox></HistoryBox>
    </ProfileSpace2>
    
    </ProfileDesign>
    <Messenger/>
  </BackGroundImg>
  );
};

export default Profile;