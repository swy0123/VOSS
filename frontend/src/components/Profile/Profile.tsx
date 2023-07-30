import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BackGroundImg } from "../BackGroundImg";
import Header from "../Header/Header";
import Messenger from "../Message/Messenger";
import BasicBox from "./BasicBox/BasicBox";
import BadgeBox from "./BadgeBox/BadgeBox";
import HistoryBox from "./HistoryBox/HistoryBox";
import { useRecoilValue } from "recoil";
import { TempUserListAtom } from "../../recoil/Auth";
import {
  ProfileDesign,
  ProfileSpace1,
  ProfileSpace2,
} from "./Profile.style";

function Profile() {
  const id = parseInt(useParams().id || "");
  const userList = useRecoilValue(TempUserListAtom);
  const profile = userList.find(user => user.userid == id);
  const {email, nickname, userid} = profile || {};

  return (
    <BackGroundImg>
    <Header/>
    <ProfileDesign>

    <ProfileSpace1>
    <BasicBox email={email} nickname={nickname} userid={userid}>
    </BasicBox>
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