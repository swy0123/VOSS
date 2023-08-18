package com.yukgaejang.voss.domain.auth.service.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ConfirmEmailRequest {
    private String email;
    private String token;

    public ConfirmEmailRequest(String email, String token) {
        this.email = email;
        this.token = token;
    }
}
