package com.yukgaejang.voss.domain.member.service.dto.response;


import com.yukgaejang.voss.domain.badge.service.dto.response.ViewBadgeResponse;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MemberInfoResponse {
    /*
    nickname
followerCnt
followingCnt
badge : [ {badgeId, badgeName. badgeCnt} ]
practice : { actCnt, dubCnt, dictionCnt, totalCnt }
     */
    String nickname;
    Integer followerCnt;
    Integer followingCnt;
    List<ViewBadgeResponse> badges;

}