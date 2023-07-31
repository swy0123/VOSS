package com.yukgaejang.voss.domain.freeboard.service.dto.response;

import com.yukgaejang.voss.domain.freeboard.repository.entity.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class PostDetailResponse {
    private Long id;
    private Long hit;
    private String nickname;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private Page<CommentDetailResponse> comments;

    public PostDetailResponse(Post post, Page<CommentDetailResponse> comments) {
        this.id = post.getId();
        this.hit = post.getHit();
        this.nickname = post.getMember().getNickname();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.createdAt = post.getCreatedAt();
        this.comments = comments;
    }

}
