package com.yukgaejang.voss.domain.recordboard.service.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CreateRecordLikeResponse {
    private boolean isSuccess;

    public CreateRecordLikeResponse(boolean isSuccess) {
        this.isSuccess = isSuccess;
    }
}
