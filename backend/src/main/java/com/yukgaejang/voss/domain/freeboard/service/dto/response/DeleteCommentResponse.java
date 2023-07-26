package com.yukgaejang.voss.domain.freeboard.service.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class DeleteCommentResponse {
    private boolean isSuccess;

    public DeleteCommentResponse(boolean isSuccess) {
        this.isSuccess = isSuccess;
    }
}
