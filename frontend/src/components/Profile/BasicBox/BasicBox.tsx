import { useCallback, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { CurrentUserAtom, ProfileState, ModalOpenState, FollowerTabState, FollowerListState, FollowingListState } from "/src/recoil/Auth";
import { postFollow, deleteUnfollow, getFollowers, getFollowings } from '/src/api/profile';
import UpdateIcon from "/src/assets/Profile/UpdateIcon.png";
import ProfileNull from "/src/assets/Profile/ProfileNull.png"
import ImageModifyModal from '../ModalBox/ImageModifyModal';
import {
  BasicBoxDesign,
  ProfileImgDesign,
  ProfileImgDesign2,
  ProfileInfoDesign,
  ProfileNameBoxDesign,
  ProfileNameDesign,
  ProfileBtnDesign,
  FollowButton,
  FollowingButton,
  FollowBoxDesign,
  ProfileFollowerDesign,
  ProfileFollowingDesign,
  ProfileFollowingSpaceDesign,
} from "./BasicBox.style";
import { ProfileHoverList, ProfileHoverListItem } from './NavigationBar.style';
import NicknameModal from './NicknameModal';
import PasswordModal from './PasswordModal';

const FILE_SERVER_URL = "https://b106-voss.s3.ap-northeast-2.amazonaws.com"

function BasicBox() {
  const id = parseInt(useParams().id || "");
  //const currentUser = useRecoilValue(CurrentUserAtom)
  const [isModalOpen, setIsModalOpen] = useRecoilState(ModalOpenState);
  const [followerTabShow, setFollowerTabShow] = useRecoilState(FollowerTabState)
  const [followers, setFollowers] = useRecoilState(FollowerListState)
  const [followings, setFollowings] = useRecoilState(FollowingListState)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [profile, setProfile] = useRecoilState(ProfileState)
  const [currentUser, setCurrentUser] = useRecoilState(CurrentUserAtom);
  const [profileMenuShown, setProfileMenuShown] = useState(false)
  const [isOpenNicknameModal, setOpenNicknameModal] = useState<boolean>(false);
  const [isOpenPasswordModal, setOpenPasswordModal] = useState<boolean>(false);
  const [showImgUpdate, setImgUpdate] = useState(false)


  const setFollow = () => {
    console.log(123);
    if (profile.isFollowing) {
      deleteUnfollow(id).then(res => {
        if (res) { getFollowers(id).then(followers => {
            if (followers) { setFollowers(followers)};
          })
        }
      })
    } else {
      postFollow(id).then(res => {
        if (res) { getFollowers(id).then(followers => {
            if (followers) { setFollowers(followers)};
          })
        }
      })
    };
    setProfile({ ...profile, isFollowing: !profile.isFollowing })
  };

  useEffect(() => {
    getFollowings(id).then(followings => {
      if (followings) { setFollowings(followings) };
    })
    getFollowers(id).then(followers => {
      if (followers) { setFollowers(followers) };
    })
  }, [isModalOpen])

  const handleModifyClick = () => {
    setIsImageModalOpen(true);
  };

  const closeModal = () => {
    setIsImageModalOpen(false);
  };

  const toggleNicknameModal = useCallback(() => {
    setOpenNicknameModal(!isOpenNicknameModal);
  }, [isOpenNicknameModal]);

  const togglePasswordModal = useCallback(() => {
    setOpenPasswordModal(!isOpenPasswordModal);
  }, [isOpenPasswordModal]);


  const changeImage = (newImageUrl: string) => {
    setProfile({ ...profile, imageUrl: newImageUrl });
    setCurrentUser({ ...currentUser, imageUrl: newImageUrl });
  }

  const changeNickname = (newNickname: string) => {
    setProfile({ ...profile, nickname: newNickname });
    setCurrentUser({ ...currentUser, nickname: newNickname });
  }

  return (
    <> {profile.id > 0
      ? <BasicBoxDesign>
        <ProfileImgDesign>
          <ProfileImgDesign2
            onClick={() => {
              if (id === currentUser.userid) {
                handleModifyClick();
              }
            }}
            onMouseEnter={() => {
              if (id === currentUser.userid) {
                setImgUpdate(true);
              }
            }}
            onMouseLeave={() => setImgUpdate(false)}>
            {showImgUpdate && id === currentUser.userid ? <img id='updateIcon' style={{ width: '1.6vw', height: '1.6vw', zIndex: '1' }} src={UpdateIcon} alt="" /> : null}
            {profile.imageUrl
              ? <img src={`${FILE_SERVER_URL}/${profile.imageUrl}`} />
              : <img style={{ width: '115%', height: '115%', margin: '0 auto' }} src={ProfileNull} />
            }
          </ProfileImgDesign2>
        </ProfileImgDesign>

        <ProfileInfoDesign>
          <ProfileNameBoxDesign>
            <ProfileNameDesign>{profile.nickname}</ProfileNameDesign>
            {id === currentUser.userid
              ? <ProfileBtnDesign
                onMouseEnter={() => setProfileMenuShown(true)}
                onMouseLeave={() => setProfileMenuShown(false)}
              ><img src={UpdateIcon} alt="" />
                {profileMenuShown
                  ?
                  <ProfileHoverList
                    onMouseEnter={() => setProfileMenuShown(true)}
                    onMouseLeave={() => setProfileMenuShown(false)}>
                    <ProfileHoverListItem onClick={() => { toggleNicknameModal(); }}>닉네임 수정</ProfileHoverListItem>
                    <ProfileHoverListItem  onClick={() => { togglePasswordModal(); }}>비밀번호 수정</ProfileHoverListItem>
                  </ProfileHoverList>
                  : null}
              </ProfileBtnDesign>
              : profile.isFollowing
                ? <FollowingButton onClick={setFollow}>팔로잉</FollowingButton>
                : <FollowButton onClick={setFollow}>팔로우</FollowButton>
            }
          </ProfileNameBoxDesign>

          <FollowBoxDesign>
            <ProfileFollowerDesign onClick={() => (setIsModalOpen(true), setFollowerTabShow(true))}>
              <p>팔로워</p>
              <p>{followers.length} 명</p>
            </ProfileFollowerDesign>
            <ProfileFollowingDesign onClick={() => (setIsModalOpen(true), setFollowerTabShow(false))}>
              <p>팔로잉</p>
              <p>{followings.length} 명</p>
            </ProfileFollowingDesign>
            <ProfileFollowingSpaceDesign />
          </FollowBoxDesign>
        </ProfileInfoDesign>

        {isImageModalOpen && <ImageModifyModal closeModal={closeModal} changeImage={changeImage} />}

        {isOpenNicknameModal && (
          <NicknameModal
            toggleNicknameModal={toggleNicknameModal} changeNickname={changeNickname}  originNickname={currentUser.nickname} originImageUrl={currentUser.imageUrl}
          ></NicknameModal>
        )}

        {isOpenPasswordModal && (
          <PasswordModal
            togglePasswordModal={togglePasswordModal}
          ></PasswordModal>
        )}  


      </BasicBoxDesign>
      : <h3 style={{ color: 'white' }}>회원 정보가 없습니다</h3>
    } </>

  );
};

export default BasicBox;