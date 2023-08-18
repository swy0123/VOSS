package com.yukgaejang.voss.domain.member.service.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class LoginRequest {
    private String email;
    private String password;
}