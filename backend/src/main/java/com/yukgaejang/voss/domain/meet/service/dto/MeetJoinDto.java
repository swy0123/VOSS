package com.yukgaejang.voss.domain.meet.service.dto;

import com.yukgaejang.voss.domain.meet.repository.entity.MeetJoin;
import lombok.Data;

@Data
public class MeetJoinDto {
    private Long memberId;
    private String nickname;

    public MeetJoinDto(MeetJoin meetJoin) {
        memberId = meetJoin.getMember().getId();
        nickname = meetJoin.getMember().getNickname();
    }
}
