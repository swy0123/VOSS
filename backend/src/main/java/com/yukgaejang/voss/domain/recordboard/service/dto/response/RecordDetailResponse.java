package com.yukgaejang.voss.domain.recordboard.service.dto.response;

import com.yukgaejang.voss.domain.recordboard.repository.entity.Record;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class RecordDetailResponse {
    private Long recordId;
    private String description;
    private String nickname;
    private Long memberId;
    private String profileImage;
    private Long hits;
    private String originalFileName;
    private String savedFileName;
    private LocalDateTime createdAt;
    private Integer likes;
    private boolean isLiked;
    private String likeMembers;

    public RecordDetailResponse(Record record, String originalFileName, String savedFileName, Integer likes, Integer isLiked) {
        this.recordId = record.getId();
        this.description = record.getDescription();
        this.nickname = record.getMember().getNickname();
        this.memberId = record.getMember().getId();
        this.profileImage = record.getMember().getImageUrl();
        this.hits = record.getHit();
        this.createdAt = record.getCreatedAt();
        this.originalFileName = originalFileName;
        this.savedFileName = savedFileName;
        this.likes = likes;
        this.isLiked = isLiked != null;
    }
}
