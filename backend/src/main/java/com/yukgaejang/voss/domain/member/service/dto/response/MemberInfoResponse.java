package com.yukgaejang.voss.domain.member.service.dto.response;


import com.yukgaejang.voss.domain.badge.service.dto.response.ViewBadgeResponse;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MemberInfoResponse {
    String nickname;
    Boolean isFollowing;
    Integer followerCnt;
    Integer followingCnt;
    List<ViewBadgeResponse> badges = null;
    Integer actCnt;
    Integer dubCnt;
    Integer dictionCnt;
    Integer totalCnt;

    public MemberInfoResponse(String nickname, Boolean isFollowing, Integer followerCnt, Integer followingCnt, Integer actCnt, Integer dubCnt, Integer dictionCnt, Integer totalCnt) {
        this.nickname = nickname;
        this.isFollowing = isFollowing;
        this.followerCnt = followerCnt;
        this.followingCnt = followingCnt;
        this.actCnt = actCnt;
        this.dubCnt = dubCnt;
        this.dictionCnt = dictionCnt;
        this.totalCnt = totalCnt;
    }
}