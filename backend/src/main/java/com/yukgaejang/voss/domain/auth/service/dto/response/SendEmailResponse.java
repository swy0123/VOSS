package com.yukgaejang.voss.domain.auth.service.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SendEmailResponse {
    private boolean sendSuccess;

    public SendEmailResponse(boolean sendSuccess) {
        this.sendSuccess = sendSuccess;
    }
}
