package com.yukgaejang.voss.domain.freeboard.service.dto.response;

import com.yukgaejang.voss.domain.freeboard.repository.entity.Post;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class PostDetailResponse {
    private Long id;
    private Long hit;
    private String nickname;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private List<CommentDetailResponse> comments;

    public PostDetailResponse(Post post) {
        this.id = post.getId();
        this.hit = post.getHit();
        this.nickname = post.getMember().getNickname();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.createdAt = post.getCreatedAt();
        this.comments = post.getPostComments().stream()
                .map(CommentDetailResponse::new)
                .collect(Collectors.toList());
    }

}
