package com.yukgaejang.voss.domain.freeboard.service.dto.response;

import com.yukgaejang.voss.domain.freeboard.repository.entity.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class PostListResponse {
    private Long id;
    private String title;
    private Long hits;
    private String nickname;
    private Long comments;
    private Long likes;
    private boolean hasImageFile;
    private boolean hasOtherFile;
    private LocalDateTime createdAt;

    public PostListResponse(Post post, Long comments, Long likes, boolean hasImageFile, boolean hasOtherFile) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.hits = post.getHit();
        this.nickname = post.getMember().getNickname();
        this.createdAt = post.getCreatedAt();
        this.comments = comments;
        this.likes = likes;
        this.hasImageFile = hasImageFile;
        this.hasOtherFile = hasOtherFile;
    }
}
