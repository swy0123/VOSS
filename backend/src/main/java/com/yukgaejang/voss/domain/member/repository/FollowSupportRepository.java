package com.yukgaejang.voss.domain.member.repository;

import com.yukgaejang.voss.domain.member.service.dto.response.GetFollowUserResponse;

import java.util.List;

public interface FollowSupportRepository {
    List<GetFollowUserResponse> findFollowings(Long targetId, Long myId);
    List<GetFollowUserResponse> findFollowers(Long targetId, Long myId);
}