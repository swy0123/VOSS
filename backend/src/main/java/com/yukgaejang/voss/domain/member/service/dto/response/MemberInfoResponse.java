package com.yukgaejang.voss.domain.member.service.dto.response;


import com.yukgaejang.voss.domain.badge.service.dto.response.ViewBadgeResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class MemberInfoResponse {
    String email;
    String nickname;
    String imageUrl = "";
    Boolean isFollowing;
    Integer followerCnt;
    Integer followingCnt;
    List<ViewBadgeResponse> badges = new ArrayList<>();
    Integer actCnt;
    Integer dubCnt;
    Integer dictionCnt;
    Integer totalCnt;

    @Builder
    public MemberInfoResponse(String email, String nickname, String imageUrl, Boolean isFollowing, Integer followerCnt, Integer followingCnt, Integer actCnt, Integer dubCnt, Integer dictionCnt, Integer totalCnt) {
        this.email = email;
        this.nickname = nickname;
        this.imageUrl = imageUrl;
        this.isFollowing = isFollowing;
        this.followerCnt = followerCnt;
        this.followingCnt = followingCnt;
        this.actCnt = actCnt;
        this.dubCnt = dubCnt;
        this.dictionCnt = dictionCnt;
        this.totalCnt = totalCnt;
    }
}