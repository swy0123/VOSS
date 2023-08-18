package com.yukgaejang.voss.domain.freeboard.service.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class DeletePostLikeResponse {
    private boolean isSuccess;

    public DeletePostLikeResponse(boolean isSuccess) {
        this.isSuccess = isSuccess;
    }
}
