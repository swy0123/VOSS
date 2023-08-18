package com.yukgaejang.voss.domain.member.service.dto.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FollowResponse {
    Boolean isFollowSuccess;

    public FollowResponse(Boolean isFollowSuccess) {
        this.isFollowSuccess = isFollowSuccess;
    }
}
