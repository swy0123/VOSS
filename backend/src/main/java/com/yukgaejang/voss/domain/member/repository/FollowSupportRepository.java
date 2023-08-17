package com.yukgaejang.voss.domain.member.repository;

import com.yukgaejang.voss.domain.member.service.dto.response.GetFollowMemberResponse;

import java.util.List;

public interface FollowSupportRepository {
    List<GetFollowMemberResponse> findFollowings(Long targetId, Long myId);
    List<GetFollowMemberResponse> findFollowers(Long targetId, Long myId);

    void deleteFollowByMemberId(Long memberId);
}