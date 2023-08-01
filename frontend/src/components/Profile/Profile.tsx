import { useParams } from "react-router-dom";
import { BackGroundImg } from "../BackGroundImg";
import Header from "../Header/Header";
import Messenger from "../Message/Messenger";
import BasicBox from "./BasicBox/BasicBox";
import BadgeBox from "./BadgeBox/BadgeBox";
import HistoryBox from "./HistoryBox/HistoryBox";
import { getProfile } from "/src/api/profile";
import { useRecoilState } from "recoil";
import { ProfileState } from "/src/recoil/Auth";
import {
  ProfileDesign,
  ProfileSpace1,
  ProfileSpace2,
} from "./Profile.style";
import { useEffect } from "react";

function Profile() {
  const id = parseInt(useParams().id || "");
  const [profile, setProfile] = useRecoilState(ProfileState)

  useEffect(() => {
    getProfile(id).then(profile => {
      if (profile) {setProfile(profile)};
    })
  }, [id])

  return (
    <BackGroundImg>
    <Header/>
    <ProfileDesign>

    <ProfileSpace1>
      <BasicBox/>
    </ProfileSpace1>

    <ProfileSpace2>
      <BadgeBox/>
      <HistoryBox/>
    </ProfileSpace2>
    
    </ProfileDesign>
    <Messenger/>
    </BackGroundImg>
  );
};

export default Profile;