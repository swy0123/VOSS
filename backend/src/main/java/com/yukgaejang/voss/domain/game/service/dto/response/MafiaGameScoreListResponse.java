package com.yukgaejang.voss.domain.game.service.dto.response;

import com.yukgaejang.voss.domain.game.repository.entity.MafiaGameScore;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MafiaGameScoreListResponse {
    private Long mafiaScoreId;
    private Long memberId;
    private String nickname;
    private int score;
    private LocalDateTime createdAt;

    public MafiaGameScoreListResponse(MafiaGameScore mafiaGameScore) {
        this.mafiaScoreId = mafiaGameScore.getId();
        this.memberId = mafiaGameScore.getMember().getId();
        this.nickname = mafiaGameScore.getMember().getNickname();
        this.score = mafiaGameScore.getScore();
        this.createdAt = mafiaGameScore.getCreatedAt();
    }
}
