package com.yukgaejang.voss.domain.member.service;

import com.yukgaejang.voss.domain.member.service.dto.request.*;
import com.yukgaejang.voss.domain.member.service.dto.response.GetFollowMemberResponse;
import com.yukgaejang.voss.domain.member.service.dto.response.GetMemberList;
import com.yukgaejang.voss.domain.member.service.dto.response.MemberDetailResponse;
import com.yukgaejang.voss.domain.member.service.dto.response.MemberInfoResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface MemberService {
    void join(JoinRequest joinRequest);

    boolean modifyMember(ModifyMemberRequest modifyMemberRequest, String email);

    boolean follow(FollowRequest followRequest, String email);
    void unfollow(Long targetId, String email);

    List<GetFollowMemberResponse> getFollowings(String email);

    List<GetFollowMemberResponse> getFollowers(String email);

    List<GetFollowMemberResponse> getFollowings(Long memberId, String email);

    List<GetFollowMemberResponse> getFollowers(Long memberId, String email);

    MemberInfoResponse getInfo(String email);
    MemberInfoResponse getInfo(Long memberId, String email);
    Page<GetMemberList> findMemberListByNickname(GetMemberListRequest getMemberListRequest);

    MemberDetailResponse getDetails(String email);

    boolean modifyPassword(ModifyPasswordRequest modifyPasswordRequest, String name);

    boolean deleteMember(String email, MemberDeleteRequest memberDeleteRequest);
}
