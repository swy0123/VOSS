import { BackGroundImg } from "/src/components/BackGroundImg";
import Header from "/src/components/Header/Header";
import Messenger from "/src/components/Message/Messenger";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { CurrentUserAtom, ProfileState } from "/src/recoil/Auth";
import { MyCommentsState } from "/src/recoil/Community";
import { getProfile } from "/src/api/profile";
import CommentListData from "/src/components/CommunityData/CommentListData";
import {
  DataScrollDesign,
  DataMainDesign,
  DataTitleSelectDesign,
  DataTitleDesign,
  DataContentDesign,
} from "./CommunityData.style";

function CommentData () {
  const id = parseInt(useParams().id || "0");
  const me = useRecoilValue(CurrentUserAtom).userid;
  const [profile, setProfile] = useRecoilState(ProfileState);
  const [comments, setComments] = useRecoilState(MyCommentsState);

  const navigate = useNavigate();
  const goProfile = (id: number) => navigate(`/profile/${id}`);

  useEffect(() => {
    getProfile(id).then(profile => {
      if (profile) {setProfile(profile)};
    })
  }, [id])

  return(
    <BackGroundImg>
    <Header/>
    <DataScrollDesign>
    <DataMainDesign>

    <DataTitleSelectDesign>
      <DataTitleDesign>
        { id == me 
        ? <h2>내가 쓴 댓글 <span style={{ fontSize: '20px'}}>({comments.length})</span></h2>
        : <h2><span onClick={()=>goProfile(id)}>{`${profile.nickname}`}</span> 님이 쓴 댓글</h2>
        }
      </DataTitleDesign>
    </DataTitleSelectDesign>
      
    <DataContentDesign>
      <CommentListData/>
    </DataContentDesign>

    </DataMainDesign>
    </DataScrollDesign>
    <Messenger/>
    </BackGroundImg>
  )
}

export default CommentData;