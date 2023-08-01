package com.yukgaejang.voss.domain.member.service;

import com.yukgaejang.voss.domain.member.service.dto.request.FollowRequest;
import com.yukgaejang.voss.domain.member.service.dto.request.JoinRequest;
import com.yukgaejang.voss.domain.member.service.dto.response.GetFollowMemberResponse;
import com.yukgaejang.voss.domain.member.service.dto.response.GetMemberList;
import com.yukgaejang.voss.domain.member.service.dto.response.MemberInfoResponse;

import java.util.List;

public interface MemberService {
    void join(JoinRequest joinRequest);

    void follow(FollowRequest followRequest, String email);
    void unfollow(Long targetId, String email);

    List<GetFollowMemberResponse> getFollowings(String email);

    List<GetFollowMemberResponse> getFollowers(String email);

    List<GetFollowMemberResponse> getFollowings(Long memberId, String email);

    List<GetFollowMemberResponse> getFollowers(Long memberId, String email);

    MemberInfoResponse getInfo(String email);
    MemberInfoResponse getInfo(Long memberId, String email);
    List<GetMemberList> getMemberList(String nickname);
}
