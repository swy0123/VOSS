package com.yukgaejang.voss.domain.freeboard.service.dto.response;

import com.yukgaejang.voss.domain.freeboard.repository.entity.Post;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class PostListResponse {
    private Long id;
    private String title;
    private Long hit;
    private String nickname;
    private LocalDateTime createdAt;

    public PostListResponse(Post post, String nickname) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.hit = post.getHit();
        this.createdAt = post.getCreatedAt();
        this.nickname = nickname;
    }
}
