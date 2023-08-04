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
    private Long hits;
    private String nickname;
    private String title;
    private String content;
    private Long likes;
    private List<PostFileDetailResponse> imageFiles;
    private List<PostFileDetailResponse> otherFiles;
    private LocalDateTime createdAt;
    private boolean isLiked;
    private Page<CommentDetailResponse> comments;

    public PostDetailResponse(Post post, Page<CommentDetailResponse> comments, Long likes, List<PostFileDetailResponse> imageFiles, List<PostFileDetailResponse> otherFiles, boolean isLiked) {
        this.id = post.getId();
        this.hits = post.getHit();
        this.nickname = post.getMember().getNickname();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.createdAt = post.getCreatedAt();
        this.comments = comments;
        this.likes = likes;
        this.imageFiles = imageFiles;
        this.otherFiles = otherFiles;
        this.isLiked = isLiked;
    }

}
