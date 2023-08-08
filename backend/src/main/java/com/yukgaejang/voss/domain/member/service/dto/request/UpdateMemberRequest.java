package com.yukgaejang.voss.domain.member.service.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdateMemberRequest {
    private String email;
    private String password;
    private String nickname;
    private String imageUrl;

    public UpdateMemberRequest(String email, String password, String nickname, String imageUrl) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.imageUrl = imageUrl;
    }
}
