package com.yukgaejang.voss.domain.auth.service.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConfirmEmailResponse {
    private boolean isConfirmed;

    public ConfirmEmailResponse(boolean isConfirmed) {
        this.isConfirmed = isConfirmed;
    }
}
