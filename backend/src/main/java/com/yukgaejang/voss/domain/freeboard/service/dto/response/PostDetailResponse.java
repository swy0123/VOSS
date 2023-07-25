package com.yukgaejang.voss.domain.freeboard.service.dto.response;

import com.yukgaejang.voss.domain.freeboard.repository.entity.Post;

import java.time.LocalDateTime;

public class PostDetailResponse {
    private Long id;
    private Long hit;
    private String nickname;
    private String title;
    private String content;
    private LocalDateTime createdAt;

    public PostDetailResponse(Post post) {
        this.id = post.getId();
        this.hit = post.getHit();
        this.nickname = post.getMember().getNickname();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.createdAt = post.getCreatedAt();
    }

}
