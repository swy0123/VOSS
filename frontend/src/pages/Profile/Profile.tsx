import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BackGroundImg } from "/src/components/BackGroundImg";
import Header from "/src/components/Header/Header";
import Messenger from "/src/components/Message/Messenger";
import BasicBox from "/src/components/Profile/BasicBox/BasicBox";
import FollowModal from "/src/components/Profile/ModalBox/FollowModal";
import BadgeBox from "/src/components/Profile/BadgeBox/BadgeBox";
import HistoryBox from "/src/components/Profile/HistoryBox/HistoryBox";
import { useRecoilState, useRecoilValue } from "recoil";
import { getProfile, getFollowers, getFollowings} from "/src/api/profile";
import { ProfileState, ModalOpenState, FollowerListState, FollowingListState } from "/src/recoil/Auth";
import {
  ProfileScrollDesign,
  ProfileDesign,
  ProfileSpace1,
  ProfileSpace3,
  BoardDataDesign,
  BadgeTitleDetailDesign,
  ProfileSpace2,
} from "/src/pages/Profile/Profile.style";
import { useEffect } from "react";

function Profile() {
  const id = parseInt(useParams().id || "");
  const [profile, setProfile] = useRecoilState(ProfileState)
  const [isModalOpen, setIsModalOpen] = useRecoilState(ModalOpenState)
  const [followers, setFollowers] = useRecoilState(FollowerListState)
  const [followings, setFollowings] = useRecoilState(FollowingListState)

  const navigate = useNavigate();
  const goToBoardData = () => navigate(`/boarddata/${id}`)
  const goToCommentData = () => navigate(`/commentdata/${id}`)

  useEffect(() => {
    getProfile(id).then(profile => {
      if (profile) {setProfile(profile)};
    })
    getFollowings(id).then(followings => {
      if (followings) { setFollowings(followings)};
    })
    getFollowers(id).then(followers => {
      if (followers) { setFollowers(followers)};
    })
    setIsModalOpen(false)
  }, [id])

  return (
    <BackGroundImg>
    <Header/>
    <ProfileScrollDesign>
    <ProfileDesign>

    <ProfileSpace1>
      <BasicBox/>
    </ProfileSpace1>

    {isModalOpen ? <FollowModal/> : null}

    <ProfileSpace3>
      <BoardDataDesign>
        작성한 글
        <BadgeTitleDetailDesign onClick={(goToBoardData)}  >보러가기 〉</BadgeTitleDetailDesign>
      </BoardDataDesign>
      <BoardDataDesign>
        작성한 댓글
        <BadgeTitleDetailDesign onClick={(goToCommentData)} >보러가기 〉</BadgeTitleDetailDesign>
      </BoardDataDesign>
    </ProfileSpace3>

    <ProfileSpace2>
      <BadgeBox/>
      <HistoryBox/>
    </ProfileSpace2>
    
    </ProfileDesign>
    </ProfileScrollDesign>
    <Messenger/>
    </BackGroundImg>
  );
};

export default Profile;