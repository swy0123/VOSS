package com.yukgaejang.voss.domain.member.service.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GetFollowUserResponse {
    Long userId;
    String email;
    String nickname;
    boolean isFollowing;

    public GetFollowUserResponse(Long userId, String email, String nickname, boolean isFollowing) {
        this.userId = userId;
        this.email = email;
        this.nickname = nickname;
        this.isFollowing = isFollowing;
    }
}
