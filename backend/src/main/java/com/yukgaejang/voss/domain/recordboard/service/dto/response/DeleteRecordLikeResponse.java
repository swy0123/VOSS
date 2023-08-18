package com.yukgaejang.voss.domain.recordboard.service.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class DeleteRecordLikeResponse {
    private boolean isSuccess;

    public DeleteRecordLikeResponse(boolean isSuccess) {
        this.isSuccess = isSuccess;
    }
}
