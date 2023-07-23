package com.yukgaejang.voss.domain.badge.service.dto.response;

import lombok.Getter;

@Getter
public class GiveBadgeResponse {
    private boolean isSuccess;

    public GiveBadgeResponse(boolean isSuccess) {
        this.isSuccess = isSuccess;
    }
}
