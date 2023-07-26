package com.yukgaejang.voss.domain.freeboard.service.dto.response;

import com.yukgaejang.voss.domain.freeboard.repository.entity.PostComment;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class CommentDetailResponse {
    private Long id;
    private String nickname;
    private String content;
    private LocalDateTime createdAt;

    public CommentDetailResponse(PostComment postComment) {
        this.id = postComment.getId();
        this.nickname = postComment.getMember().getNickname();
        this.content = postComment.getContent();
        this.createdAt = postComment.getCreatedAt();
    }
}
