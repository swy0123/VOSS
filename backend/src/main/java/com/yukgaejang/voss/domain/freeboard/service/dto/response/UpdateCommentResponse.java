package com.yukgaejang.voss.domain.freeboard.service.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdateCommentResponse {
    private boolean isSuccess;

    public UpdateCommentResponse(boolean isSuccess) {
        this.isSuccess = isSuccess;
    }
}
