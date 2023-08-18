package com.yukgaejang.voss.domain.auth.service.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SendEmailRequest {
    private String email;

    public SendEmailRequest(String email) {
        this.email = email;
    }
}
