package com.yukgaejang.voss.domain.member.service.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GetFollowMemberResponse {
    Long memberId;
    String email;
    String nickname;
    boolean isFollowing;

    public GetFollowMemberResponse(Long memberId, String email, String nickname, boolean isFollowing) {
        this.memberId = memberId;
        this.email = email;
        this.nickname = nickname;
        this.isFollowing = isFollowing;
    }

    public GetFollowMemberResponse(Long memberId, String email, String nickname) {
        this.memberId = memberId;
        this.email = email;
        this.nickname = nickname;
    }
}
