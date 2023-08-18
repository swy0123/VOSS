package com.yukgaejang.voss.domain.freeboard.service.dto.response;

import com.yukgaejang.voss.domain.freeboard.repository.entity.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class UserPostListResponse {
    private Long id;
    private String title;
    private Long hits;
    private Long comments;
    private Integer likes;
    private boolean hasImageFile;
    private boolean hasOtherFile;
    private LocalDateTime createdAt;

    public UserPostListResponse(Post post, Long comments, Integer likes, Long hasImageFile, Long hasOtherFile) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.hits = post.getHit();
        this.createdAt = post.getCreatedAt();
        this.comments = comments;
        this.likes = likes;
        this.hasImageFile = hasImageFile > 0;
        this.hasOtherFile = hasOtherFile > 0;
    }
}
