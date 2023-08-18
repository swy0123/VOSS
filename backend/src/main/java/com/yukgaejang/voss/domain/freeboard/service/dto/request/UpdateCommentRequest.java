package com.yukgaejang.voss.domain.freeboard.service.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdateCommentRequest {
    private String content;

    @Builder
    public UpdateCommentRequest(String content) {
        this.content = content;
    }
}
