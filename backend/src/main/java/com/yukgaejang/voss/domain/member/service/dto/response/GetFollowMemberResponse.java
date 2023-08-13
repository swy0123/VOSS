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
    String imageUrl;
    boolean isFollowing;

    public GetFollowMemberResponse(Long memberId, String email, String nickname, String imageUrl, boolean isFollowing) {
        this.memberId = memberId;
        this.email = email;
        this.nickname = nickname;
        this.imageUrl = imageUrl;
        this.isFollowing = isFollowing;
    }

    public GetFollowMemberResponse(Long memberId, String email, String nickname) {
        this.memberId = memberId;
        this.email = email;
        this.nickname = nickname;
    }
}
