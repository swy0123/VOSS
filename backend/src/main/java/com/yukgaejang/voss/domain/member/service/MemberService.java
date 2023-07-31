package com.yukgaejang.voss.domain.member.service;

import com.yukgaejang.voss.domain.member.service.dto.request.FollowRequest;
import com.yukgaejang.voss.domain.member.service.dto.request.JoinRequest;
import com.yukgaejang.voss.domain.member.service.dto.request.LoginRequest;
import com.yukgaejang.voss.domain.member.service.dto.response.GetFollowUserResponse;

import java.util.List;

public interface MemberService {
    void join(JoinRequest joinRequest);

    void follow(FollowRequest followRequest, String email);
    void unfollow(Long targetId, String email);

    List<GetFollowUserResponse> getFollowings(String name);

    List<GetFollowUserResponse> getFollowers(String name);

    List<GetFollowUserResponse> getFollowers(Long userId, String name);
    List<GetFollowUserResponse> getFollowings(Long userId, String name);
}
