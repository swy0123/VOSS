package com.yukgaejang.voss.domain.freeboard.service.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CreateCommentResponse {
    private boolean isSuccess;

    public CreateCommentResponse(boolean isSuccess) {
        this.isSuccess = isSuccess;
    }
}
