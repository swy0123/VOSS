package com.yukgaejang.voss.domain.freeboard.service.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdateCommentRequest {
    private Long commentId;
    private String content;

    @Builder
    public UpdateCommentRequest(Long commentId, String content) {
        this.commentId = commentId;
        this.content = content;
    }
}
