package com.yukgaejang.voss.domain.recordboard.service.dto.response;

import com.yukgaejang.voss.domain.recordboard.repository.entity.Record;
import com.yukgaejang.voss.domain.recordboard.repository.entity.RecordFile;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class RecordDetailResponse {
    private Long postId;
    private String description;
    private String nickname;
    private Long memberId;
    private Long hits;
    private String originalFileName;
    private String savedFileName;
    private LocalDateTime createdAt;
    private Long likes;
    private boolean isLiked;

    public RecordDetailResponse(Record record, String originalFileName, String savedFileName, Long likes, Integer isLiked) {
        this.postId = record.getId();
        this.description = record.getDescription();
        this.nickname = record.getMember().getNickname();
        this.memberId = record.getMember().getId();
        this.hits = record.getHit();
        this.createdAt = record.getCreatedAt();
        this.originalFileName = originalFileName;
        this.savedFileName = savedFileName;
        this.likes = likes;
        this.isLiked = isLiked != null;
    }
}
