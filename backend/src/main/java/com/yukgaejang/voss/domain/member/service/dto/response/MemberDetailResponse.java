package com.yukgaejang.voss.domain.member.service.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberDetailResponse {
    private Long id;
    private String nickname;
    private String imageUrl;

    @Builder
    public MemberDetailResponse(Long id, String nickname, String imageUrl) {
        this.id = id;
        this.nickname = nickname;
        this.imageUrl = imageUrl;
    }
}
