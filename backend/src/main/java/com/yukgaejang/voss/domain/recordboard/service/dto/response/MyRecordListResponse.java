package com.yukgaejang.voss.domain.recordboard.service.dto.response;

import com.yukgaejang.voss.domain.recordboard.repository.entity.Record;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class MyRecordListResponse {
    private Long id;
    private String description;
    private Long hits;
    private String originalFileName;
    private String savedFileName;
    private Long likes;
    private boolean isLiked;
    private LocalDateTime createdAt;

    public MyRecordListResponse(Record record, String originalFileName, String savedFileName, Long likes, Integer isLiked) {
        this.id = record.getId();
        this.description = record.getDescription();
        this.hits = record.getHit();
        this.originalFileName = originalFileName;
        this.savedFileName = savedFileName;
        this.likes = likes;
        this.isLiked = isLiked != null;
        this.createdAt = record.getCreatedAt();
    }
}
