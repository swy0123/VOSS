package com.yukgaejang.voss.domain.meet.service.dto;

import com.yukgaejang.voss.domain.member.repository.entity.Member;
import lombok.Data;

@Data
public class MeetJoinDto {
    private Long memberId;
    private String nickname;

    public MeetJoinDto(Member member) {
        this.memberId = member.getId();
        this.nickname = member.getNickname();
    }
}
