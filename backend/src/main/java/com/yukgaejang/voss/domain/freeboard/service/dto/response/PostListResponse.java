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
    private Long commentCount;

    public PostListResponse(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.hit = post.getHit();
        this.nickname = post.getMember().getNickname();
        this.createdAt = post.getCreatedAt();
        this.commentCount = post.getPostComments().size() == 0 ? 0L : post.getPostComments().size();
    }
}
