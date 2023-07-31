package com.yukgaejang.voss.domain.member.service;

import com.yukgaejang.voss.domain.member.service.dto.request.FollowRequest;
import com.yukgaejang.voss.domain.member.service.dto.request.JoinRequest;
import com.yukgaejang.voss.domain.member.service.dto.response.GetFollowMemberResponse;

import java.util.List;

public interface MemberService {
    void join(JoinRequest joinRequest);

    void follow(FollowRequest followRequest, String email);
    void unfollow(Long targetId, String email);

    List<GetFollowMemberResponse> getFollowings(String email);

    List<GetFollowMemberResponse> getFollowers(String email);

    List<GetFollowMemberResponse> getFollowings(Long memberId, String email);

    List<GetFollowMemberResponse> getFollowers(Long memberId, String email);
}
