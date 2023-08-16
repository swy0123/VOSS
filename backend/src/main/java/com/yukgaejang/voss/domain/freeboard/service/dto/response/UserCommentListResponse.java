package com.yukgaejang.voss.domain.freeboard.service.dto.response;

import com.yukgaejang.voss.domain.freeboard.repository.entity.Post;
import com.yukgaejang.voss.domain.freeboard.repository.entity.PostComment;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class UserCommentListResponse {
    private Long postId;
    private String postTitle;
    private LocalDateTime postCreatedAt;
    private Long commentId;
    private String commentContent;
    private LocalDateTime commentCreatedAt;

    public UserCommentListResponse(Post post, PostComment postComment) {
        this.postId = post.getId();
        this.postTitle = post.getTitle();
        this.postCreatedAt = post.getCreatedAt();
        this.commentId = postComment.getId();
        this.commentContent = postComment.getContent();
        this.commentCreatedAt = postComment.getCreatedAt();
    }
}
