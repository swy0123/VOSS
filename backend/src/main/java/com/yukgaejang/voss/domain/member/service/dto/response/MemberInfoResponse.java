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
    private Long id;
    private String email;
    private String nickname;
    private String imageUrl = "";
    private Boolean isFollowing;
    private Integer followerCnt;
    private Integer followingCnt;
    private List<ViewBadgeResponse> badges = new ArrayList<>();
    private Integer actCnt;
    private Integer dubCnt;
    private Integer dictionCnt;
    private Integer totalCnt;

    @Builder

    public MemberInfoResponse(Long id, String email, String nickname, String imageUrl, Boolean isFollowing, Integer followerCnt, Integer followingCnt, List<ViewBadgeResponse> badges, Integer actCnt, Integer dubCnt, Integer dictionCnt, Integer totalCnt) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.imageUrl = imageUrl;
        this.isFollowing = isFollowing;
        this.followerCnt = followerCnt;
        this.followingCnt = followingCnt;
        this.badges = badges;
        this.actCnt = actCnt;
        this.dubCnt = dubCnt;
        this.dictionCnt = dictionCnt;
        this.totalCnt = totalCnt;
    }
}