package com.yukgaejang.voss.domain.freeboard.service.dto.response;

import com.yukgaejang.voss.domain.freeboard.repository.entity.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
public class PostDetailResponse {
    private Long id;
    private Long hits;
    private String nickname;
    private Long memberId;
    private String title;
    private String content;
    private Long likes;
    private List<PostFileDetailResponse> imageFiles;
    private List<PostFileDetailResponse> otherFiles;
    private LocalDateTime createdAt;
    private boolean isLiked;
    private String likeMembers;
    private Page<CommentDetailResponse> comments;

    public PostDetailResponse(Post post, Page<CommentDetailResponse> comments, Long likes, List<PostFileDetailResponse> imageFiles, List<PostFileDetailResponse> otherFiles, boolean isLiked, String likeMembers) {
        this.id = post.getId();
        this.hits = post.getHit();
        this.nickname = post.getMember().getNickname();
        this.memberId = post.getMember().getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.createdAt = post.getCreatedAt();
        this.comments = comments;
        this.likes = likes;
        this.imageFiles = imageFiles;
        this.otherFiles = otherFiles;
        this.isLiked = isLiked;
        this.likeMembers = likeMembers;
    }

}
