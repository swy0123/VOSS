package com.yukgaejang.voss.domain.member.service.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ModifyMemberRequest {
    private String nickname;
    private String imageUrl;

    public ModifyMemberRequest(String nickname, String imageUrl) {
        this.nickname = nickname;
        this.imageUrl = imageUrl;
    }
}
