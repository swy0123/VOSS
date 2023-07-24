package com.yukgaejang.voss.domain.meet.service.dto;

import com.yukgaejang.voss.domain.meet.repository.entity.MeetJoin;
import lombok.Data;

@Data
public class MeetJoinDto {
    private Long memberId;

    public MeetJoinDto(MeetJoin meetJoin) {
        memberId = meetJoin.getMember().getId();
    }
}
