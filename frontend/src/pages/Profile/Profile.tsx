import { useParams } from "react-router-dom";
import { BackGroundImg } from "/src/components/BackGroundImg";
import Header from "/src/components/Header/Header";
import Messenger from "/src/components/Message/Messenger";
import BasicBox from "/src/components/Profile/BasicBox/BasicBox";
import FollowModal from "../../components/Profile/ModalBox/FollowModal";
import BadgeBox from "/src/components/Profile/BadgeBox/BadgeBox";
import HistoryBox from "/src/components/Profile/HistoryBox/HistoryBox";
import { useRecoilState, useRecoilValue } from "recoil";
import { getProfile } from "/src/api/profile";
import { ProfileState, ModalOpenState } from "/src/recoil/Auth";
import {
  ProfileDesign,
  ProfileSpace1,
  ProfileSpace2,
} from "./Profile.style";
import { useEffect } from "react";

function Profile() {
  const id = parseInt(useParams().id || "");
  const [profile, setProfile] = useRecoilState(ProfileState)
  const [isModalOpen, setIsModalOpen] = useRecoilState(ModalOpenState)

  useEffect(() => {
    getProfile(id).then(profile => {
      if (profile) {setProfile(profile)};
    })
    setIsModalOpen(false)
  }, [id])

  return (
    <BackGroundImg>
    <Header/>
    <ProfileDesign>

    <ProfileSpace1>
      <BasicBox/>
    </ProfileSpace1>

    {isModalOpen ? <FollowModal/> : null}

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