import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BackGroundImg } from "/src/components/BackGroundImg";
import Header from "/src/components/Header/Header";
import Messenger from "/src/components/Message/Messenger";
import { useRecoilState, useRecoilValue } from "recoil";
import { CurrentUserAtom, ProfileState } from "/src/recoil/Auth";
import { getProfile } from "/src/api/profile";
import FreeBoardData from "/src/components/CommunityData/FreeBoardData";
import RecordBoardData from "/src/components/CommunityData/RecordBoardData";
import {
  DataScrollDesign,
  DataMainDesign,
  DataTitleSelectDesign,
  DataTitleDesign,
  DataSelectDesign,
} from "./CommunityData.style";

function BoardData () {
  const id = parseInt(useParams().id || "0");
  const me = useRecoilValue(CurrentUserAtom).userid;
  const [selectedOption, setSelectedOption] = useState<string>("1");
  const [profile, setProfile] = useRecoilState(ProfileState)

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
          ? <h2>내가 쓴 글</h2>
          : <h2><span onClick={()=>goProfile(id)}>{`${profile.nickname}`}</span> 님이 쓴 글</h2>
          }
        </DataTitleDesign>
        <DataSelectDesign>
          <input
              type="radio"
              value="1"
              checked={selectedOption === "1"}
              onChange={() => setSelectedOption("1")}
          />
          <div>자유게시판</div>
        </DataSelectDesign>
        <DataSelectDesign>
          <input
            type="radio"
            value="2"
            checked={selectedOption === "2"}
            onChange={() => setSelectedOption("2")}
          />
          <div>녹음게시판</div>
        </DataSelectDesign>
      </DataTitleSelectDesign>

      { selectedOption === "1" 
      ? <FreeBoardData/>
      : <RecordBoardData/>
      }

    </DataMainDesign>
    </DataScrollDesign>
    <Messenger/>
    </BackGroundImg>
  )
}

export default BoardData;