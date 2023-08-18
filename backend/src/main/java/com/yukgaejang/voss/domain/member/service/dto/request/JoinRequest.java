package com.yukgaejang.voss.domain.member.service.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class JoinRequest {
    private String email;
    private String password;
    private String nickname;
    private String imageUrl;
}
