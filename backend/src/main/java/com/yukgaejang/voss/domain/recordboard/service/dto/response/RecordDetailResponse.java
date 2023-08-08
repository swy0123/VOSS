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
    private RecordFile audioFile;
    private LocalDateTime createdAt;
    private Long likes;
    private boolean isLiked;

    public RecordDetailResponse(Record record, RecordFile audioFile, Long likes, boolean isLiked) {
        this.postId = record.getId();
        this.description = record.getDescription();
        this.nickname = record.getMember().getNickname();
        this.memberId = record.getMember().getId();
        this.hits = record.getHit();
        this.audioFile = audioFile;
        this.createdAt = record.getCreatedAt();
        this.likes = likes;
        this.isLiked = isLiked;
    }
}
