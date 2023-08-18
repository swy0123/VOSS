package com.yukgaejang.voss.domain.game.service.dto.response;

import com.yukgaejang.voss.domain.game.repository.entity.MafiaGameSource;
import com.yukgaejang.voss.domain.game.repository.entity.Type;
import lombok.Data;

@Data
public class MafiaGameSourceListResponse {
    private Type type;
    private String fileName;
    private Long memberId;

    public MafiaGameSourceListResponse(MafiaGameSource mafiaGameSource) {
        this.type = mafiaGameSource.getType();
        this.fileName = mafiaGameSource.getFileName();
        this.memberId = mafiaGameSource.getMember().getId();
    }
}
